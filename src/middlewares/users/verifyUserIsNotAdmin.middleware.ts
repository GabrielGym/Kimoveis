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
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepo.findOneBy({
    email: res.locals.userEmail,
  });

  if (user!.admin == false && user!.id !== parseInt(req.params.id)) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export { verifyUserIsNotAdminMid };
