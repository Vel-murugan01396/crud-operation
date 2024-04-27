const CertificateModel=require("../Modals/Certificate");


const PostCertificate =async(req,res)=>{

    try {
        
    
    const{
        certificateName,
        certificateSelected,
        certificateDuration,
        certificateAdd}=req.body;


        const CertificateCourse=new CertificateModel({
        certificateName,
        certificateSelected,
        certificateDuration,
        certificateAdd
        });

        const SavedCertificateCourse= await CertificateCourse.save()
        res.status(201).json(SavedCertificateCourse);

    } catch (error) {
        console.log(error)
    res.status(500).json({error:"internal server error"});
    }

}

const GetCertificate=async(req,res)=>{
    try {
    const GetCertificate=await CertificateModel.find();
    res.status(201).json(GetCertificate)
} catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"});
}

}

const PutCertificate=async(req,res)=>{
    try {
        const CertificateId=req.params.id;

        const Certificate=await CertificateModel.findByIdAndUpdate(CertificateId)

        Certificate.certificateName=req.body.certificateName||Certificate.certificateName
        Certificate.certificateSelected=req.body.certificateSelected||Certificate.certificateSelected
        Certificate.certificateDuration=req.body.certificateDuration||Certificate.certificateDuration
        Certificate.certificateAdd=req.body.certificateAdd||Certificate.certificateAdd

        const UpdateCertificate=await Certificate.save();
        res.status(201).json(UpdateCertificate)



    } catch (error) {
        console.log(error)
    res.status(500).json({error:"internal server error"});
    }

}

const DeleteCertificate=async(req,res)=>{
    try {
    const CertificateId=req.params.id;

     const DeleteCertificate=await CertificateModel.findByIdAndDelete(CertificateId)
     const DeleteOneCertificate=await DeleteCertificate.deleteOne();

     res.status(201).json(DeleteOneCertificate)
} catch (error) {
    console.log(error)
    res.status(500).json({error:"internal server error"});
        
}
}

module.exports={PostCertificate,PutCertificate,GetCertificate,DeleteCertificate};