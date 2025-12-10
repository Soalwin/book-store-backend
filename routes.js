// import express
const express=require("express")

// import userController
const userController=require("./controllers/usercontroller")

const bookController=require("./controllers/bookController")

//import middleware
const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerConfig = require('./middleware/multerMiddleware')
const jwtAdminMiddleware = require('./middleware/jwtAdminMiddleware')


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

//path to view a  books
route.get("/view-books/:id",bookController.getABookController)


//.................admin.............
//path to get all books to admin
route.get("/admin-all-books",jwtAdminMiddleware,bookController.getAllBooksAdminController)


//path to approve books
route.put("/approve-books",jwtAdminMiddleware,bookController.approveBookController)

//path to get all users
route.get("/all-users",jwtAdminMiddleware,userController.getAlluserController)


//path to update admin profile
route.put("/admin-profile-update",jwtAdminMiddleware,multerConfig.single('profile'),userController.editAdminProfileController)







module.exports=route
