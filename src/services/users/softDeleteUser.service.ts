import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../error";

const deleteUsersService = async (userId: number): Promise<void> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepo.findOneBy({
    id: userId,
  });

  if (user!.deletedAt == null) {
    await userRepo.softRemove(user!);
  } else {
    throw new AppError("User is already deactivated!", 409);
  }
};

export { deleteUsersService };
