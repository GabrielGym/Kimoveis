import { Router } from "express";
import { createScheduleController } from "../controllers/schedules.controllers";
import { verifyTokenIsValidadMid } from "../middlewares/verifyTokenIsValidad.middleware";
import { verifyDataIsValidadMiddleware } from "../middlewares/verifyDataIsValidad.middleware";
import { requestSchedulesSchema } from "../schemas/schedules.entities";

const schedulesRoutes: Router = Router();

schedulesRoutes.post("",verifyTokenIsValidadMid, verifyDataIsValidadMiddleware(requestSchedulesSchema),  createScheduleController);

export { schedulesRoutes }