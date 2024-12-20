import mongoose from "mongoose";
import { Users } from "./users.interface";
import bcrypt from  "bcryptjs";
// schema
const usersSchema= new mongoose.Schema<Users>({
    username :{type:String ,required:true ,unique:true},
    email:{type:String ,required:true ,unique:true},
    name :{type: String,required:true },
    active:{type:Boolean ,default:true},
    password:{type:String},
    role:{type:String,required:true ,enum:['admin','employee','user']},
    image:{type:String ,default:'user_default.png'},
    passwordChangedAt:Date ,
    passwordRestCode:String,
    passwordRestCodeExpire:Date ,
    passwordRestCodeVerify:String,

},{timestamps:true});
// 
// <Categories> =>model type
const imagesUrl =(document: Users) =>{
    if (document.image && document.image.startsWith('user')) document.image=`${process.env.BAS_url} /images/users/${document.image}`;

};
usersSchema
    .post('init' ,imagesUrl)
    .post('save',imagesUrl);


usersSchema.pre<Users>('save',async function(next) {
if (!this.isModified('password'))return next();
 this.password = await bcrypt.hash(this.password, 13);

        next();
    })


export default mongoose.model<Users>("users",usersSchema);
