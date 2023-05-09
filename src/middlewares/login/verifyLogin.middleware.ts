import { NextFunction, Request, Response } from "express";
import { TLoginRequest } from "../../interfaces/login.interfaces";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";
import * as bcrypt from "bcryptjs";

const verifyLoginMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password }: TLoginRequest = req.body;

  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepo.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  if (user.deletedAt !== null) {
    throw new AppError("Invalid credentials", 401);
  }

  const comparePassword = await bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw new AppError("Invalid credentials", 401);
  }

  res.locals.user = user;

  return next();
};

export { verifyLoginMid };
