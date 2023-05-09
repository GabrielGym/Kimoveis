import { Request, Response } from "express";
import {
  TCategoryRequest,
  TCategoryResponse,
} from "../interfaces/categories.interfaces";
import { createCategory } from "../services/categories/createCategory.service";
import { listAllCategorisService } from "../services/categories/listAllCategoris.service";
import { listAllRealEstateByCategorisService } from "../services/categories/listAllRealEstateByCategory.service";
import { Category } from "../entities";

const createCategoryController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryData: TCategoryRequest = req.body;
  const newCategory: TCategoryResponse = await createCategory(categoryData);

  return res.status(201).json(newCategory);
};

const getCategoriesControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const listCategory: TCategoryResponse[] = await listAllCategorisService();

  return res.json(listCategory);
};

const listAllRealEstateByCategorisControllers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const categoryId: number = parseInt(req.params.id);

  const category: Category | null = await listAllRealEstateByCategorisService(categoryId);

  return res.json(category);
};

export {
  createCategoryController,
  getCategoriesControllers,
  listAllRealEstateByCategorisControllers,
};
