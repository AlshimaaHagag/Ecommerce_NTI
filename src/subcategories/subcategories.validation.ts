import {body} from "express-validator";
import validatorMiddleware from "../middelware/validator.middleware";
import subcategoriesSchema from "./subcategories.schema";
import {param} from "express-validator";
import categoriesSchema from "../categories/categories.schema";

class SubcategoriesValidation {
    createOne= [body('name').notEmpty().withMessage('subcategory name is required')
        .isLength({min:2 , max: 50}).withMessage('invalid length '),
        body('category')
            .notEmpty().withMessage('category is required')
        .isMongoId().withMessage('invalid id')
            .custom(async(val:string)=>{
                const category :any =await categoriesSchema.findById(val);
                if(!category) throw new Error('category does not exists')
                return true;
            }),
        validatorMiddleware
    ]
    updateOne= [
        param('id').isMongoId().withMessage('invalid id'),
        body('name').optional() .isLength({min:2 , max: 50}).withMessage('invalid length '),
            body('category').optional().isMongoId().withMessage('invalid id')
            .custom(async(val:string)=>{
            const category :any =await categoriesSchema.findById(val);
            if(!category) throw new Error('category does not exists')
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
const subcategoriesValidation = new SubcategoriesValidation();
export default subcategoriesValidation;