const mongoose=require("mongoose");

const EntranceExamSchema=new mongoose.Schema({
    sector:{
        type:String,
    },
    profession:{
        type:String,
    },
    entranceexam:{
        type: [String], // Array of strings for tags
        default: [],
    }

});
const EntranceExam=mongoose.model("EntranceExam",EntranceExamSchema);
module.exports={EntranceExam};