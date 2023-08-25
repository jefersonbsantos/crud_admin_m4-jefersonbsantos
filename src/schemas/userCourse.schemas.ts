import { z } from "zod";

const userCourseSchema = z.object({
  id: z.number().positive(),
  active: z.boolean(),
  userId: z.number().positive(),
  courseId: z.number().positive(),
});

const userCourseCreateSchema = userCourseSchema.omit({
  id: true,
  userId: true,
  courseId: true,
});

const userCourseReadSchema = userCourseSchema.array();

const userCourseAddCourseSchema = z.object({
  courseId: z.number().positive(),
});

export {
  userCourseSchema,
  userCourseCreateSchema,
  userCourseReadSchema,
  userCourseAddCourseSchema,
};
