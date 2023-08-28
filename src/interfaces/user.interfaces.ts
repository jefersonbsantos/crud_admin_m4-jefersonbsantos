import { QueryResult } from "pg";
import { z } from "zod";
import {
  userCreateSchema,
  userPasswordSchema,
  userSchema,
  userUpdateSchema,
} from "../schemas/user.schemas";

type User = z.infer<typeof userSchema>;

type UserCreate = z.infer<typeof userCreateSchema>;
type UserRead = Array<User>;
type UserUpdate = z.infer<typeof userUpdateSchema>;
type UserReturn = z.infer<typeof userPasswordSchema>;

type UserResult = QueryResult<User>;

export { User, UserCreate, UserRead, UserUpdate, UserResult, UserReturn };
