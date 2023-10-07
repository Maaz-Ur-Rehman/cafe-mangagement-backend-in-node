const express=require('express')
const auth=require('../services/authentication')
const checkeRole=require('../services/checkRole')
const billController = require('../controller/billController')
const route=express.Router()

route.post('/generate-report',billController.generateReport)


module.exports=route   