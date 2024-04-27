
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  duration: {
    type: String,
    
  },
  eligibility: {
    type: String,
    
  },
  department: {
    type: String,
    
  },
  durationEligibility: {
    type: String,
   
  }
});

const CourseModel = mongoose.model('Course', courseSchema);

module.exports = CourseModel;
