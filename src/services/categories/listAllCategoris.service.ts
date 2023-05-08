import { Repository } from "typeorm";
import { TCategoryResponse } from "../../interfaces/categories.interfaces";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { responseCategoriesSchema } from "../../schemas/categories.schemas";

const listAllCategorisService = async (): Promise<TCategoryResponse[]> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const listCategory: Category[] = await categoryRepo.find();

  const returnCategory: TCategoryResponse[] =
    responseCategoriesSchema.parse(listCategory);

  return returnCategory;
};

export { listAllCategorisService };
