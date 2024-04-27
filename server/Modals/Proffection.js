const mongoose=require("mongoose");

const ProffectionSchema=new mongoose.Schema({
    sector:{
        type:String,
    },
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    downloadImage:{
         type:String,
    },
    eligibilitycriteria:{
            type:String
    },
});

const ProffectionModel=mongoose.model("proffection",ProffectionSchema);
module.exports={ProffectionModel};