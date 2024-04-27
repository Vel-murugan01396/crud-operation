const mongoose=require("mongoose");
const DiplomaCourseSchema=new mongoose.Schema({

    // sector:{
    //     type:String
    // },
    // profession:{
    //     type:String
    // },
    // diplomacourse:{
    //     type:String
    // },
    // eligiblity:[{
    //     mineducation:{
    //         type:String
    //     },
    //     percentage:{
    //         type:Number
    //     },
    //     duration:{
    //         type:String
    //     }

    // }]
    DiplomaCourseName: {
        type: String,
      },
      
       Duration:{
            type:String
          },
})

const DiplomaCourseModel = mongoose.model("DiplomaCourse",DiplomaCourseSchema);
module.exports= DiplomaCourseModel;
