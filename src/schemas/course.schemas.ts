import { z } from "zod";

const courseSchema = z.object({
  id: z.number().positive(),
  name: z.string().max(15),
  descritption: z.string(),
});

const courseCreateSchema = courseSchema.omit({ id: true }).array().min(1);

export { courseSchema, courseCreateSchema };
