import { Request,Response,NextFunction } from "express";
import { Categories } from "./categories.interface";
import categoriesSchema from "./categories.schema";
class CategoriesService{
async getAll(req:Request,res:Response,next:NextFunction){
    const categories :Categories[]= await categoriesSchema.find();
res.status(200).json({data: categories});

}
async creatOne(req:Request,res:Response,next:NextFunction){

const category: Categories =await categoriesSchema.create(req.body);
res.status(201).json({data:category})

 }

}
const categoriesService =new CategoriesService();
export default categoriesService ;