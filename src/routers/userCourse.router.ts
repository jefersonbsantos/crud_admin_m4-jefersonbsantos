import { Router } from "express";
import validateBody from "../middlewares/validateBody.middleware";
import {
  userCourseAddCourseSchema,
  userCourseCreateSchema,
} from "../schemas/userCourse.schemas";
import verifyToken from "../middlewares/verifyToken.middleware";
import userCourseControllers from "../controllers/userCourse.controllers";
import validateUserCourseIdExists from "../middlewares/validateUserCourseIdExists.middleware";
import validateIdBodyExists from "../middlewares/validateIdBodyExists";

const userCourseRouter: Router = Router();

userCourseRouter.post(
  "",
  validateBody(userCourseCreateSchema),
  verifyToken,
  userCourseControllers.create
);
userCourseRouter.get("", verifyToken, userCourseControllers.read);

userCourseRouter.post(
  "/:userCourseId/add",
  verifyToken,
  validateBody(userCourseAddCourseSchema),
  validateUserCourseIdExists,
  validateIdBodyExists,
  userCourseControllers.addCourse
);

export default userCourseRouter;
