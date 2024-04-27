const {SalaryModel}=require("../Modals/Salary");


const PostSalary= async(req,res) =>{
    try {
        const{
            experienceLevel,
            annualSalary,
            monthlySalaryRange,
            yearlySalaryRange
        }=req.body;

        const newSalary = new SalaryModel({
            experienceLevel,
            annualSalary,
            monthlySalaryRange,
            yearlySalaryRange
        });
        const SavedSalary =await newSalary.save();
        res.status(201).json({SavedSalary});
        console.log(SavedSalary)

        
    } catch (error) {
       
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const UpdateSalary = async (req, res) => {
    try {
      const { id } = req.params;
      const { experienceLevel, annualSalary, monthlySalaryRange, yearlySalaryRange } = req.body;
  
      const updatedSalary = await SalaryModel.findByIdAndUpdate(id, {
        experienceLevel,
        annualSalary,
        monthlySalaryRange,
        yearlySalaryRange
      }, { new: true });
  
      if (!updatedSalary) {
        return res.status(404).json({ error: 'Salary data not found' });
      }
  
      res.json({ updatedSalary });
    } catch (error) {
      console.error('Error updating salary:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  // Delete salary by ID
  const DeleteSalary = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSalary = await SalaryModel.findByIdAndDelete(id);
  
      if (!deletedSalary) {
        return res.status(404).json({ error: 'Salary data not found' });
      }
  
      res.json({ message: 'Salary data deleted successfully' });
    } catch (error) {
      console.error('Error deleting salary:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
const GetAllSalaries=async(req,res)=>{
    try {
        const Salary=await SalaryModel.find();
        res.status(200).json(Salary)
    } catch (error) {
        res.status(500).json({message:"internal server error"})
        
    }
}


module.exports={PostSalary,GetAllSalaries,DeleteSalary,UpdateSalary};