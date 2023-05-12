import { z } from "zod";

const addressSchema = z.object({
    id: z.number(),
    street: z.string().max(45),
    zipCode: z.string().max(8),
    number: z.string().max(7),
    city: z.string().max(20),
    state: z.string().max(2),
});

const requestAddressSchema = addressSchema.omit({ id: true})

const responseAddressSchema = addressSchema

export { responseAddressSchema, requestAddressSchema }