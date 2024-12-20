import {Request, Response, NextFunction,RequestHandler} from "express";
import asyncHandler from"express-async-handler";
import subcategoriesSchema from "./subcategories.schema";
import {Subcategories} from "./subcategories.interface";
import {Categories} from "../categories/categories.interface";
import refactorService from "../refactor.service"

class SubcategoriesService {
    setCategoryId(req: Request, res: Response, next: NextFunction) {
    };

    filterSubcategories(req: Request, res: Response, next: NextFunction) {
    }

    getAll: RequestHandler = refactorService.getAll<Subcategories>(subcategoriesSchema)
    createOne: RequestHandler = refactorService.createOne<Subcategories>(subcategoriesSchema)
    getOne: RequestHandler = refactorService.getOne<Subcategories>(subcategoriesSchema,'subcategories')
    updateOne: RequestHandler = refactorService.updateOne<Subcategories>(subcategoriesSchema,'subcategories')
    deleteOne: RequestHandler = refactorService.deleteOne<Subcategories>(subcategoriesSchema,'subcategories')

}
    const subcategoriesService=new SubcategoriesService();
export default subcategoriesService;