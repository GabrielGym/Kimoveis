import { z } from "zod";

const requestLoginSchema = z.object({
  email: z.string().email().max(45),
  password: z.string().max(120),
});

const responseLoginSchema = z.object({
  token: z.string(),
});

export { requestLoginSchema, responseLoginSchema };
