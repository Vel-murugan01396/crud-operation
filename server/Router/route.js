const express =require("express");
const{login, getLogin}=require("../Controllers/Login");
const { signUp, getsignUp, EditSignup, DeleteSignup } = require("../Controllers/Signup");
const { PostSector, GetSector, DeleteSector, UpdateSector } = require("../Controllers/Sector");
const { PostProffection, GetProffection, DeleteProffection, UpdateProffection } = require("../Controllers/Proffection");
const { PostSalary, GetAllSalaries, DeleteSalary, UpdateSalary } = require("../Controllers/Salary");
const { PostEntranceExam, GetEntranceExamExam, PutEntranceExam, DeleteEntranceExam } = require("../Controllers/EntranceExam");
const { PostDiplomaCourse, GetDiplomaCourse, PutDiplomaCourse, DeleteDiplomaCourse } = require("../Controllers/DiplomaCourse");
const { PostCertificate, GetCertificate, PutCertificate, DeleteCertificate } = require("../Controllers/Certificate");
const { PostCourse, GetCourse, UpdateCourse, DeleteCourse } = require("../Controllers/Course");
const { PostCollege, GetCollege, PutCollege, Deletecollege } = require("../Controllers/Collage");
const { PostPgdiplmo, GetPgdiplmo, PutPgdiplmo, DeletePgdiplmo } = require("../Controllers/PgDiplmo");
const { PostPhd, GetPhd, PutPhd, DeletePhd } = require("../Controllers/Phd");



const router =express.Router();

//login
router.post("/",login);
router.get("/",getLogin);

//signup
router.post("/",signUp);
router.get("/",getsignUp);
router.put("/:id",EditSignup);
router.delete("/:id",DeleteSignup);

//Sectors
router.post("/",PostSector);
router.get("/",GetSector);
router.put("/:id",UpdateSector);
router.delete("/:id",DeleteSector);

//Proffection
router.post("/",PostProffection);
router.get("/",GetProffection);
router.delete("/:id",DeleteProffection);
router.put("/:id",UpdateProffection);

//Salary
router.post("/",PostSalary);
router.get("/",GetAllSalaries);
router.delete("/:id",DeleteSalary);
router.put("/:id",UpdateSalary)

//EntranceExam
router.post("/",PostEntranceExam);
router.get("/",GetEntranceExamExam);
router.put('/:id',PutEntranceExam);
router.delete('/:id',DeleteEntranceExam);
//diploma
router.post("/",PostDiplomaCourse);
router.get("/",GetDiplomaCourse);
router.put('/:id',PutDiplomaCourse);
router.delete('/:id',DeleteDiplomaCourse);

//pgdiplmo
router.post("/",PostPgdiplmo);
router.get("/",GetPgdiplmo);
router.put("/:id",PutPgdiplmo);
router.delete("/:id",DeletePgdiplmo);

//certificate
router.post("/",PostCertificate);
router.get("/",GetCertificate);
router.put('/:id',PutCertificate);
router.delete('/:id',DeleteCertificate);

//course
router.post("/",PostCourse);
router.get("/",GetCourse);
router.put("/:id",UpdateCourse);
router.delete("/:id",DeleteCourse);

//collage
router.post("/",PostCollege);
router.get("/",GetCollege);
router.put("/:id",PutCollege);
router.delete("/:id",Deletecollege);

//phd
router.post("/",PostPhd);
router.get("/",GetPhd);
router.put("/:id",PutPhd);
router.delete("/:id",DeletePhd);


module.exports=router;