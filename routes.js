// import express
const express=require("express")

// import userController
const userController=require("./controllers/usercontroller")

const bookController=require("./controllers/bookController")

//import middleware
const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')

// instance
const route=new express.Router()


route.post("/register",userController.registerController)

route.post("/login",userController.loginController)

//google login
route.post("/google-login",userController.googleLoginController)



//path to get books
route.get("/home-books",bookController.getHomeBooksController)


//..............................user...................
//add-book 
route.post("/add-book",jwtMiddleware,multerConfig.array("uploadedImg",3),bookController.addBookController)

//path to get all the books
route.get("/all-books",jwtMiddleware,bookController.getAllBooksController)

module.exports=route
