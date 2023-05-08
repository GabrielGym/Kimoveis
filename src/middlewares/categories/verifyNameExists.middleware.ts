import { NextFunction, Request, Response } from "express";
import { Category } from "../../entities";
import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

const verifyNameExistsMid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const user: Category | null = await categoryRepo.findOneBy({
    name: req.body.name,
  });

  if (user) {
    throw new AppError("Category already exists.", 409);
  }

  return next();
};

export { verifyNameExistsMid };
