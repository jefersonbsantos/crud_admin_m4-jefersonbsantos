import { Request, Response } from "express";
import userServices from "../services/user.services";
import { User, UserRead } from "../interfaces/user.interfaces";

const create = async (req: Request, res: Response): Promise<Response> => {
  const user: User = await userServices.create(req.body);
  return res.status(201).json(user);
};

const read = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await userServices.read();
  return res.status(200).json(users);
};

const retrieve = async (req: Request, res: Response): Promise<Response> => {
  const user: User = res.locals.foundUser;
  return res.status(200).json(user);
};

const partialUpdate = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId } = req.params;
  const validated = res.locals;
  const user: User = await userServices.partialUpdate(userId, req.body);

  return res.status(200).json(user);
};

const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  await userServices.deleteUser(req.params.userId);
  return res.status(204).json();
};

export default { create, read, retrieve, partialUpdate, deleteUser };
