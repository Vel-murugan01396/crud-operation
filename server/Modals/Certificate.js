const mongoose =require("mongoose");

const  CertificateSchema=new mongoose.Schema({

    certificateName:{
        type:String,
    },
    certificateSelected:{
        type:String,
        enum:["Online","Offline"]
    },
    certificateDuration:{
        type:String,
    },
    certificateAdd:{
        type:String,
    }

})

const CertificateModel=mongoose.model("certificate",CertificateSchema);
module.exports= CertificateModel;