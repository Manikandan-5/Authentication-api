const express=require("express");
const app=express();
const userRouter=require('./userRouter')
const bodyParser = require("body-parser");
const morgan=require("morgan");
require('dotenv').config();
const PORT=process.env.PORT 
const cors=require('cors');
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

app.use('/api',userRouter);

const mongoose=require("mongoose")

app.use("/",(req,res,next)=>{
    res.send("Hi");
    next();
})

try{app.listen(PORT,()=>{
    console.log("LocalHost Connected Successfully!!");
})}
catch(error){
    console.log(error.message);
}


mongoose.connect(process.env.MONGO_DB).then(()=>{
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.log(err.stack);
})