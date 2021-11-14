import { prismaClient } from "../prisma"

class AuthorizeTokenService {
    async activeAccount(userId: string, token: number) {

        const verifyToken = await prismaClient.authorizeToken.findMany({
            where: {
                userId: userId,
                token: token
            }
        });

        if (verifyToken.length === 0) {
            throw new Error(' activation code is invalid');
        }
        
        // processo de ativação de conta 

        await prismaClient.user.update({
            where: { id: userId },
            data: { active: true },
        });


        return verifyToken;
    }
}


export { AuthorizeTokenService }