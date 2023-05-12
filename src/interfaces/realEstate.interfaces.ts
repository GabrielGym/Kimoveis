import { z } from "zod";
import { requestRealEstateSchema, responseRealEstateSchema, responseRealEstatesSchema } from "../schemas/realEstate.schemas";

type TRealEstateAndAddressRequest = z.infer<typeof requestRealEstateSchema>;

type TRealEstateAndAddressResponse = z.infer<typeof responseRealEstateSchema>;

type TRealEstatesResponse = z.infer<typeof responseRealEstatesSchema>

export { TRealEstateAndAddressRequest, TRealEstateAndAddressResponse, TRealEstatesResponse };