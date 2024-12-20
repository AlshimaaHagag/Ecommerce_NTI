import express from 'express';
import dotenv from 'dotenv';
import dbConnction from "./src/config/database";
<<<<<<< HEAD
import mountRoutes from "./src";
import {Server} from "http";
import i18n from "i18n";
import path from 'path';
import hpp from 'hpp';

const app:express.Application=express();
app.use(express.json({limit :'10kb'}));
let server :Server;
dotenv.config();
app.use(express.static('uploads'));
app.use(hpp);
//
i18n.configure({
  locales:['en','ar'],
    directory: path.join(__dirname,'locales'),
defaultLocale: 'en',
    queryParameter: 'lang',
});
app.use(i18n.init)
//
dbConnction();
mountRoutes(app);
=======
import categoriesService from "./src/categories/categories.service"

import categoriesRouter from './src/categories/categories.route';

const app:express.Application=express();
app.use(express.json({limit :'10kb'}));
dotenv.config();
dbConnction();
>>>>>>> 6b9d75262522fc7fce666bdd5bcef5b8af7f321c

// app.get('/',(reg:express.Request,res:express.Response) =>{
    // res.send('welcome')
// })

// app.get('/',  (req:express.Request, res:express.Response) =>{
    // const user ={
        // name:"Alshimaa",
    // }res.json(user);

<<<<<<< HEAD
// app.use('/api/v1/categories', categoriesRouter)
// app.use('/api/v1/subcategories',subcategoriesRoute);
//process.env.port =>3000

server=app.listen(process.env.PORT, ()=>{
    console.log(`server started on port ${process.env.PORT} `);
});

process.on('unhandledRejection', (err:Error) => {
    console.error(` UnhandledRejection ${err.name} | ${err.message}`);

  server.close(() => {
    console.error('shutting down server');
    process.exit(1);
});
        });
=======
app.use('/api/v1/categories', categoriesRouter)
//process.env.port =>3000
app.listen(process.env.PORT, ()=>{
    console.log(`server started on port ${process.env.PORT} `);
})

>>>>>>> 6b9d75262522fc7fce666bdd5bcef5b8af7f321c
