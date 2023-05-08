import { z } from "zod";
import {
  requestUserSchema,
  responseUserSchema,
  updateRequestUserSchema,
  userSchema,
} from "../schemas/users.schemas";
import { DeepPartial } from "typeorm";

type TUser = z.infer<typeof userSchema>;

type TRequestUser = z.infer<typeof requestUserSchema>;

type TResponseUser = z.infer<typeof responseUserSchema>;

type TUpdate = z.infer<typeof updateRequestUserSchema>;

type TRequestUpdateUser = DeepPartial<TUpdate>;

export { TUser, TRequestUser, TResponseUser, TRequestUpdateUser, TUpdate };
