import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../error";

const verifyEmailExistsMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepo.findOneBy({
    email: req.body.email,
  });

  if (user) {
    throw new AppError("Email already exists", 409);
  }

  return next();
};

export { verifyEmailExistsMid };
