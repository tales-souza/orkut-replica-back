import { prismaClient } from "../prisma";
import { sign } from "jsonwebtoken";
import md5 from "md5";


class UserSevice {

    async register(
        email: string,
        password: string,
        dt_nascimento: Date,
        name: string,
        last_name: string,
        sexo: string,
        countryId: string) {

            
        function getRandomArbitrary(min : number, max : number) : number {
            return Math.round(Math.random() * (max - min) + min);
          }


        // verify email if already exists

        const userAlreadyExists = await prismaClient.user.findUnique({
            where: {
                email: email,
            },
            select: {
                email: true
            }
        })

        if (userAlreadyExists) {
            throw new Error('user email already exists');
        }

        const user = await prismaClient.user.create({
            data: {
                email,
                password: md5(password),
                dt_nascimento,
                name,
                last_name,
                sexo,
                countryId
            },
            include: {
                country: true
            }
        })


       const authorizeToken = await prismaClient.authorizeToken.create({
            data:{
                token: getRandomArbitrary(100000, 999999),
                dataAuthorization: new Date(),
                userId : user.id,
            }
        })

        const returnUser = {
            ...user,
            activationToken: authorizeToken.token

        }

        return returnUser;

    }

    async login(email: string, password: string) {
        let user = await prismaClient.user.findMany({
            where: {
                email,
                password : md5(password)
            },
        })


        // verificar se a conta já está ativa

        if (!user[0].active){
            throw new Error('User is not validated yet');
        }


        if (user.length === 0) {
            throw new Error('User or password is invalid');
        }

        const token = sign(
            {
                user: {
                    name: user[0].name,
                    id: user[0].id
                }
            },
            process.env.JWT_SECRET,
            {
                subject: user[0].id,
                expiresIn: "1d"
            }

        );

        return { token, user }; 


    }


    async profile(id: string){

        const profile = prismaClient.user.findUnique({
            where: {
                id
            }
        });

       const returnProfile = {
            id: (await profile).id,
            email: (await profile).email,
            dt_nascimento: (await profile).email,
            name: (await profile).name,
            last_name: (await profile).last_name,
            sexo: (await profile).sexo,
            countryId: (await profile).countryId
        }

        return returnProfile;

    }

}


export { UserSevice }
