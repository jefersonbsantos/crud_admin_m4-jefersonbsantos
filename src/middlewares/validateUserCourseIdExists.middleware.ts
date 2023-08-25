import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/AppError";
import { UserResult } from "../interfaces/user.interfaces";

const validateUserCourseIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userCourseId } = req.params;

  const query: UserResult = await client.query(
    'SELECT * FROM "userCourses" WHERE "id" = $1;',
    [userCourseId]
  );

  if (query.rowCount === 0) {
    throw new AppError("Course not found", 404);
  }

  res.locals = { ...res.locals, foundUserCourse: query.rows[0] };

  return next();
};

export default validateUserCourseIdExists;
