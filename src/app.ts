import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import { handleErros } from "./error";
import { usersRoutes } from "./routers/users.routes";
import loginRouter from "./routers/login.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRouter);

app.use(handleErros);

export default app;
