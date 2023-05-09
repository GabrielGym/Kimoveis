import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string().max(45),
  email: z.string().email().max(45),
  admin: z.boolean().default(false),
  password: z.string().max(120),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.string().nullish(),
});

const requestUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

const responseUserSchema = userSchema.omit({ password: true });

const responseUsersSchema = z.array(responseUserSchema);

const updateRequestSchema = userSchema
  .omit({ id: true, admin: true })
  .partial();

const updateRequestUserSchema = userSchema.omit({ id: true, admin: true });

export {
  userSchema,
  requestUserSchema,
  responseUserSchema,
  responseUsersSchema,
  updateRequestUserSchema,
  updateRequestSchema,
};
