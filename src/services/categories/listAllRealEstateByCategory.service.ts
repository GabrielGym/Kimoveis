import { Repository } from "typeorm";
import { Category } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../error";

const listAllRealEstateByCategorisService = async (
  categoryId: number
): Promise<Category | null> => {
  const categoryRepo: Repository<Category> =
    AppDataSource.getRepository(Category);

  const veryfiIdCategory: Category | null = await categoryRepo.findOneBy({
    id: categoryId,
  });

  if (!veryfiIdCategory) throw new AppError("Category not found", 404);

  const listRealEstate: Category | null = await categoryRepo
    .createQueryBuilder("category")
    .innerJoinAndSelect("category.realEstate", "realEstate")
    .where("category.id = :categoryId", { categoryId })
    .getOne();

  return listRealEstate;
};

export { listAllRealEstateByCategorisService };
