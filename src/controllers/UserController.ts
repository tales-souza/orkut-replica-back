import { Request, Response } from "express";
import { UserSevice } from "../services/UserService";

class UserController {
    async register(request: Request, response: Response) {

        const userSevice = new UserSevice();

        const { email, password, dt_nascimento, name, last_name, sexo, countryId } = request.body;

        try {
            const user = await userSevice.register(email, password, new Date(dt_nascimento), name, last_name, sexo, countryId);
            return response.json(user);
        } catch (error) {
            return response.json({
                erro: error.message
            });
        }
    }

    async login(request: Request, response: Response) {

        const userSevice = new UserSevice();

        const { email, password } = request.body;

        try {
            const login = await userSevice.login(email, password);
            return response.json(login);
        } catch (error) {
            return response.json({
                erro: error.message
            });
        }
    }


    async profile(request: Request, response: Response) {
        const userSevice = new UserSevice();
        try {
            const profile = await userSevice.profile(request.user_id);

            return response.json(profile);
        } catch (error) {
            return response.json({
                erro: error.message
            });
        }


    }


}

export { UserController }