import {NextFunction, Request, Response ,RequestHandler} from "express";
import {Users} from "./users.interface";
import usersSchema from "./users.schema";
import asyncHandler from "express-async-handler"
import refactorService from "../refactor.service";
import ApiErrors from "../utils/apiErrors";
import {uploadSingleFile} from '../middelware/uploadsFiles.middleware';
import sharp from "sharp";

class UsersService {
    getAll:RequestHandler=refactorService.getAll<Users>(usersSchema)
    createOne: RequestHandler=refactorService.createOne<Users>(usersSchema)
    getOne:RequestHandler=refactorService.getOne<Users>(usersSchema,'users')
    updateOne:RequestHandler=asyncHandler (async (req:Request, res:Response ,next:NextFunction) => {
        const user: Users | null = await usersSchema.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            image: req.body.image,
            active: req.body.active
        }, {new: true});
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({data:user});
    });

    deleteOne:RequestHandler=refactorService.deleteOne<Users>(usersSchema,'users')
    changePassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: Users | null = await usersSchema.findByIdAndUpdate(req.params.id, {
            password:req.body.password,
            passwordChangedAt: Date.now(),
        }, {new: true});
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({data:user});
    });
    uploadImage = uploadSingleFile(['image'], 'image');
    saveImage = async (req: Request, res: Response, next: NextFunction) => {
        if (req.file) {
            const fileName: string = `user-${Date.now()}-image.webp`;
            await sharp(req.file.buffer)
                .resize(1200, 1200)
                .webp({quality: 95})
                .toFile(`uploads/images/users/${fileName}`);
            req.body.image = fileName;
        }
        next();
    }
}
const usersService =new UsersService();
export default usersService ;