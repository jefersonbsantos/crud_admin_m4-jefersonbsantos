import { Request, Response } from "express";
import {
  UserCourse,
  UserCourseRead,
} from "../interfaces/userCourse.interfaces";
import userCourseServices from "../services/userCourse.services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const userCourse: UserCourse = await userCourseServices.create(
    req.body,
    res.locals.decoded.sub
  );

  return res.status(201).json(userCourse);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const { admin } = res.locals.decoded;
  const userCourse: UserCourseRead = await userCourseServices.read(admin);

  return res.status(200).json(userCourse);
};

const addCourse = async (req: Request, res: Response): Promise<Response> => {
  const message: string = await userCourseServices.addCourse(
    req.body,
    req.params.userCourseId
  );

  return res.status(201).json({ message });
};

export default { create, read, addCourse };
