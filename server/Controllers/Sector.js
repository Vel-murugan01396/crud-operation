const {SectorModel}=require("../Modals/Sector");

const PostSector=async(req,res)=>{
    try {
        const{title,description,downloadURL}=req.body;

        const newSector=new SectorModel({
            title,description,downloadURL
        });


        const SavedSector=await newSector.save();
        res.status(200).json(SavedSector);


    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}


const GetSector=async(req,res)=>{
    const getSector=await SectorModel.find()

    if (!getSector) return res.status(500).send("the sector is not there");
  res.send(getSector);

}
const DeleteSector=async(req,res)=>{

    const userId=req.params.id;
    const deleteSector=await SectorModel.findById(userId);

    if (!deleteSector){
        return res.status(200).json({ message: "sector is not found" });
}
    await deleteSector.deleteOne();
    res.status(200).json({message:"sector is deleted"});
};

const UpdateSector=async(req,res)=>{

    try {
        
   
    const userId=req.params.id;
    const updatedSector=await SectorModel.findById(userId);

    if (!updatedSector) {
        return res.status(404).json({ message: "sector is not found" });
      }
      updatedSector.title = req.body.title || updatedSector.title;
      updatedSector.description =
        req.body.description || updatedSector.description;
        updatedSector.downloadURL =
        req.body.downloadURL || updatedSector.downloadURL;

        const updateSector = await updatedSector.save();
    res.status(200).json({ updateSector });

 } catch (error) {
    res.status(500).json({ message: "internal server error" });
    }
}

module.exports={GetSector,PostSector ,DeleteSector,UpdateSector};