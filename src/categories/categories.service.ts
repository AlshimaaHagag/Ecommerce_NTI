import {NextFunction, Request, RequestHandler, Response} from "express";
import {Categories} from "./categories.interface";
import categoriesSchema from "./categories.schema";
import asyncHandler from "express-async-handler"
<<<<<<< HEAD
import refactorService from "../refactor.service";

class CategoriesService{
    getAll:RequestHandler=refactorService.getAll<Categories>(categoriesSchema)
    createOne: RequestHandler=refactorService.createOne<Categories>(categoriesSchema)
    getOne:RequestHandler=refactorService.getOne<Categories>(categoriesSchema,'categories')
    updateOne:RequestHandler=refactorService.updateOne<Categories>(categoriesSchema,'categories')
    deleteOne:RequestHandler=refactorService.deleteOne<Categories>(categoriesSchema,'categories')
=======

class CategoriesService{

 getAll:RequestHandler=asyncHandler(async(req:Request,res:Response,next:NextFunction)=> {
    const categories: Categories[] = await categoriesSchema.find();
    res.status(200).json({data: categories});

})

createOne:RequestHandler=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
const category: Categories =await categoriesSchema.create(req.body);
res.status(201).json({data:category});
 });

    getOne:RequestHandler=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const category: Categories | null =await categoriesSchema.findById(req.params.id);
        res.status(200).json({data:category});
    });

    updateOne:RequestHandler=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const category: Categories | null =await categoriesSchema.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({data:category});
    });
    deleteOne:RequestHandler=asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const category: Categories | null =await categoriesSchema.findByIdAndDelete(req.params.id);
        res.status(204).json();
    });


>>>>>>> 6b9d75262522fc7fce666bdd5bcef5b8af7f321c

}
const categoriesService =new CategoriesService();
export default categoriesService ;