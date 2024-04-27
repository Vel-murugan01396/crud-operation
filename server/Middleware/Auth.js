const Jwt =require("jsonwebtoken");



const WebToken =async(req,res,next)=>{
    try {
        let token =req.header("authorization");
        if(!token){
            return res.status(403).send({message:"No token there"})
        }
        const verified=Jwt.verify(token,process.env.Jwt_SECRET);
        req.user=verified;
        next();
    } catch (error) {
        res.status(500).json({error:error.message});
    }

}

module.exports={WebToken};