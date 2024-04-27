
const { SignUp}=require("../Modals/Signup")
const Jwt=require("jsonwebtoken");



const login=async(req,res)=>{
    try {
        const { name, password } = req.body;
    
        const newUser = await SignUp.findOne({name:name,password:password});



        if(!newUser){
          return res.status(400).json({message:"User dose not exist"})
        }

        if(newUser.password !==password){
          return res.status(400).json({message:"invalide password"})
        }
        const token =Jwt.sign({id:newUser._id}, process.env.Jwt_SECRET,{expiresIn:"1h"});
        newUser.token=token;
       
      
      
          
      
          const savedUser = await newUser.save();
         
         
      
          res.status(201).json({  savedUser,token });
      } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}

const getLogin = async (req, res) => {
    let login = await SignUp.find();
    if (!login) return res.status(500).send("the sector is not there");
    res.send(login);
  };


module.exports={login,getLogin};