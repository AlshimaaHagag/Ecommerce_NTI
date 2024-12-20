import {NextFunction, Request,Response} from "express";
import  {Router} from 'express';
import productsService from "./products.service";
import productsValidation from "./products.validation";
import multer from 'multer';
import uuid from 'uuid';
import sharp from 'sharp';
///////////////////

const productsRoute:Router =Router();

productsRoute.route('/')
.get(productsService.getAll)
.post(productsService.uploadImages,productsService.saveImage, productsValidation.createOne,productsService.createOne);

productsRoute.route('/:id')
    .get(productsValidation.getOne,productsService.getOne)
    .put(productsService.uploadImages,productsService.saveImage,productsValidation.updateOne,productsService.updateOne)
    .delete(productsValidation.deleteOne,productsService.deleteOne);
export default productsRoute;
