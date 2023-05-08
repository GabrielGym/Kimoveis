import { Router } from "express";
import { verifyDataIsValidadMiddleware } from "../middlewares/verifyDataIsValidad.middleware";
import {
  requestUserSchema,
  updateRequestSchema,
} from "../schemas/users.schemas";
import {
  createUserControllers,
  deleteUsersController,
  listAllUsersControllers,
  updateUserControllers,
} from "../controllers/users.controllers";
import { verifyEmailExistsMid } from "../middlewares/users/verifyEmailExists.middleware";
import { verifyIdExistsMid } from "../middlewares/users/verifyIdExists.middleware";
import { verifyTokenIsValidadMid } from "../middlewares/verifyTokenIsValidad.middleware";
import { verifyUserIsAdminMid } from "../middlewares/users/verifyUserIsAdmin.middleware";
import { verifyUserIsNotAdminMid } from "../middlewares/users/verifyUserIsNotAdmin.middleware";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  verifyDataIsValidadMiddleware(requestUserSchema),
  verifyEmailExistsMid,
  createUserControllers
);
usersRoutes.get(
  "",
  verifyTokenIsValidadMid,
  verifyUserIsAdminMid,
  listAllUsersControllers
);
usersRoutes.patch(
  "/:id",
  verifyDataIsValidadMiddleware(updateRequestSchema),
  verifyIdExistsMid,
  verifyTokenIsValidadMid,
  verifyUserIsNotAdminMid,
  updateUserControllers
);
usersRoutes.delete(
  "/:id",
  verifyIdExistsMid,
  verifyTokenIsValidadMid,
  verifyUserIsAdminMid,
  deleteUsersController
);

export { usersRoutes };
