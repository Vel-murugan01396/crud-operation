const DiplomaCourseModel=require("../Modals/DiplmoaCourse");


const PostDiplomaCourse=async(req,res)=>{
    try {
        const { DiplomaCourseName, Duration } = req.body;
    
        const newDipolmaCourse = new DiplomaCourseModel({
          DiplomaCourseName,
          Duration,
        });
    
        const savedDipolmaCourse = await newDipolmaCourse.save();
        res.status(200).json(savedDipolmaCourse);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
      }



}

const GetDiplomaCourse=async(req,res)=>{
    try {
        const GetDipolma = await DiplomaCourseModel.find();
        res.status(200).json(GetDipolma);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
      }
}

const PutDiplomaCourse=async(req,res)=>{
    try {
        const DipolmaId = req.params.id;
        const DipolmaCourse = await DiplomaCourseModel.findByIdAndUpdate(
          DipolmaId
        );
    
        DipolmaCourse.DiplomaCourseName =
          req.body.DiplomaCourseName || DipolmaCourse.DiplomaCourseName;
        DipolmaCourse.Duration = req.body.Duration || DipolmaCourse.Duration;
    
        const UpdateDipolmaCourse = await DipolmaCourse.save();
        res.status(200).json(UpdateDipolmaCourse);
      } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
      }
}

const DeleteDiplomaCourse= async (req, res) => {
      
    const DipolmaId = req.params.id;

    const DipolmaCourse = await DiplomaCourseModel.findById(DipolmaId);
    console.log(DipolmaCourse);
    await DipolmaCourse.deleteOne();
  
    res.status(200).json({ message: "Dipolma course is deleted successfully" });
  
  
  };


  module.exports={PostDiplomaCourse,GetDiplomaCourse,PutDiplomaCourse,DeleteDiplomaCourse };