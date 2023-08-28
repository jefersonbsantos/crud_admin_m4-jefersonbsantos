import { Router } from "express";
import validateBody from "../middlewares/validateBody.middleware";
import userControllers from "../controllers/user.controllers";
import { userCreateSchema } from "../schemas/user.schemas";
import validateEmailExists from "../middlewares/validateEmailExists.middleware";
import verifyToken from "../middlewares/verifyToken.middleware";
import verifyUserPermission from "../middlewares/verifyUserPermission.middleware";

const userRouter: Router = Router();

userRouter.post(
  "",
  validateBody(userCreateSchema),
  validateEmailExists,
  userControllers.create
);
userRouter.get("", verifyToken, verifyUserPermission, userControllers.read);

userRouter.get(
  "/:id/courses",
  verifyToken,
  verifyUserPermission,
  userControllers.retrieve
);

export default userRouter;
