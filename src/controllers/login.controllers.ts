import { TLoginResponse } from "../interfaces/login.interfaces";
import { TUser } from "../interfaces/users.interfaces";
import { loginService } from "../services/login/createLogin.service";
import { Request, Response } from "express";

const createLoginController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const user: TUser = res.locals.user;
  const token: TLoginResponse = await loginService(user);
  return res.status(200).json(token);
};

export { createLoginController };
