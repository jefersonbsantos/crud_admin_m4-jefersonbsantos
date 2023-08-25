import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { UserResult } from "../interfaces/user.interfaces";
import AppError from "../errors/AppError";

const validateNameExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name } = req.body;

  if (!name) return next();

  const query: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "name" = $1',
    [name]
  );

  if (query.rowCount !== 0) {
    throw new AppError("Username already exists.", 409);
  }

  return next();
};

export default validateNameExists;
