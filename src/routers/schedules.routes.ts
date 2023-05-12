import { Router } from "express";
import { createScheduleController } from "../controllers/schedules.controllers";
import { verifyTokenIsValidadMid } from "../middlewares/verifyTokenIsValidad.middleware";

const schedulesRoutes: Router = Router();

schedulesRoutes.post("",verifyTokenIsValidadMid, createScheduleController);

export { schedulesRoutes }