import { Router } from "express";
import validateBody from "../middlewares/validateBody.middleware";
import validateIdExists from "../middlewares/validateIdExists.middleware";
import userControllers from "../controllers/user.controllers";
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schemas";

const userRouter: Router = Router();

userRouter.post(
  "",
  validateBody(userCreateSchema),
  validateIdExists,
  userControllers.create
);
userRouter.get("", userControllers.read);

// userRouter.use("")

userRouter.get("", userControllers.retrieve);
userRouter.patch("", validateBody(userUpdateSchema));
userRouter.delete("", userControllers.deleteUser);

export default userRouter;
