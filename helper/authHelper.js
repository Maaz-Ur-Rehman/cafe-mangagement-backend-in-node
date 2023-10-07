const bcrypt=require('bcryptjs')
const authHelper={
    hashPassword:async(password)=>{

        try{

            const hashedPassword=await bcrypt.hash(password,10)
            return hashedPassword

        }
        catch(err){
            console.log(err,"err")
        }
    },
    comparePassword:async(password,hashedPassword)=>{
        return bcrypt.compare(password,hashedPassword)
    }


}

module.exports=authHelper