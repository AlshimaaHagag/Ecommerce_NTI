import {Request, Response, NextFunction,RequestHandler} from "express";
import asyncHandler from"express-async-handler";
import subcategoriesSchema from "./subcategories.schema";
import {Subcategories} from "./subcategories.interface";

class SubcategoriesService{
setCategoryId(req:Request ,res:Response ,next:NextFunction){
    const filterData:any={};
    if (req.params.categoryId)filterData.category= req.params.categoryId;
    req.filterData = filterData;
    next();
}
    getAll:RequestHandler =asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        let filterData:any={};
        if(req.filterData) filterData =req.filterData;

     const subcategories:Subcategories[]=await subcategoriesSchema.find(filterData);
    res.status(200).json({data:subcategories});
});
   createOne:RequestHandler =asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const subcategory: Subcategories=await subcategoriesSchema.create(req.body)
        res.status(200).json({data:subcategory});
    });
    getOne:RequestHandler =asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const subcategory:Subcategories | null = await subcategoriesSchema.findById(req.body)
        res.status(200).json({data:subcategory});
    });
    updateOne:RequestHandler =asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const subcategory:Subcategories | null =await subcategoriesSchema.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json({data:subcategory});
    });
    deleteOne:RequestHandler =asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        const subcategory:Subcategories | null=await subcategoriesSchema.findByIdAndDelete(req.params.id)
        res.status(204).json();
    });

}
const subcategoriesService=new SubcategoriesService();
export default subcategoriesService;