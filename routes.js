// import express
const express=require("express")

// import userController
const userController=require("./controllers/usercontroller")

// instance
const route=new express.Router()


route.post("/register",userController.registerController)

route.post("/login",userController.loginController)

//google login
route.post("/google-login",userController.googleLoginController)

module.exports=route
