const mongoos=require("mongoose");
const LoginSchema=new mongoos.Schema(
    {
        name:{
            type:String,
            min: 5,
            max: 50,
            required:true,
        },
        password:{
            type:String,
            min: 5,
            max: 50,
            required:true,
        }
    }
);
const Login=mongoos.model("Login",LoginSchema);
module.exports={Login};