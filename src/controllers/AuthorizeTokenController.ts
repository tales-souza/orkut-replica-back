import { Request, Response } from "express";
import { AuthorizeTokenService } from "../services/AuthorizeTokenService";


class AuthorizeTokenController {

    async activeAccount(request: Request, response: Response) {

        const authorizeTokenService = new AuthorizeTokenService();

        const { userId, token } = request.body;

        try {
            const countrie = await authorizeTokenService.activeAccount(userId, token);
            return response.json(countrie);
        } catch (error) {
            return response.json({
                erro: error.message
            });

        }
    }

}

export { AuthorizeTokenController }