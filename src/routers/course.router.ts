import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.middleware";
import validateAdmin from "../middlewares/validateAdmin.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { courseCreateSchema } from "../schemas/course.schemas";
import courseControllers from "../controllers/course.controllers";
import userControllers from "../controllers/user.controllers";
import userCourseControllers from "../controllers/userCourse.controllers";
import verifyUserPermission from "../middlewares/verifyUserPermission.middleware";
import {
  validateCourseIdExists,
  validateIdExists,
} from "../middlewares/validateIdExists.middleware";

const courseRouter: Router = Router();

courseRouter.post(
  "",
  verifyToken,
  verifyUserPermission,
  validateBody(courseCreateSchema),
  courseControllers.create
);

courseRouter.get("", courseControllers.read);

courseRouter.get(
  "/:id/users",
  verifyToken,
  validateAdmin,
  courseControllers.retrieve
);
courseRouter.post(
  "/:courseId/users/:userId",
  verifyToken,
  verifyUserPermission,
  validateIdExists,
  validateCourseIdExists,
  userCourseControllers.addCourse
);
courseRouter.delete(
  "/:courseId/users/:userId",
  verifyToken,
  verifyUserPermission,
  validateIdExists,
  validateCourseIdExists,
  userControllers.deleteCourse
);

export default courseRouter;
