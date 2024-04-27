const express = require("express");
const mongoose=require("mongoose");
const dontenv=require("dotenv");
const cors=require("cors");
const { login, getLogin } = require("./Controllers/Login");
const { signUp, getsignUp, EditSignup, DeleteSignup } = require("./Controllers/Signup");
const { PostSector, GetSector, DeleteSector, UpdateSector } = require("./Controllers/Sector");
const { PostProffection, GetProffection, UpdateProffection, DeleteProffection } = require("./Controllers/Proffection");
const { PostSalary, GetAllSalaries, UpdateSalary, DeleteSalary } = require("./Controllers/Salary");
const { PostEntranceExam, GetEntranceExamExam, PutEntranceExam, DeleteEntranceExam } = require("./Controllers/EntranceExam");
const { PostDiplomaCourse, GetDiplomaCourse, PutDiplomaCourse, DeleteDiplomaCourse } = require("./Controllers/DiplomaCourse");
const { PostCertificate, GetCertificate, PutCertificate, DeleteCertificate } = require("./Controllers/Certificate");
const { PostCourse, GetCourse, UpdateCourse, DeleteCourse } = require("./Controllers/Course");
const { PostCollege, GetCollege, PutCollege, Deletecollege } = require("./Controllers/Collage");
const { PostPgdiplmo, GetPgdiplmo, PutPgdiplmo, DeletePgdiplmo } = require("./Controllers/PgDiplmo");
const { PostPhd, GetPhd, PutPhd, DeletePhd } = require("./Controllers/Phd");








dontenv.config();
const app = express();
app.use(express.json());
app.use(cors());



//login
app.post("/login",login);
app.get("/login",getLogin);

//signup
app.post("/signup",signUp);
app.get("/signup",getsignUp);
app.put("/signup/:id",EditSignup)
app.delete("/signup/:id",DeleteSignup)

//Sector
app.post("/sector",PostSector);
app.get("/sector",GetSector);
app.put("/sector/:id",UpdateSector);
app.delete("/sector/:id",DeleteSector);

//proffection
app.post("/proffection",PostProffection);
app.get("/proffection",GetProffection);
app.put("/proffection/:id",UpdateProffection);
app.delete("/proffection/:id",DeleteProffection);


//salary
app.post("/salary",PostSalary);
app.get("/salary",GetAllSalaries);
app.put("/salary/:id",UpdateSalary);
app.delete("/salary/:id",DeleteSalary);


//EntranceExam
app.post("/exam",PostEntranceExam);
app.get("/exam",GetEntranceExamExam);
app.put("/exam/:id",PutEntranceExam);
app.delete("/exam/:id",DeleteEntranceExam);

//diploma
app.post("/diploma",PostDiplomaCourse);
app.get("/diploma",GetDiplomaCourse);
app.put("/diploma/:id",PutDiplomaCourse);
app.delete("/diploma/:id",DeleteDiplomaCourse);

//pgdiploma
app.post("/pgdiploma",PostPgdiplmo);
app.get("/pgdiploma",GetPgdiplmo);
app.put("/pgdiploma/:id",PutPgdiplmo);
app.delete("/pgdiploma/:id",DeletePgdiplmo);

//certificate
app.post("/certificate",PostCertificate);
app.get("/certificate",GetCertificate);
app.put("/certificate/:id",PutCertificate);
app.delete("/certificate/:id",DeleteCertificate);

//course

app.post("/course",PostCourse);
app.get("/course",GetCourse);
app.put("/course/:id",UpdateCourse);
app.delete("/course/:id",DeleteCourse);

//collage

app.post("/collage",PostCollege);
app.get("/collage",GetCollege);
app.put("/collage/:id",PutCollege);
app.delete("/collage/:id",Deletecollege);

//phd
app.post("/phd",PostPhd);
app.get("/phd",GetPhd);
app.put("/phd/:id",PutPhd);
app.delete("/phd/:id",DeletePhd);



const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URL, {
   
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    
    console.log("db connected");
  })
  .catch((error) => {
    console.log(`${error} did not connect`);
  });