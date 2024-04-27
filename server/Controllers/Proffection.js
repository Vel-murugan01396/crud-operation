const {ProffectionModel}= require("../Modals/Proffection");


const PostProffection=async(req,res)=>{
    try {
        
   
    const{sector,title,description,downloadImage,eligibilitycriteria}=req.body;
    const newProffection=new ProffectionModel({
        sector,
        title,
        description,
        downloadImage,
        eligibilitycriteria
    })

    const savedProffection= await newProffection.save();
    res.status(201).json(savedProffection)
} catch (error) {
        console.log(error);
        res.status(500).json({message:"internal Server error"});
}
};


const GetProffection=async(req,res)=>{
    const Proffection=await ProffectionModel.find();
    res.status(201).json(Proffection)
    if(!Proffection){
          return   res.status(500).json({message:"proffection not getting"})
    }

}

const DeleteProffection=async (req,res)=>{
    const userId=req.params.id;
    const Proffection=await ProffectionModel.findById(userId);

    await Proffection.deleteOne();
    res.status(200).json({message:"proffection deleted"});

    if(!Proffection){
        return res.status(500).send({message:"proffection is not deleted"})
    }
   


}

const UpdateProffection=async(req,res)=>{

    try {
        
    
    const userId=req.params.id;
    const Proffection=await ProffectionModel.findById(userId);

    Proffection.sector=req.body.sector||Proffection.sector;
    Proffection.title=req.body.title||Proffection.title;
    Proffection.description=req.body.description||Proffection.description;
    Proffection.downloadImage=req.body.downloadImage||Proffection.downloadImage;
    Proffection.eligibilitycriteria=req.body.eligibilitycriteria||Proffection.eligibilitycriteria;

    const updateProffection=await Proffection.save();
    res.status(201).json({updateProffection})
    if(!Proffection){
        return res.status(500).json({message:"proffection is not deleted"})
    }
} catch (error) {
    res.status(500).json({ message: "internal server error" });

}

};

module.exports={UpdateProffection,GetProffection,PostProffection,DeleteProffection};