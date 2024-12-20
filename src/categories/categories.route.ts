import {Router} from "express";

import categoriesService from './categories.service';
import subcategoriesRoute from "../subcategories/subcategories.route";
import {body} from "express-validator";
import validatorMiddleware from "../middelware/validator.middleware";
import categoriesSchema from "./categories.schema";
import categoriesValidation from "./categories.validation";
const  categoriesRouter:Router =Router();

<<<<<<< HEAD
// /api/v1/categories
// /api/v1/subcategories
// /api/v1/category/:categoryId/subcategories
categoriesRouter.use('/:categoryId/subcategories',subcategoriesRoute)
categoriesRouter.route ('/')
.get(categoriesService.getAll)
.post(categoriesValidation.createOne);
//
categoriesRouter.route('/:id')
    .get(categoriesValidation.getOne ,categoriesService.getOne)
    .put(categoriesValidation.updateOne,categoriesService.updateOne)
    .delete(categoriesValidation.deleteOne,categoriesService.deleteOne);
=======
categoriesRouter.route ('/')
.get(categoriesService.getAll)
.post(categoriesService.createOne);
//
categoriesRouter.route('/:id')
    .get(categoriesService.getOne)
    .put(categoriesService.updateOne)
    .delete(categoriesService.deleteOne);
>>>>>>> 6b9d75262522fc7fce666bdd5bcef5b8af7f321c

export default categoriesRouter;