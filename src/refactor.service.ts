import {NextFunction, Request, RequestHandler, Response} from "express";
import mongoose from "mongoose";
import ApiErrors from "./utils/apiErrors";
import asyncHandler from "express-async-handler";
import Features from "./utils/features";

class RefactorService {
    getAll = <modelType extends mongoose.Document>(model: mongoose.Model<modelType> ,modelName?:string) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            let filterData: any = {};
            if (req.filterData) filterData = req.filterData;

           const documentCount:number= await model.find(filterData).countDocuments();

            const features:any = new Features(model.find(filterData),req.query) .filter().sort().limitFields() .search(modelName!).paginate(documentCount);
            const {mongooseQuery ,paginationResults} = features;
            const document: modelType[] = await mongooseQuery;
            res.status(200).json({pagination:paginationResults, data: document});
        });


    getOne = <modelType extends mongoose.Document>(model: mongoose.Model<modelType>,modelName:string) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) :Promise<void>  => {
            const document: modelType | null = await model.findById(req.params.id);
            if (!document) return next( new ApiErrors(`data not found`,400));
            res.status(200).json({data: document});
        });

    createOne = <modelType extends mongoose.Document>(model: mongoose.Model<modelType>) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            const document: modelType = await model.create(req.body);
            res.status(200).json({data: document});
        });

    updateOne = <modelType extends mongoose.Document>(model: mongoose.Model<modelType>,modelName:string) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) :Promise<void> => {
            const document: modelType | null = await model.findByIdAndUpdate(req.params.id, req.body, {new: true});
            if (!document) return next( new ApiErrors(`data not found`,400));

            res.status(200).json({data: document});
        });

    deleteOne = <modelType extends mongoose.Document>(model: mongoose.Model<modelType>,modelName:string) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction):Promise<void> => {
            const document: modelType | null = await model.findByIdAndDelete(req.params.id);
            if (!document) return next (new ApiErrors(`data not found`,400));

            res.status(204).json();
        })
}


const refactorService =new RefactorService();
export default refactorService;