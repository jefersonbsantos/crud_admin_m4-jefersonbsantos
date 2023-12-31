import { Request, Response } from "express";
import { Course, CourseCreate } from "../interfaces/course.interfaces";
import courseServices from "../services/course.services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const course: CourseCreate = await courseServices.create(req.body);
  return res.status(201).json(course);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const course: Array<Course> = await courseServices.read();
  return res.status(200).json(course);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const course = await courseServices.retrieve(req.params.id);
  return res.status(200).json(course);
};

export default { create, read, retrieve };
