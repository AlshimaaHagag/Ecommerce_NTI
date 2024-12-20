import express from 'express';
import categoriesRouter from "./categories/categories.route";
import subcategoriesRoute from "./subcategories/subcategories.route";
import globalErrors from "./middelware/errors.middleware";
import ApiErrors from "./utils/apiErrors";
import productsRoute from "./products/products.route";
import usersRoute from "./user/users.route";

declare module 'express' {
    interface Request {
        filterData?: any;
        files?: any;
    }}
const mountRoutes =(app:express.Application) => {

    app.use('/api/v1/categories', categoriesRouter)
    app.use('/api/v1/subcategories', subcategoriesRoute);
    app.use('/api/v1/products',productsRoute);
    app.use('/api/vi/users',usersRoute);
    app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
       // const error = new Error('rout not found');
       // next(error);
        next(new ApiErrors(`route ${req.originalUrl} not found`,400))
    });
    // app.use((err:Error , req:express.Request ,res:express.Response ,next:express.NextFunction) => {
    //     res.status(400).json({error:err.message});
    // });
    app.use(globalErrors);
}

export default mountRoutes;
