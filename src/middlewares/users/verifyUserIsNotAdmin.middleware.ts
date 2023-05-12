import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

const verifyUserIsNotAdminMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const id: number = parseInt(req.params.id);
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const userToken: User | null = await usersRepo.findOneBy({
    email: res.locals.userEmail,
  });

  const user: User | null = await usersRepo.findOneBy({
    id: id,
  });

  if (!user || !userToken) {
    throw new AppError("User not found", 404);
  }

  if (userToken.admin === false || user.admin === true) {
    throw new AppError("Insufficient permission", 403);

  }

  return next();
};

export { verifyUserIsNotAdminMid };
