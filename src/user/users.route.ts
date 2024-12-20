import {Router} from "express";
import usersService from './users.service';
import {body} from "express-validator";
import usersSchema from "./users.schema";
import usersValidation from "./users.validation";

const  usersRouter:Router =Router();

// /api/v1/categories
// /api/v1/subcategories
// /api/v1/category/:categoryId/subcategories

usersRouter.route ('/')
.get(usersService.getAll)
.post( usersService.uploadImage,usersService.saveImage ,usersValidation.createOne ,usersService.createOne);
//
usersRouter.route('/:id')
    .get(usersValidation.getOne ,usersService.getOne)
    .put(usersService.uploadImage,usersService.saveImage ,usersValidation.updateOne,usersService.updateOne)
    .delete(usersValidation.deleteOne,usersService.deleteOne);

usersRouter.put('/:id/change-password',usersValidation.changePassword,usersService.changePassword ,usersService.changePassword)

export default usersRouter;