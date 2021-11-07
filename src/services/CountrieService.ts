import { prismaClient } from "../prisma"

class CountrieService {
    async store(name: string){
        const countrie = prismaClient.country.create({
            data: {
                name
            }
        })

        return countrie;
    }


    async index(){
        const countries = await prismaClient.country.findMany({
            orderBy:{
                name: "desc"
            }
        });

        return countries
    }
}


export { CountrieService }