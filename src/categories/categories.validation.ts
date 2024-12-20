import {body} from "express-validator";
import categoriesSchema from "./categories.schema";
import validatorMiddleware from "../middelware/validator.middleware";
import {param} from "express-validator";
class CategoriesValidation {
   createOne= [body('name').notEmpty().withMessage('category name is required')
       .isLength({min:2 , max: 50}).withMessage('invalid length ')
       .custom(async(val:string)=>{
        const category :any =await categoriesSchema.findOne({name:val});
        if(category) throw new Error('category already exists')
        return true;
    }),validatorMiddleware]

    updateOne= [
        param('id').isMongoId().withMessage('invalid id'),
        body('name').optional()
        .isLength({min:2 , max: 50}).withMessage('invalid length ')
        .custom(async(val:string, {req})=>{
            const category :any =await categoriesSchema.findOne({name:val});
            if(category&&category._id!.toString()==! req.params ?.id.toString()) throw new Error('category already exists')
            return true;
        }),validatorMiddleware]

    getOne= [
        param('id').isMongoId().withMessage('invalid id'),
            validatorMiddleware]

    deleteOne = [
        param('id').isMongoId().withMessage('invalid id'),
            validatorMiddleware]

}
const categoriesValidation = new CategoriesValidation();
export default categoriesValidation;