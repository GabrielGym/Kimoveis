import { Repository } from "typeorm";
import {
  TRequestUser,
  TResponseUser,
} from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { responseUserSchema } from "../../schemas/users.schemas";

const createUserService = async (
  userData: TRequestUser
): Promise<TResponseUser> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const newUser: User = userRepo.create(userData);
  await userRepo.save(newUser);

  const returnUser: TResponseUser = responseUserSchema.parse(newUser);

  return returnUser;
};

export { createUserService };
