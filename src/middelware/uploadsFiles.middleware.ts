import multer from "multer";
import ApiErrors from "../utils/apiErrors";
import{Request} from "express";
//const storage =multer.diskStorage({
//  destination: (req,file,cb ) =>{
//cb(null, 'uploads/images/products');
//},
//filename:(req,file,cb) =>{

//const ext =file.mimetype.split('/')[1];
//const filename =`product_${Date.now()}-cover.${ext}`
//cb(null ,file.originalname);
//}
//});
//const storage = multer.memoryStorage();
interface Fields {
    name: string;
    maxCount: number;
}


const uploadOptions =(fileTypes :string[]):multer.Multer =>{

    const multerStorage : multer.StorageEngine =multer.memoryStorage();
    const multerFilter =function (req:Request ,file:Express.Multer.File ,cb:multer.FileFilterCallback )
        :void{
      //  .File ,cb:multer.FileFilterCallback):void{ ;
    const isValidType :boolean =fileTypes.some((type:string):boolean => file.mimetype.startsWith(type));
    if(isValidType){
        cb(null,true);
    } else {
        cb(new ApiErrors('Unsupported file type',400));
    }
};
return multer({storage:multerStorage ,fileFilter:multerFilter});

};

export const uploadSingleFile= (filterTypes:string[] ,fieldName:string) => uploadOptions(filterTypes).single(fieldName);
export const uploadMultiFiles =(fileTypes:string[] ,fields:Fields[]) => uploadOptions(fileTypes).fields(fields);