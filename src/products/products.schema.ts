import mongoose from "mongoose";
import {Products} from "./products.interface";

const productsSchema =new mongoose.Schema<Products>({

    name: {type:String , required:true,trim:true},
    category:{type: mongoose.Schema.Types.ObjectId,ref:"categories"},
    description:{type:String,required:true,trim:true},
    subcategory :{type:mongoose.Schema.Types.ObjectId ,ref:'subcategory'},
    price:{type:Number,required:true},
    discount:{type:Number},
    priceAfterDiscount:{type:Number},
    quantity:{type:Number,default:0},
    sold:{type:Number,default:0},
    rateAvg:{type:Number,default:0},
    rating:{type:Number,default:0},
   cover:{type:String},
    images:[String]
},{timestamps:true});
//hook
const imagesUrl = (document: Products) => {
    if (document.cover) document.cover = `${process.env.BASE_URL}/images/products/${document.cover}`;
    if (document.images) document.images = document.images.map(image => `${process.env.BASE_URL}/images/products/${image}`);
};
productsSchema
    .post('init', imagesUrl)
    .post('save', imagesUrl);

//
productsSchema.pre<Products>(/^find/,function(next){
    this.populate({path: 'category' ,select: 'name'});
    next();
})

export default mongoose.model <Products>('products',productsSchema)
