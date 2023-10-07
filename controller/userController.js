const connection=require('../connection')
const JWT=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const userController={
    signUp:(req,res)=>{
        try{
            const{name,email,password,contactNumber,status,role}=req.body
            console.log(req.body)
            sql="select email ,password, role,status from user where email=?"
            connection.query(sql,[email],(err,data)=>{
                console.log(data,"data")
                if(!err){
                    if(data.length<=0){
                        sql="insert into user (name,email,password,contactNumber,status,role) values(?,?,?,?,'false','user')"
                        connection.query(sql,[name,email,password,contactNumber,status,role],(err,data)=>{
                            if(!err){
                                res.status(200).json({
                                    msg:"user Successfull signup",
                                    data
                                })
                            }
                            else{
                                res.status(500).json({
                                    msg:err,
                                })
                            }
                        })
                    }
                    else{

                        res.status(400).json({
                            msg:"This email already exist"
                        })
                    }
                }
            })

        }
        catch(err){
            res.status(500).json({
                msg:"Error in SignUp Api",
                
            })
        }
    },
    Login:(req,res)=>{
        try{
            const{name,email,password,contactNumber,status,role}=req.body
            console.log(req.body)
            // const comparePass=await authHelper.comparePassword()
            sql="select email,password,role,status from user where email=?"
            connection.query(sql,[email],(err,data)=>{
                if(!err){
                    if(data.length<=0 || data[0].password!=password){
                        res.status(401).json({
                            msg:"Incorrect Email or Password"
                        })
                    }
                    else if(data[0].status==="false"){
                        res.status(401).json({
                            msg:"Wait for Admin Approval"
                        })
                        
                    }
                    else if(data[0].password==password){
                        const response={email:data[0].email,role:data[0].role}
                        const token=JWT.sign(response,process.env.JWT_SECRET,{expiresIn:"9h"})
                        res.status(200).json({
                            msg:"user successful login",
                            data,
                            token
                        })

                    }
                    else{
                        res.status(400).json({
                            msg:"Something Went Wrong Plz try again"
                        })
                    }

                }
                else{

                }
            })

        }
        catch(err){
            res.status(500).json({
                msg:"Error in Login Api",
                
            })
        }
    },
    ForgotPass:(req,res)=>{
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure:false,
            auth: {
                user: 'chaz47@ethereal.email',
                pass: 'jAKXdkbg1zFEEwFP2K'
            }
        });    
          const {email}=req.body 
          const sql="select email,password from user where email=?"
          connection.query(sql,[email],(err,data)=>{
                if(!err){
                    if(data.length<=0){
                        res.status(200).json({
                            msg:"Password sent successful to your email hahha"
                        })
                    }
                    else{
                        let mailOption={
                            from:"chaz47@ethereal.email",
                            to:data[0].email,
                            subject:"Password by Cafe Management System",
                            html:"<p><b>Your Login details for Cafe Managemente System</b><br/><b>Email:</b>"+data[0].email+"<br/><b>Password:</b>"+data[0].password+"<p/>"
                        }
                        transporter.sendMail(mailOption,(err,info)=>{
                            if(err){
                                console.log(err)
                            }
                            else{
                                console.log(`email send ${info.response}`)
                            }
                        })
                        res.status(200).json({
                            msg:"password sent successfully to your email"
                        })
                    }

                }
          }) 
    },
    getUser:(req,res)=>{
        try{
            sql="select id, name,email,contactNumber,status from user where role='user'";
            connection.query(sql,(err,data)=>{
                if(!err){
                    if(data.length>0){
                        res.status(200).json({
                             msg:"user get Successfull",
                             data
                        })
                    }
                    else{
                        res.status(400).json({
                            msg:"no user here"
                        })
                    }

                }
                else{
                    res.status.json({
                        msg:"something error",
                    msg:err.message
                    })
                }
            })

        }
        catch(err){
            res.status(500).json({
                msg:"Error in get user api",
                err
            })
        }
    },
    UpdateUserStatus:(req,res)=>{
        const {status}=req.body
        const {id}=req.params
        console.log(id,status)
        try{
            sql="update user set status=? where id=?"
            connection.query(sql,[status,id],(err,data)=>{
                if(!err){
                    console.log(data,"data")
                    if(data.affectedRows==0){
                        res.status(404).json({
                            msg:"user id does not exist"
                        })
                    }
                    else{
                        res.status(200).json({
                            msg:"user successfull updated"
                        })
                    }
                }
                else{
                    res.status(500).json({
                        msg:err.message
                    })
                }
            })

        }
        catch(err){
            console.log(err)
        }
    },
    checkToken:(req,res)=>{
        try{
            res.status(200).json({
                 msg:"true"
            })
        }
        catch(err){
            console.log(err)
        }
    },

    ChangePassword: async (req, res) => {
        const { newPass, oldPass } = req.body;
        const email = res.local.email;
      
        console.log("Received email:", email);
        console.log("Received old password:", oldPass);
      
        sql = "SELECT * FROM user WHERE email=? AND password=?";
        connection.query(sql, [email, oldPass], (err, data) => {
          if (!err) {
            if (data.length <= 0) {
              res.status(401).json({
                msg: "incorrect email or password"
              });
            } else {
              sql = "UPDATE user SET password=? WHERE email=?";
              console.log(email, newPass);
              connection.query(sql, [newPass, email], (err, data) => {
                if (err) {
                  console.error("Error updating password:", err);
                  res.status(500).json({
                    msg: "Failed to update password."
                  });
                } else {
                  res.status(200).json({
                    msg: "Update password successfully.",
                    data: data
                  });
                }
              });
            }
          } else {
            res.status(500).json({
              msg: err.message
            });
          }
        });
      e}

}
module.exports=userController