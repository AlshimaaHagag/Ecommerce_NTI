import {body} from "express-validator";
import validatorMiddleware from "../middelware/validator.middleware";
import subcategoriesSchema from "./products.schema";
import {param} from "express-validator";
import categoriesSchema from "../categories/categories.schema";
import {Categories} from "../categories/categories.interface";
import {Subcategories} from "../subcategories/subcategories.interface";


class ProductsValidation {
    createOne= [
        body('name').notEmpty().withMessage('subcategory name is required')
        .isLength({min:2 , max: 50}).withMessage('invalid length '),
        body('description')
            .notEmpty().withMessage('description is required')
            .isLength({min:2 , max: 500}).withMessage('invalid length '),

        body('price')
            .notEmpty().withMessage('price is required')
            .isFloat({min:1 ,max:1000000}).withMessage('invalid price '),

        body('discount')
            .isFloat({min:0 ,max:100}).withMessage('invalid discount ')
        .custom((val ,{req}) =>{
        req.body.priceAfterDiscount = req.body.price -(req.body.price* val/100)
            return true;
}),

        body('category')
            .notEmpty().withMessage('category is required')
        .isMongoId().withMessage('invalid id')
            .custom(async(val:string)=>{
                const category :any =await categoriesSchema.findById(val);
                if(!category) throw new Error('category does not exists')
                return true;
            }),
        body('subcategory')
            .notEmpty().withMessage('category is required')
            .isMongoId().withMessage('invalid id')
            .custom(async(val:string ,{req})=>{
                const subcategory :any =await subcategoriesSchema.findById(val);
                if(!subcategory) throw new Error('category does not exists')
                if(subcategory.category._id.toString()!=req.body.category) throw new Error('subcategory does not belongs to this category')
                return true;
            }),

        validatorMiddleware
    ]
    updateOne= [
        param('id').isMongoId().withMessage('invalid id'),
        body('name').optional() .isLength({min:2 , max: 50}).withMessage('invalid length '),
        body('description')
            .optional()
            .isLength({min:2 , max: 500}).withMessage('invalid length '),

        body('price')
            .optional()
            .isFloat({min:1 ,max:1000000}).withMessage('invalid price '),

        body('quantity')
            .optional()
            .isInt({min:1 ,max:1000000}).withMessage('invalid quantity '),

        body('discount')
            .optional()
            .isFloat({min:0 ,max:100}).withMessage('invalid discount ')
            .custom((val ,{req}) =>{
                req.body.priceAfterDiscount = req.body.price -(req.body.price* val/100)
                return true;
            }),

        body('category')
            .optional()
            .isMongoId().withMessage('invalid id')
            .custom(async(val:string)=>{
                const category :any =await categoriesSchema.findById(val);
                if(!category) throw new Error('category does not exists')
                return true;
            }),
        body('subcategory')
            .optional()
            .isMongoId().withMessage('invalid id')
            .custom(async(val:string ,{req})=>{
                const subcategory :any =await subcategoriesSchema.findById(val);
                if(!subcategory) throw new Error('category does not exists')
                if(subcategory.category._id.toString()!=req.body.category) throw new Error('subcategory does not belongs to this category')
                return true;
            }),

            validatorMiddleware
]

    getOne= [
        param('id').isMongoId().withMessage('invalid id'),
        validatorMiddleware]

    deleteOne = [
        param('id').isMongoId().withMessage('invalid id'),
        validatorMiddleware]

}
const subcategoriesValidation = new ProductsValidation();
export default subcategoriesValidation;