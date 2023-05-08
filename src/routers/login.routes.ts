import { Router } from "express";
import { requestLoginSchema } from "../schemas/login.schemas";
import { createLoginController } from "../controllers/login.controllers";
import { verifyDataIsValidadMiddleware } from "../middlewares/verifyDataIsValidad.middleware";
import { verifyLoginMid } from "../middlewares/login/verifyLogin.middleware";

const loginRouter: Router = Router();

loginRouter.post(
  "",
  verifyDataIsValidadMiddleware(requestLoginSchema),
  verifyLoginMid,
  createLoginController
);

export default loginRouter;
