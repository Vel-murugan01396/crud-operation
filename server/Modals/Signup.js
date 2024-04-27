const mongoos =require("mongoose");
const SignupSchema=new mongoos.Schema(
    {
        name:{
            type:String,
            
            
        },
        email:{
              type:String,
             
        },
        password:{
            type:String,
            
        },
        mobilenumber:{
            type:Number,
           
        }
    }
);
const SignUp=mongoos.model("SignUp",SignupSchema)
module.exports={SignUp};