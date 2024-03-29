import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

const verifyUserIsAdminMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepo.findOneBy({
    email: res.locals.userEmail,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }
  if (user.admin !== true) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export { verifyUserIsAdminMid };
