import mongoose from "mongoose";
import { Categories } from "./categories.interface";

// schema
const CategoriesSchema= new mongoose.Schema<Categories>({
    name :{type: String,required:true,unique:true,trim:true },
    image:{type:String}
},{timestamps:true});
// 
// <Categories> =>model type

export default mongoose.model<Categories>("category",CategoriesSchema);
