import {Request, Response, NextFunction,RequestHandler} from "express";
import asyncHandler from"express-async-handler";
import subcategoriesSchema from "./products.schema";
import {Products} from "./products.interface";
import {Categories} from "../categories/categories.interface";
import refactorService from "../refactor.service"
import ProductsSchema from "./products.schema";
import sharp from "sharp";
import {uploadSingleFile} from '../middelware/uploadsFiles.middleware' ;
import {uploadMultiFiles} from "../middelware/uploadsFiles.middleware";



class ProductsService {
    getAll: RequestHandler = refactorService.getAll<Products>(ProductsSchema, 'products')
    createOne: RequestHandler = refactorService.createOne<Products>(ProductsSchema)
    getOne: RequestHandler = refactorService.getOne<Products>(ProductsSchema, 'products')
    updateOne: RequestHandler = refactorService.updateOne<Products>(ProductsSchema, 'products')
    deleteOne: RequestHandler = refactorService.deleteOne<Products>(ProductsSchema, 'products')

    ////////////////////////////////
    uploadImages = uploadMultiFiles(['image'], [{name: 'cover', maxCount: 1}, {name: 'images', maxCount: 10}])

    saveImage = async (req: Request, res: Response, next: NextFunction) => {
        if (req.files) {
            if (req.files.cover) {
                const fileName: string = `product -${Date.now()}-cover.webp`;
                await sharp(req.files.cover[0].buffer)
                    .resize(1200, 1200)
                    .webp({quality: 100})
                    .toFile('uploads/images/products/${fileName}');
                req.body.cover = fileName;
            }

            if (req.files.images) {
                req.body.images = [];
                req.files.images.map(async (image: any, index: number) => {
                    const fileName: string = `product -${Date.now()}-image-N${index + 1}.webp`;
                    await sharp(image.buffer)
                        .resize(1200, 1200)
                        .webp({quality: 95})
                        .toFile('uploads/images/products/${fileName}');
                    req.body.images.push(fileName);
                });
            }
        }

        next();
    }
}
// saveImage = async (req: Request, res: Response, next: NextFunction) => {
//     if (req.file) {
//         const fileName: string = `product -${Date.now()}-cover.webp`;
//         await sharp(req.file.buffer)
//             .resize(1200, 1200)
//             .webp({quality: 100})
//             .toFile('uploads/images/products/${fileName}');
//        req.body.cover = fileName;
//     }
//     next();
//}}
    const productsService=new ProductsService();
    export default productsService ;
