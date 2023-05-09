import { z } from "zod";
import {
  requestCategorySchema,
  responseCategorySchema,
} from "../schemas/categories.schemas";

type TCategoryRequest = z.infer<typeof requestCategorySchema>;

type TCategoryResponse = z.infer<typeof responseCategorySchema>;


export { TCategoryRequest, TCategoryResponse };
