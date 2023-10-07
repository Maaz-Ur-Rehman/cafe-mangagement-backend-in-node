const express= require("express")
const userController = require("../controller/userController")
const auth=require('../services/authentication')
const checkeRole=require('../services/checkRole')
const route=express.Router()

route.post("/signup",userController.signUp)
route.post("/login",userController.Login)
route.post("/forgot-pass",userController.ForgotPass)
route.get("/get-user",auth, checkeRole,userController.getUser)
route.get("/check-token",auth,userController.checkToken)
route.put("/update-user/:id",auth,checkeRole,userController.UpdateUserStatus)
route.put("/update-pass",auth,userController.ChangePassword)


module.exports=route