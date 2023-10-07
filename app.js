const express=require('express');
const conn=require('./connection')
// const bodyParser=require('body-parser')
const cors=require('cors')
const userRoute=require('./router/user')
const categoryRoute=require('./router/category')
const productRoute=require('./router/product')
const billRoute=require('./router/bill')
const app = express();
const dotenv=require('dotenv')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

dotenv.config()
app.use('/user',userRoute)
app.use('/category',categoryRoute)
app.use('/product',productRoute)
app.use('/bill',billRoute)
console.log(process.env.port)

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Server is Running On Port ${port}`)

});


