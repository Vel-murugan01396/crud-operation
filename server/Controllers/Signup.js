const {SignUp}=require("../Modals/Signup");
const Jwt=require("jsonwebtoken");


const signUp=async(req,res)=>{
    try {
        const {name,email,password,mobilenumber}=req.body;


        const existingUser = await SignUp.findOne({ email, mobilenumber });

        if (existingUser) {
            return res.status(400).json({ message: "User with the same details already exists" });
        }


   


        const newRegister=new SignUp({
            name,
            email,
            password,
            mobilenumber,
        });

        //token code
        const token = Jwt.sign({ newRegister }, 'your_secret_key', { expiresIn: '1h' });

        const savedRegister=await newRegister.save();
        res.status(201).json({savedRegister,token})
    } catch (error) {
        res.status(500).json({message:"Internal server error"})
        
    }
}

//get method
const getsignUp=async(req,res)=>{
             let signup=await SignUp.find();
             if(!signUp){
                return res.status(500).send("not a register user");
                
             }res.send(signup);

};

//delete method
const DeleteSignup=async(req,res)=>{
const userId=req.params.id;

const existingUser=await SignUp.findById(userId);
if(!existingUser){
    return res.status(404).json({message:"user dose not found"});
}
await existingUser.deleteOne();
   res.status(200).json({message:"user are deleted"});
  

}


const EditSignup=async(req,res)=>{

    try {
        
  
    const userId= req.params.id;
    const existingUser=await SignUp.findById(userId);
    if(!existingUser){
        return res.status(404).json({ message: 'User not found' });
    }

    const { name, email, password,mobilenumber } = req.body;

    existingUser.name = name || existingUser.name;
    existingUser.email = email || existingUser.email;
    existingUser.password = password || existingUser.password;
    existingUser.mobilenumber = mobilenumber || existingUser.mobilenumber;

    const updatedUser = await existingUser.save();

    res.status(200).json({ updatedUser });
} catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal Server Error' });
}
  } 




module.exports={signUp,getsignUp,DeleteSignup,EditSignup};