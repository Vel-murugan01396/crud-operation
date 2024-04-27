const{EntranceExam}=require("../Modals/EntranceExam");

const PostEntranceExam= async(req,res) =>{
    try {
        
   

    const {sector,profession,entranceexam}=req.body;

    const newEntranceExam=new EntranceExam({
        sector,
        profession,
        entranceexam
    });
    const SavedExam =await newEntranceExam.save();
    res.status(201).json(SavedExam);
} catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Internal Server Error' });
}

    
}


const GetEntranceExamExam= async(req,res)=>{
    try {
        
   
    const GetExam= await EntranceExam.find();
    res.status(201).json(GetExam)
} catch (error) {
    console.error("error",error);
    res.status(500).json({ error: 'Internal Server Error' });
        
}
    
}

const PutEntranceExam= async(req,res) =>{

    try {
        const ExamId=req.params.id;
        const Entrance=await EntranceExam.findByIdAndUpdate(ExamId)

        Entrance.sector=req.body.sector||Entrance.sector
        Entrance.profession=req.body.profession||Entrance.profession
        Entrance.entranceexam=req.body.entranceexam||Entrance.entranceExam

        const UpdateEntranceExam=await Entrance.save();
        res.status(201).json({UpdateEntranceExam});     
    } catch (error) {
        console.error('Error updating exam:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const DeleteEntranceExam= async (req, res) => {
      
    const ExamId = req.params.id; 
  
  
    const Entrance = await EntranceExam.findById(ExamId);
   console.log(Entrance);
    await Entrance.deleteOne();
  
    res.status(200).json({ message: 'Exam is deleted successfully' });
  
  
  };
  

  module.exports={PostEntranceExam,GetEntranceExamExam,PutEntranceExam,DeleteEntranceExam}