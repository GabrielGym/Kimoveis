import { z } from "zod";

const categorySchema = z.object({
  id: z.number(),
  name: z.string().max(45),
});

const requestCategorySchema = categorySchema.omit({ id: true });

const responseCategorySchema = categorySchema;

const responseCategoriesSchema = z.array(responseCategorySchema);

export {
  requestCategorySchema,
  responseCategorySchema,
  responseCategoriesSchema,
};
