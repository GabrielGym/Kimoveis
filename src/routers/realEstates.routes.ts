import { Router } from "express";
import {
  createRealEstateControllers,
  getRealEstateControllers,
} from "../controllers/realEstate.controllers";
import { verifyDataIsValidadMiddleware } from "../middlewares/verifyDataIsValidad.middleware";
import { requestRealEstateSchema } from "../schemas/realEstate.schemas";
import { verifyTokenIsValidadMid } from "../middlewares/verifyTokenIsValidad.middleware";
import { verifyUserIsAdminMid } from "../middlewares/users/verifyUserIsAdmin.middleware";

const realEstatesRoute: Router = Router();

realEstatesRoute.post(
  "",
  verifyDataIsValidadMiddleware(requestRealEstateSchema),
  verifyTokenIsValidadMid,
  verifyUserIsAdminMid,
  createRealEstateControllers
);

realEstatesRoute.get("", getRealEstateControllers);

export { realEstatesRoute };
