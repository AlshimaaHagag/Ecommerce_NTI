import {Router} from "express";

import categoriesService from './categories.service';
const  categoriesRouter:Router =Router();

categoriesRouter.route ('/')
.get(categoriesService.getAll)
.post(categoriesService.createOne);
//
categoriesRouter.route('/:id')
    .get(categoriesService.getOne)
    .put(categoriesService.updateOne)
    .delete(categoriesService.deleteOne);

export default categoriesRouter;