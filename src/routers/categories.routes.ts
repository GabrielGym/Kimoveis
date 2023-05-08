import { Router } from "express";
import { requestCategorySchema } from "../schemas/categories.schemas";
import { verifyDataIsValidadMiddleware } from "../middlewares/verifyDataIsValidad.middleware";
import {
  createCategoryController,
  getCategoriesControllers,
} from "../controllers/categories.controllers";
import { verifyNameExistsMid } from "../middlewares/categories/verifyNameExists.middleware";
import { verifyTokenIsValidadMid } from "../middlewares/verifyTokenIsValidad.middleware";
import { verifyUserIsAdminMid } from "../middlewares/users/verifyUserIsAdmin.middleware";

const caregoriesRouter: Router = Router();

caregoriesRouter.post(
  "",
  verifyDataIsValidadMiddleware(requestCategorySchema),
  verifyTokenIsValidadMid,
  verifyUserIsAdminMid,
  verifyNameExistsMid,
  createCategoryController
);

caregoriesRouter.get(
  "",
  verifyTokenIsValidadMid,
  verifyUserIsAdminMid,
  getCategoriesControllers
);

export default caregoriesRouter;
