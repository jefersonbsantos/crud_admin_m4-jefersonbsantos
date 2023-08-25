import { z } from "zod";
import { QueryResult } from "pg";
import {
  userCourseAddCourseSchema,
  userCourseCreateSchema,
  userCourseReadSchema,
  userCourseSchema,
} from "../schemas/userCourse.schemas";

type UserCourse = z.infer<typeof userCourseSchema>;
type UserCourseCreate = z.infer<typeof userCourseCreateSchema>;
type UserCourseRead = z.infer<typeof userCourseReadSchema>;

type UserCourseAddCourse = z.infer<typeof userCourseAddCourseSchema>;

type UserCourseResult = QueryResult<UserCourse>;

export {
  UserCourse,
  UserCourseCreate,
  UserCourseResult,
  UserCourseRead,
  UserCourseAddCourse,
};
