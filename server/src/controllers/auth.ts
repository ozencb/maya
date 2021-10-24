import { Request, Response } from "express";

import { success, status } from "../constants/http";
import { DI } from "../lib";

export const loginController = async (_req: Request, res: Response) => {
  res.status(status.SUCCESS).send({ ...success, data: "testResp" });
};

export const refreshTokenController = async (_req: Request, res: Response) => {
  res.status(status.SUCCESS).send({ ...success, data: "testResp" });
};

export const getUserInfoController = async (_req: Request, res: Response) => {
  const users = await DI.userRepository.findAll({});
  res.status(status.SUCCESS).send({ ...success, data: users });
};

export const logOutController = async (_req: Request, res: Response) => {
  res.status(status.SUCCESS).send({ ...success, data: "testResp" });
};
