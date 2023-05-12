import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { RealEstate, Schedule, User } from "../../entities";
import { TSchedulesRequest } from "../../interfaces/schedules.interface";
import { AppError } from "../../error";

const createScheduleService = async (
  userEmail: string,
  schedulesData: TSchedulesRequest
): Promise<Schedule> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const realEstateRepo: Repository<RealEstate> =
    AppDataSource.getRepository(RealEstate);
  const schedulesRepo: Repository<Schedule> =
    AppDataSource.getRepository(Schedule);

  const user: User | null = await userRepo.findOneBy({ email: userEmail });
  const realEstate: RealEstate | null = await realEstateRepo.findOneBy({
    id: schedulesData.realEstateId!,
  });

  if(!realEstate) {
    throw new AppError("RealEstate not found", 404)
  }

  delete schedulesData.realEstateId;

  const schedules: Schedule = schedulesRepo.create({
    ...schedulesData,
    user: user!,
    realEstate: realEstate!,
  });
  await schedulesRepo.save(schedules);

  return schedules;
};

export { createScheduleService };
