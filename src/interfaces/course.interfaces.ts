import { z } from "zod";
import { QueryResult } from "pg";
import { courseCreateSchema, courseSchema } from "../schemas/course.schemas";

type Course = z.infer<typeof courseSchema>;
type CourseCreate = z.infer<typeof courseCreateSchema>;

type CourseResult = QueryResult<Course>;

export { Course, CourseCreate, CourseResult };
