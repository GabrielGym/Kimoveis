import { Repository } from "typeorm";
import {
  TRealEstateAndAddressRequest,
  TRealEstateAndAddressResponse,
} from "../../interfaces/realEstate.interfaces";
import { Address, Category, RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { responseRealEstateSchema } from "../../schemas/realEstate.schemas";

const createRealEstateService = async (
  realEstateData: TRealEstateAndAddressRequest
): Promise<TRealEstateAndAddressResponse | void> => {
  const addressRepo: Repository<Address> = AppDataSource.getRepository(Address);
  const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate);
  const categoryRepo: Repository<Category> = AppDataSource.getRepository(Category);

  const addressData = realEstateData.address!;
  const categoryData = realEstateData.category!;
  delete realEstateData.category;
  delete realEstateData.address;

  const newAddress: Address = addressRepo.create(addressData);
  await addressRepo.save(newAddress);

  const newCategory: Category = categoryRepo.create(categoryData);
  await categoryRepo.save(newCategory);

  const newRealEstate: RealEstate = realEstateRepo.create({
    ...realEstateData,
    address: newAddress,
    category: newCategory,
  });
  await realEstateRepo.save(newRealEstate);

  const returnRealEstates: TRealEstateAndAddressResponse =
    responseRealEstateSchema.parse(newRealEstate);

  return returnRealEstates;
};

export { createRealEstateService };
