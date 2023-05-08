import { Request, Response } from "express";
import {
  TRequestUpdateUser,
  TRequestUser,
  TResponseUser,
} from "../interfaces/users.interfaces";
import { createUserService } from "../services/users/createUsers.service";
import { listAllUserService } from "../services/users/listAllUsers.service";
import { updateUserService } from "../services/users/updateUser.service";
import { deleteUsersService } from "../services/users/softDeleteUser.service";

const createUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TRequestUser = req.body;
  const newUser: TResponseUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listAllUsersControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listUsers: TResponseUser[] = await listAllUserService();

  return res.json(listUsers);
};

const updateUserControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: TRequestUpdateUser = req.body;
  const userId: number = parseInt(req.params.id);
  const newUserData: TResponseUser = await updateUserService(userData, userId);

  return res.status(200).json(newUserData);
};

const deleteUsersController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userId: number = parseInt(req.params.id);

  await deleteUsersService(userId);

  return res.status(204).send();
};

export {
  createUserControllers,
  listAllUsersControllers,
  updateUserControllers,
  deleteUsersController,
};
