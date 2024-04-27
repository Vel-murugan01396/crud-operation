const CollegeModel = require('../Modals/Collage');
const mongoose = require('mongoose');

const PostCollege = async (req, res) => {
  try {
    const { TypesofCollege, Collegename, Collegeaddress, CoursesOffered, TypeofEducation, Scholarships } = req.body;
    const newCollege = new CollegeModel({
      TypesofCollege,
      Collegename,
      Collegeaddress,
      CoursesOffered,
      TypeofEducation,
      Scholarships
    });
    const savedCollege = await newCollege.save(); 
    res.status(201).json(savedCollege); 
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



const GetCollege=async(req,res)=>{
  try {
      
 
  const GetCollege=await CollegeModel.find();
  res.status(200).json(GetCollege);
} catch (error) {
  console.log(error)
  res.status(500).json({error:"internal server error"});
      
}
};

const PutCollege = async (req, res) => {
    try {
        const collegeId = req.params.id;
  
        if (!mongoose.Types.ObjectId.isValid(collegeId)) {
            return res.status(400).json({ error: 'Invalid college ID' });
        }
  
        const updatedCollegeData = {
            TypesofCollege: req.body.TypesofCollege,
            Collegename: req.body.Collegename,
            Collegeaddress: req.body.Collegeaddress,
            CoursesOffered: req.body.CoursesOffered,
            TypeofEducation: req.body.TypeofEducation,
            Scholarships: req.body.Scholarships
        };
  
        const updatedCollege = await CollegeModel.findByIdAndUpdate(collegeId, updatedCollegeData, { new: true });
        if (!updatedCollege) {
            return res.status(404).json({ error: 'College not found' });
        }
  
        res.status(200).json(updatedCollege);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
  };
  
  
  const Deletecollege = async (req, res) => {
      try {
        const deletedcollege = await CollegeModel.findByIdAndDelete(req.params.id);
        if (!deletedcollege) {
          return res.status(404).json({ error: 'college not found' });
        }
        res.json({ message: 'college deleted successfully' });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

   module.exports={PostCollege,GetCollege,PutCollege,Deletecollege}