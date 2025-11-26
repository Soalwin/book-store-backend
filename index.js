//import dotenv file
require("dotenv").config()

// import express 
const express=require("express")

// import cors
const cors=require("cors")

//import db file
require('./dbConnection')

// import route
const route=require("./routes")



// create server 
const bookStoreServer=express()


// server using cors
bookStoreServer.use(cors())
bookStoreServer.use(express.json())// parse json -- middleware
bookStoreServer.use(route)



// create port 
const PORT = process.env.PORT || 4000

bookStoreServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

bookStoreServer.get("/",(req,res)=>{
    res.status(200).send("<h1>Bookstore Server started......</h1>")
})

