import mongoose from "mongoose";

const dbConnction =() =>{
    mongoose.connect("mongodb://localhost:27017/Ecommerce_NTI")
.then(() => {
    
    console.log("connected to DB")
})
 .catch((err) =>{

    console.log(err)
})
};
export default dbConnction;

// WgUogWeCsndL72Ln
// mongodb+srv://ashimaahagag:<db_password>@cluster0.wpuh7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
// "mongodb+srv://ashimaahagag:WgUogWeCsndL72Ln@cluster0.wpuh7.mongodb.net/Ecommerce_NTI?retryWrites=true&w=majority&appName=Cluster0")