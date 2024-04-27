const mongoose = require('mongoose');


const collegeSchema = new mongoose.Schema({
 TypesofCollege: {
    type: String
  },
  Collegename: {
    type: String
  },
  Collegeaddress: {
    type: String
  },
  CoursesOffered: {
    
      type: String
    },
   TypeofEducation: {
      type: String
    },
    Scholarships: {
      type: String
    }
  
});

const CollegeModel = mongoose.model('Collegemodel', collegeSchema);
module.exports = CollegeModel;
