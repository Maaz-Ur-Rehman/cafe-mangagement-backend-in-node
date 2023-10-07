const express=require('express')
const productController = require('../controller/productController')
const auth=require('../services/authentication')
const checkeRole=require('../services/checkRole')
const route=express.Router()


route.post("/add-product",auth,checkeRole,productController.AddProduct)
route.get("/get-product",productController.GetProduct)
route.get("/get-category-id/:id",productController.GetByCategory)
route.get("/get-single-product/:id",productController.GetSingleProduct)
route.put("/update-product/:id",auth,checkeRole,productController.UpdateSingleProduct)
route.put("/update-status/:id",auth,checkeRole,productController.UpdateStatusProduct)
route.delete("/delete-product/:id",auth,checkeRole,productController.DeleteSingleProduct)

module.exports=route    