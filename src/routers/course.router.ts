import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.middleware";
import validateAdmin from "../middlewares/validateAdmin.middleware";
import validateBody from "../middlewares/validateBody.middleware";
import { courseCreateSchema } from "../schemas/course.schemas";
import courseControllers from "../controllers/course.controllers";
import userControllers from "../controllers/user.controllers";
import userCourseControllers from "../controllers/userCourse.controllers";

const courseRouter: Router = Router();

courseRouter.post(
  "",
  verifyToken,
  validateAdmin,
  validateBody(courseCreateSchema),
  courseControllers.create
);

courseRouter.post("", courseControllers.create);
courseRouter.get("", courseControllers.read);

courseRouter.get("/:id/users");
courseRouter.post("/:courseId/users/:userId", userCourseControllers.addCourse);
courseRouter.delete("/:courseId/users/:userId", userControllers.deleteCourse);

export default courseRouter;
