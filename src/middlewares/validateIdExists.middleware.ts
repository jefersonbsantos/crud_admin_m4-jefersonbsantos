import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { UserResult } from "../interfaces/user.interfaces";
import AppError from "../errors/AppError";
import { CourseResult } from "../interfaces/course.interfaces";

export const validateIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId } = req.params;

  const query: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "id" = $1;',
    [userId]
  );

  if (query.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  res.locals = { ...res.locals, foundUser: query.rows[0] };

  return next();
};

export const validateCourseIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { courseId } = req.params;

  const query: CourseResult = await client.query(
    'SELECT * FROM "courses" WHERE "id" = $1;',
    [courseId]
  );

  if (query.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  res.locals = { ...res.locals, foundUser: query.rows[0] };

  return next();
};
