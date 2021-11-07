import { Request, Response } from "express";
import { CountrieService } from "../services/CountrieService";

class CountrieController {

    async store(request: Request, response: Response) {

        const countrieService = new CountrieService();

        const { name } = request.body;

        try {
            const countrie = await countrieService.store(name);
            return response.json(countrie);
        } catch (error) {
            return response.json({
                erro: error.message
            });

        }
    }



    async index(request: Request, response: Response) {
        const countrieService = new CountrieService();
        try {
            const countries = await countrieService.index();
            return response.json(countries);
        } catch (error) {
            return response.json({
                erro: error.message
            });
        }

    }
}

export { CountrieController }