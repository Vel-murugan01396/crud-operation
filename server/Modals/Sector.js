const mongoose=require("mongoose")

const SectorSchema=new mongoose.Schema({

title:{
    type:String,
},
description:{
    type:String,
},
downloadURL:{
    type:String,
}

});

const SectorModel=mongoose.model("sector",SectorSchema);
module.exports={SectorModel};