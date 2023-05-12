import { z } from "zod";
import { requestAddressSchema, responseAddressSchema } from "./address.schemas";
import { requestCategorySchema, responseCategorySchema } from "./categories.schemas";

const realEstate = z.object({
    id: z.number(),
    sold: z.boolean(),
    value: z.number().or(z.string()),
    size: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

const requestRealEstateSchema = realEstate.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    sold: true
}).extend({
    address: z.optional(requestAddressSchema),
    category: z.optional(requestCategorySchema)
})

const responseRealEstateSchema = realEstate.extend({
    address: z.optional(responseAddressSchema),
    category: z.optional(responseCategorySchema)
})

const responseRealEstatesSchema = z.array(responseRealEstateSchema)

export { requestRealEstateSchema, responseRealEstateSchema, responseRealEstatesSchema };