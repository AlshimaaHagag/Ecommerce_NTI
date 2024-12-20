import {NextFunction, Request, RequestHandler, Response} from "express";
import {Categories} from "./categories.interface";
import categoriesSchema from "./categories.schema";
import asyncHandler from "express-async-handler"
import refactorService from "../refactor.service";

class CategoriesService{
    getAll:RequestHandler=refactorService.getAll<Categories>(categoriesSchema)
    createOne: RequestHandler=refactorService.createOne<Categories>(categoriesSchema)
    getOne:RequestHandler=refactorService.getOne<Categories>(categoriesSchema,'categories')
    updateOne:RequestHandler=refactorService.updateOne<Categories>(categoriesSchema,'categories')
    deleteOne:RequestHandler=refactorService.deleteOne<Categories>(categoriesSchema,'categories')

}
const categoriesService =new CategoriesService();
export default categoriesService ;