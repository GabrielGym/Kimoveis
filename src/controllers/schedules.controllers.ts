import { Request, Response } from "express";
import { TSchedulesRequest } from "../interfaces/schedules.interface";
import { createScheduleService } from "../services/schedules/createSchedules.service";

const createScheduleController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userEmail: string = res.locals.userEmail;
  const schedulesData: TSchedulesRequest = req.body

  const newSchedule = await createScheduleService(userEmail, schedulesData)

  return res.status(201).json(newSchedule);
};

export { createScheduleController };
