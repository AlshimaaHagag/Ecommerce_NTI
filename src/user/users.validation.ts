import {body} from "express-validator";
import usersSchema from "./users.schema";
import validatorMiddleware from "../middelware/validator.middleware";
import {param} from "express-validator";
class UsersValidation {
   createOne= [
       body('username').notEmpty().withMessage('category name is required')
       .isLength({min:2 , max: 50}).withMessage('invalid length ')
       .custom(async(val:string ,{req})=> {
           const user: any = await usersSchema.findOne({username: val});
           if (user) throw new Error(`${req._('validation_value')}`);
           return true;
       }),

       body('email').notEmpty().withMessage('validation_field')
           .isEmail().withMessage('invalid length ')
           .custom(async(val:string ,{req})=> {
               const user: any = await usersSchema.findOne({username: val});
               if (user) throw new Error(`${req._('validatio _email_check')}`);
               return true;
           }),

       body('name').notEmpty().withMessage('validation_field')
           .isLength({min:2 , max: 50}).withMessage('invalid_length_short '),

       body('password').notEmpty().withMessage('validation_field')
           .isLength({min:6 , max: 20}).withMessage('invalid_length_password '),

       body('confirmPassword')
           .notEmpty().withMessage((val:string ,{req})=>req._ ('validation_field'))
           .isLength({min:6 , max: 20}).withMessage ((val:any ,{req}) =>req._('invalid_length_password '))
           .custom((val:string ,{req}):boolean => {
           if (val !==req.body.password) throw new Error(`${req._('validation_password_match')}`);
           return true;
       }),

       validatorMiddleware]

    updateOne= [
        param('id').isMongoId().withMessage('invalid id'),
        body('name')
            .optional()
        .isLength({min:2 , max: 50}).withMessage((val:any,{req})=>req._('validation_length_short')),
        validatorMiddleware]



    getOne= [
        param('id').isMongoId().withMessage('invalid id'),
            validatorMiddleware]

    deleteOne = [
        param('id').isMongoId().withMessage('invalid id'),
            validatorMiddleware]

    changePassword= [
        param('id').isMongoId().withMessage('invalid id'),
        body('password').notEmpty().withMessage('validation_field')
            .isLength({min:6 , max: 20}).withMessage('invalid_length_password '),

        body('confirmPassword')
            .notEmpty().withMessage((val:string ,{req})=>req._ ('validation_field'))
            .isLength({min:6 , max: 20}).withMessage ((val:any ,{req}) =>req._('invalid_length_password '))
            .custom((val:string ,{req}):boolean => {
                if (val !==req.body.password) throw new Error(`${req._('validation_password_match')}`);
                return true;
            }),


        validatorMiddleware]


}
const usersValidation = new UsersValidation();
export default usersValidation;