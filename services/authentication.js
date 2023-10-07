const JWT=require('jsonwebtoken')

const authenticateToken=(req,res,next)=>{
    try{
    const decode=JWT.verify(req.headers.authorization,process.env.JWT_SECRET)

    res.local=decode
    // console.log(res.local,"res")
    next()
}
catch(err){
    res.status(409).json({
        msg: "invalid Token",
        err,
      });
}
}

module.exports=authenticateToken