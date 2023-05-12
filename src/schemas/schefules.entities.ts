import { z } from "zod";

const requestSchefulesSchema = z.object({
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number(),
    userId: z.number(),
});

const responseSchefulesSchema = z.object({
    id: z.number(),
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number(),
    userId: z.number(),
});

const responseArraySchefulesSchema = z.array(responseSchefulesSchema)

export { requestSchefulesSchema, responseSchefulesSchema, responseArraySchefulesSchema };