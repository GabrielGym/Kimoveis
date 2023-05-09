import { Router } from "express";
import { requestCategorySchema } from "../schemas/categories.schemas";
import { verifyDataIsValidadMiddleware } from "../middlewares/verifyDataIsValidad.middleware";
import {
  createCategoryController,
  getCategoriesControllers,
  listAllRealEstateByCategorisControllers,
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
  getCategoriesControllers
);

caregoriesRouter.get(
  "/:id/realEstate",
  listAllRealEstateByCategorisControllers
);

export default caregoriesRouter;
