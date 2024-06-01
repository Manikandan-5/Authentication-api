const express=require("express");
const app=express();
const userRouter=require('./userRouter')
const bodyParser = require("body-parser");
const morgan=require("morgan")
const cors=require('cors');
app.use(express.json());
app.use(morgan('dev'));
app.use(cors())

app.use('/api',userRouter);

 
const mongoose=require("mongoose")

app.use("/",(req,res)=>{
    res.send("Hiii")
})


app.listen(5000,()=>{
    console.log("LocalHost Connected Successfully!!");
})

mongoose.connect('mongodb://localhost:27017/auth').then(()=>{
    console.log("MongoDB Connected");
}).catch((err)=>{
    console.log(err.stack);
})