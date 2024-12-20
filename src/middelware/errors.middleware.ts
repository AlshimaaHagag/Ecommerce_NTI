import express from 'express';
import ApiErrors from "../utils/apiErrors";

const devErrors = (err:any ,res:express.Response)=> {
    res.status(err.statusCode).json({
        error: err,
        status: err.status,
        message: err.message,
        stack: err.stack
    });
};
    const prodErrors = (err: any, res: express.Response) => {

        res.status(err.statusCode!).json({
            message: err.message,
            status: err.status,
        });
    };
        const globalErrors = (err: any, req: express.Request, res: express.Response) => {
            err.statusCode = err.statusCode || 500;
            err.status = err.status || 'Error';
            if (process.env.NODE_ENV === 'development') devErrors(err, res)
            else prodErrors(err, res);
        };

        export default globalErrors;