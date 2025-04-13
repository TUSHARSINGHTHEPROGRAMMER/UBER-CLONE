const dotenv= require('dotenv').config();


const connecttodb = require('./db/db')
connecttodb();

const cors= require('cors');


const userRoutes=require('./routes/user.routes');
const express= require('express');



const app=express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send('Hello World!')
});


app.use('/users',userRoutes);



module.exports=app;