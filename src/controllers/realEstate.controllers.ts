import { Request, Response } from "express"
import { TRealEstateAndAddressRequest, TRealEstatesResponse } from "../interfaces/realEstate.interfaces"
import { getRealEstateService } from "../services/realEstates/getRealEstate.service"
import { createRealEstateService } from "../services/realEstates/createRealEstate.service"

const createRealEstateControllers = async (req: Request, res: Response): Promise<Response> => {
    const realEstateData: TRealEstateAndAddressRequest = req.body

    const newRealEstate = await createRealEstateService(realEstateData)

    return res.status(201).json(newRealEstate)
}

const getRealEstateControllers = async (req: Request, res: Response): Promise<Response> => {
    const listAllRealEstate: TRealEstatesResponse = await getRealEstateService()

    return res.json(listAllRealEstate)
}

export { getRealEstateControllers, createRealEstateControllers }