import express from 'express';
import dbConnction from "./src/config/database";
import categoriesService from './src/categories/categories.service';
import categoriesRouter from './src/categories/categories.route';

const app:express.Application=express();
app.use(express.json({limit :'10kb'}));
dbConnction();
// app.get('/',(reg:express.Request,res:express.Response) =>{
    // res.send('welcome')
// })

// app.get('/',  (req:express.Request, res:express.Response) =>{
    // const user ={
        // name:"Alshimaa",
    // }res.json(user);
  

app.use('/api/v1/categories',categoriesRouter) 

app.listen(3000, ()=>{
    console.log('server started on port 3000');
})
 
