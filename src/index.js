//require('dotenv').config({path:'./env'})
import "dotenv/config";
import dns from 'dns';
import connectDB from './db/index.js';

dns.setServers(["1.1.1.1","8.8.8.8"]);

connectDB()
.then(()=>{
        console.log(`server is running at port:${process.env.PORT}`);
        
    })

.catch((err)=>{
  console.log("MONGO db connection failed !!!",err);
  
})



















/*
import express from 'express';
const app = express()

(  async() => {
    try {
     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
     app.on("error",(error)=>{
        console.log("ERROR",error);
        throw error
        
     })

     app.listen(process.env.PORT,()=>{
        console.log(`app is listening on port ${process.env.PORT}`);
        
     })

    } catch (error) {
        console.log('ERROR',error)
        throw err
        
    }

})()
    */