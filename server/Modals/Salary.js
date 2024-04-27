const mongoose=require("mongoose");
const SalarySchema=new mongoose.Schema({
    experienceLevel:{
        type:String,

    },
    annualSalary:{
        type:Number,
    },
    monthlySalaryRange:{
        type:String,
    },
    yearlySalaryRange:{
        type:String,
    }
});
const SalaryModel=mongoose.model("salary",SalarySchema);

module.exports={SalaryModel};