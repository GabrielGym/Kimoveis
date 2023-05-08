import { Repository } from "typeorm";
import {
  TCategoryRequest,
  TCategoryResponse,
} from "../../interfaces/categories.interfaces";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { responseCategorySchema } from "../../schemas/categories.schemas";

const createCategory = async (
  categoryData: TCategoryRequest
): Promise<TCategoryResponse> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const newCategory: Category = categoryRepo.create(categoryData);
  await categoryRepo.save(newCategory);

  const returnCategory: TCategoryResponse =
    responseCategorySchema.parse(newCategory);

  return returnCategory;
};

export { createCategory };
