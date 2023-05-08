import { Repository } from "typeorm";
import {
  TRequestUpdateUser,
  TResponseUser,
} from "../../interfaces/users.interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { responseUserSchema } from "../../schemas/users.schemas";

const updateUserService = async (
  userData: TRequestUpdateUser,
  userId: number
): Promise<TResponseUser> => {
  userData = {
    ...userData,
    ...(userData.updatedAt = new Date()),
  };
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const oldUserData: User | null = await userRepo.findOneBy({
    id: userId,
  });

  const newUserData: User = userRepo.create({
    ...oldUserData,
    ...userData,
  });

  await userRepo.save(newUserData);

  const returnNewUser: TResponseUser = responseUserSchema.parse(newUserData);

  return returnNewUser;
};

export { updateUserService };
