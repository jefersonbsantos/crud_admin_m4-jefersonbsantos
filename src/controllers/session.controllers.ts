import { Request, Response } from "express";
import { SessionReturn } from "../interfaces/session.interfaces";
import sessionsServices from "../services/sessions.services";

const create = async (req: Request, res: Response): Promise<Response> => {
  const token: SessionReturn = await sessionsServices.create(req.body);
  return res.status(200).json(token);
};

export default { create };
