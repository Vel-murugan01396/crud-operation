const CourseModel = require('../Modals/Course');

const GetCourse = async (req, res) => {
    try {
      const courses = await CourseModel.find();
      res.status(200).json(courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
   const PostCourse = async (req, res) => {
    try {
      const { name, duration, eligibility, department, durationEligibility } = req.body;
  
      const newCourse = new CourseModel({
        name,
        duration,
        eligibility,
        department,
        durationEligibility
      });
  
      const savedCourse = await newCourse.save();
      res.status(201).json(savedCourse);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  const UpdateCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, duration, eligibility, department, durationEligibility } = req.body;
  
      const updatedCourse = await CourseModel.findByIdAndUpdate(id, {
        name,
        duration,
        eligibility,
        department,
        durationEligibility
      }, { new: true });
  
      if (!updatedCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      res.json(updatedCourse);
    } catch (error) {
      console.error('Error updating course:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const DeleteCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedCourse = await CourseModel.findByIdAndDelete(id);
  
      if (!deletedCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }
  
      res.json({ message: 'Course deleted successfully' });
    } catch (error) {
      console.error('Error deleting course:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
   GetCourse,PostCourse,UpdateCourse,DeleteCourse
  };
  



