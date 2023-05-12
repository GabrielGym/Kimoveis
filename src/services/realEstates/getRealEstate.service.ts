import { Repository } from "typeorm";
import { TRealEstatesResponse } from "../../interfaces/realEstate.interfaces";
import { RealEstate } from "../../entities";
import { AppDataSource } from "../../data-source";
import { responseRealEstatesSchema } from "../../schemas/realEstate.schemas";

const getRealEstateService = async (): Promise<TRealEstatesResponse> => {
    const realEstateRepo: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const listAllRealEstate: RealEstate[] | null = await realEstateRepo.find({relations: {address: true, category: true}})

    const returnRealEstates: TRealEstatesResponse = responseRealEstatesSchema.parse(listAllRealEstate)

    return returnRealEstates
}

export { getRealEstateService }