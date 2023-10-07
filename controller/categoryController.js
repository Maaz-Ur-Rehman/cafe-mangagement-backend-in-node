const connection=require('../connection')

const categoryController={
    AddCategory:(req,res)=>{
        const {name}=req.body

        sql="insert category (name) values(?)"
        connection.query(sql,[name],(err,data)=>{
            // console.log(data.length,"data")
            if(!err){
                
                    res.status(200).json({
                        msg:"Category Successfully uploaded"
                    })
            }
            else{
                res.status(500).json({
                    msg:err.message
                })
            }
        })
    },
    GetAllCategory:(req,res)=>{
        sql="select *from category order by name"
        connection.query(sql,(err,data)=>{
            if(!err){
                res.status(200).json({
                    msg:"Successfull Get All Category",
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
    UpdateCategory:(req,res)=>{
        const {changeName}=req.body
        const {id}=req.params
        sql="update category set name=? where id=?"
        connection.query(sql,[changeName,id],(err,data)=>{
            if(!err){
                res.status(200).json({
                    msg:"category update successfull"
                })
            }
            else{
                res.status(500).json({
                    msg:err.message
                })
            }
        })
    }




}


module.exports=categoryController