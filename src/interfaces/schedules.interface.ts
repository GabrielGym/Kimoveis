import { z } from "zod";
import { requestSchedulesSchema, responseArraySchedulesSchema, responseSchedulesSchema } from "../schemas/schedules.entities";


type TSchedulesRequest = z.infer<typeof requestSchedulesSchema>;

type TSchedulesResponse = z.infer<typeof responseSchedulesSchema>;

type TArraySchedulesResponse = z.infer<typeof responseArraySchedulesSchema>


export { TSchedulesRequest, TSchedulesResponse, TArraySchedulesResponse };