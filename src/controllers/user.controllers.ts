import { Request, Response } from "express";
import userServices from "../services/user.services";
import { UserReturn } from "../interfaces/user.interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userServices.create(req.body);
  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const users: UserReturn[] = await userServices.read();
  return res.status(200).json(users);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const user = await userServices.retrieve(req.params.id);
  return res.status(200).json(user);
};

const deleteCourse = async (req: Request, res: Response): Promise<Response> => {
  await userServices.deleteUser(req.params.userId, req.params.courseId);
  return res.status(204).json();
};

export default { create, read, retrieve, deleteCourse };
