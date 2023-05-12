import { z } from "zod";

const schedulesSchema = z.object({
    id: z.number(),
    date: z.string(),
    hour: z.string(),
    realEstateId: z.number().optional()
})

const requestSchedulesSchema = schedulesSchema.omit({ id: true })

const responseSchedulesSchema = schedulesSchema

const responseArraySchedulesSchema = z.array(responseSchedulesSchema)

export { requestSchedulesSchema, responseSchedulesSchema, responseArraySchedulesSchema };