import { z } from "zod";
import { requestSchefulesSchema, responseArraySchefulesSchema, responseSchefulesSchema } from "../schemas/schefules.entities";


type TSchefulesRequest = z.infer<typeof requestSchefulesSchema>;

type TSchefulesResponse = z.infer<typeof responseSchefulesSchema>;

type TArraySchefulesResponse = z.infer<typeof responseArraySchefulesSchema>


export { TSchefulesRequest, TSchefulesResponse, TArraySchefulesResponse };