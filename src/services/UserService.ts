import { prismaClient } from "../prisma";
import { sign } from "jsonwebtoken";


class UserSevice {

    async register(
        email: string,
        password: string,
        dt_nascimento: Date,
        name: string,
        last_name: string,
        sexo: string,
        countryId: string) {


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
                password,
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

        return user;

    }

    async login(email: string, password: string) {
        let user = await prismaClient.user.findMany({
            where: {
                email,
                password
            },
        })

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
}


export { UserSevice }
