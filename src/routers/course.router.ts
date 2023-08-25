import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.middleware";
import validateAdmin from "../middlewares/validateAdmin.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { courseCreateSchema } from "../schemas/course.schemas";
import courseControllers from "../controllers/course.controllers";

const musicRouter: Router = Router();

musicRouter.post(
  "",
  verifyToken,
  validateAdmin,
  validateBody(courseCreateSchema),
  courseControllers.create
);

musicRouter.get("", courseControllers.read);

export default musicRouter;
