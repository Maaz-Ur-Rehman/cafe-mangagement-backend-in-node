const connection=require("../connection")
const productController={

    AddProduct:(req,res)=>{

        const{name,categoryId,description,price}=req.body
        sql="insert into product (name,categoryId,description,price,status) values (?,?,?,?,'false')"
        connection.query(sql,[name,categoryId,description,price],(err,data)=>{
            if(!err){
                res.status(200).json({
                    msg:"Product Add Successfull",
                    data
                })
            }
            else{
                res.status(500).json({
                    msg:err.message,
                    messege:"error"
                })
            }
        })

    },
    GetProduct:(req,res)=>{
        sql="select p.id,p.name,p.description,p.price,p.status,c.id as categoryId,c.name as categoryName from product as p inner join category as c where p.categoryId=c.id"
        connection.query(sql,(err,data)=>{
            if(!err){
                res.status(200).json({
                    msg:"Product Get Successfull",
                    data
                })
            }
            else{
                res.status(500).json({
                    msg:err.message
                })
            }
        })
    },
    GetByCategory:(req,res)=>{
      const  {id}=req.params
        sql="select id,name from product where categoryId=? and status='true'"
        connection.query(sql,[id],(err,data)=>{
            if(!err){
                res.status(200).json({
                    msg:"Get Product successful by category id",
                    data
                })
            }
            else{
                res.status(500).json({

                    msg:err.message
                })
            }
        })
    },
    GetSingleProduct:(req,res)=>{
        const {id}=req.params
        sql="select p.id ,p.name,p.categoryId,p.description,p.price from product as p where p.id=?"
        connection.query(sql,[id],(err,data)=>{
            if(!err){
                res.status(200).json({
                    msg:"Get Single Product Successfull",
                    data
                })
            }
            else{
                res.status(500).json({
                    msg:err.message
                    
                })
            }
        })
    },
    UpdateSingleProduct:(req,res)=>{
        const {id}=req.params
        const {name,categoryId,description,price}=req.body
        sql="update product set name=?,categoryId=?,description=?,price=? where id=?"
        connection.query(sql,[name,categoryId,description,price,id],(err,data)=>{
            if(!err){
                res.status(200).json({
                    msg:'update product successfull',
                    data
                })
            }
            else{
                res.status(500).json({
                    msg:err.message
                })
            }
        })
    },
    UpdateStatusProduct:(req,res)=>{
        const {id}=req.params
        const {status}=req.body
        sql="update product set status=? where id=?"
        connection.query(sql,[status,id],(err,data)=>{
            if(!err){
                if(data.affectedRows==0){
                    res.status(402).json({
                        msg:"Product id does not exist"
                    })
                }
                else{
                    res.status(200).json({
                        msg:"Product Status Updated Successful",
                        data
                    })
                }
            }
            else{
                res.status(500).json({
                    msg:err.message
                })
            }
        })
    },
    DeleteSingleProduct:(req,res)=>{
        const {id}=req.params
        sql="delete from product where id=?"
        connection.query(sql,[id],(err,data)=>{
            if(!err){
                if(data.affectedRows==0){
                    res.status(402).json({
                        msg:'product id does not exist',
                        
                    })
                }
                else{
                res.status(200).json({
                    msg:'update product successfull',
                    data
                })
            }
            }
            else{
                res.status(500).json({
                    msg:err.message
                })
            }
        })
    },   
}

module.exports=productController