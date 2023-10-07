const mysql=require('mysql2')

let conn=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"1234567",
    database:"cafenodejs"
})

conn.connect((err)=>{
    if(err){
        console.log(`Error in DB connection${JSON.stringify(err,undefined,2)}`)
    }
    else{
        console.log("DB Connection Successfull")
    }
})
module.exports = conn;