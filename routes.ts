import { Router } from "express";
import { CountrieController } from "./src/controllers/CountrieController";
import { UserController } from "./src/controllers/UserController";
import { ensureAuthenticated } from "./src/middlewares/ensureAuthenticated";



const router = Router();

/*router.post("/api/v1/register", new CountrieController().store);*/

router.post("/api/v1/country", new CountrieController().store);
router.get("/api/v1/country", new CountrieController().index);


router.post("/api/v1/register", new UserController().register);
router.post("/api/v1/login", new UserController().login);
router.get("/api/v1/profile",  ensureAuthenticated,  new UserController().profile);






export { router }