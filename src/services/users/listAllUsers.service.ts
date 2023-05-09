import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { TResponseUser } from "../../interfaces/users.interfaces";
import { responseUsersSchema } from "../../schemas/users.schemas";

const listAllUserService = async (): Promise<TResponseUser[]> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const listUsers: User[] = await userRepo.find({
    withDeleted: true
  });

  const returnUser: TResponseUser[] = responseUsersSchema.parse(listUsers);

  return returnUser;
};

export { listAllUserService };
