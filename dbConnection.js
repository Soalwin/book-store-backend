//import mongoose

const mongoose = require("mongoose")

const connectionString = process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log("mongoDb connected successfully");
    
}).catch((err)=>{
    console.log("mongoDB connection failed");
    console.log(err);   
})