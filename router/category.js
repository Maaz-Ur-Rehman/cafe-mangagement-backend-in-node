const express=require('express')
const categoryController = require('../controller/categoryController')
const auth=require('../services/authentication')
const checkeRole=require('../services/checkRole')
const route=express.Router()

route.post('/add-category',auth,checkeRole,categoryController.AddCategory)
route.get("/get-all-category",auth,categoryController.GetAllCategory)
route.put("/update-category/:id",auth,checkeRole,categoryController.UpdateCategory)


module.exports=route    