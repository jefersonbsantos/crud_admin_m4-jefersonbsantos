import { Router } from "express";
import { sessionCreate } from "../schemas/session.schemas";
import validateBody from "../middlewares/validateBody.middleware";
import sessionControlllers from "../controllers/session.controllers";

const sessionRouter: Router = Router();

sessionRouter.post("", validateBody(sessionCreate), sessionControlllers.create);

export default sessionRouter;
