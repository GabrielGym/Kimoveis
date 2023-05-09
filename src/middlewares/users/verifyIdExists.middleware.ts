import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { Repository } from "typeorm";
import { AppError } from "../../error";

const verifyIdExistsMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const usersRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await usersRepo.findOneBy({
    id: parseInt(req.params.id),
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return next();
};

export { verifyIdExistsMid };
