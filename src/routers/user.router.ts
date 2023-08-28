import { Router } from "express";
import validateBody from "../middlewares/validateBody.middleware";
import validateIdExists from "../middlewares/validateIdExists.middleware";
import userControllers from "../controllers/user.controllers";
import { userCreateSchema } from "../schemas/user.schemas";

const userRouter: Router = Router();

userRouter.post(
  "",
  validateBody(userCreateSchema),
  validateIdExists,
  userControllers.create
);
userRouter.get("", userControllers.read);

userRouter.get("/users/:id/courses", userControllers.retrieve);

export default userRouter;
