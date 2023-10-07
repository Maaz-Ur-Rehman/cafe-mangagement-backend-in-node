
const checkRole=(req,res,next)=>{
    // console.log(res.local,"local")
    if(res.local.role=="user"){
        res.status(401).json({
            msg:"unAuthorized access"
        })
    }
    else{
        next()
    }
}

module.exports=checkRole