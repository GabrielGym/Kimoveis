import { z } from "zod";
import { requestAddressSchema, responseAddressSchema } from "../schemas/address.schemas";

type TAddressRequest = z.infer<typeof requestAddressSchema>

type TAddressResponse = z.infer<typeof responseAddressSchema>

export { TAddressRequest, TAddressResponse }