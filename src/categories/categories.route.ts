import  { Router } from 'express';
import categoriesService from './categories.service';
const  categoriesRouter:Router =Router();

categoriesRouter.route ('./')
.get(categoriesService.getAll)
.post(categoriesService.creatOne);


export default categoriesRouter;