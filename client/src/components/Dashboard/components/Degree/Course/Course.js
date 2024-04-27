import React, {useEffect, useState} from 'react';
import Swal from 'sweetalert2';

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [isAddCoursePopupOpen, setAddCoursePopupOpen] = useState(false);
  const [isUpdateCoursePopupOpen, setUpdateCoursePopupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);
  const [isViewCourseModalOpen, setViewCourseModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    eligibility: '',
    department: '',
    durationEligibility: ''
  });

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8000/course');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const addCourse = async () => {
    try {
      const response = await fetch("http://localhost:8000/course", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAddCoursePopupOpen(false);
        Swal.fire({
          icon: 'success',
          title: 'The Course was Added Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const openUpdatePopup = (course) => {
    setSelectedCourse(course);
    setUpdateCoursePopupOpen(true);
    setFormData({
      name: course.name,
      duration: course.duration,
      eligibility: course.eligibility,
      department: course.department,
      durationEligibility: course.durationEligibility
    });
  };

  const updateCourse = async () => {
    try {
      const response = await fetch(`http://localhost:8000/course/${selectedCourse._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setUpdateCoursePopupOpen(false);
        Swal.fire({
          icon: 'success',
          title: 'Course Updated Successfully!',
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  const deleteCourse = async (courseId) => {
    try {
      const response = await fetch(`http://localhost:8000/course/${courseId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedCourse = courses.filter(course => course._id !== courseId);
        setCourses(updatedCourse);

        Swal.fire({
          icon: 'success',
          title: 'Course Deleted Successfully!',
          showConfirmButton: false,
          timer: 1000,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const openViewPopup = (course) => {
    setViewCourse(course);
    setViewCourseModalOpen(true);
  };

 

  return (
    <>
       {isAddCoursePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Add Course</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Certification name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Duration:</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Eligibility / Cutoff:</label>
              <input
                type="text"
                value={formData.eligibility}
                onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Department Name:</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">DurationEligibility:</label>
              <input
                type="text"
                value={formData.durationEligibility}
                onChange={(e) => setFormData({ ...formData, durationEligibility: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={addCourse}
              >
                Add Course
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setAddCoursePopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateCoursePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Update Course</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Certification name:</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Duration:</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Eligibility / Cutoff:</label>
              <input
                type="text"
                value={formData.eligibility}
                onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Department Name:</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">durationEligibility:</label>
              <input
                type="text"
                value={formData.durationEligibility}
                onChange={(e) => setFormData({ ...formData, durationEligibility: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div className="flex justify-between">
              <button
                className="bg-orange-600  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => updateCourse(selectedCourse._id)}
              >
                Update Course
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setUpdateCoursePopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isViewCourseModalOpen && viewCourse && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">View Course Details</h2>
          
            <p className="text-sm font-medium mb-2">Certification Name: {viewCourse.name}</p>
            <p className="text-sm font-medium mb-2">Duration: {viewCourse.duration}</p>
            <p className="text-sm font-medium mb-2">Eligibility / Cutoff: {viewCourse.eligibility}</p>
            <p className="text-sm font-medium mb-2">Department Name: {viewCourse.department}</p>
            <p className="text-sm font-medium mb-2">Duration Eligibility: {viewCourse.durationEligibility}</p>
      
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setViewCourseModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between mb-6 mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-black">Degree Details</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded"  onClick={() => setAddCoursePopupOpen(true)}>
          Add Course
        </button>
      </div>
      <div className="overflow-auto" style={{ maxHeight: "400px" }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr className="text-xs text-left font-medium text-gray-500 uppercase tracking-wider">
          <th className="p-4">S.No</th>
            <th >Certification Name</th>
            <th >Duration</th>
            <th >Eligibility / Cutoff</th>
            <th >Department Name</th>
            <th >Duration Eligibility</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index}>
              <td className="p-4 text-left">{index + 1}</td>
              <td className="max-w-xs overflow-hidden text-left">{course.name}</td>
              <td className="max-w-xs overflow-hidden text-left">{course.duration}</td>
              <td className="max-w-xs overflow-hidden text-left">{course.eligibility}</td>
              <td className="max-w-xs overflow-hidden text-left">{course.department}</td>
              <td className="max-w-xs overflow-hidden text-left">{course.durationEligibility}</td>
              <td className=" px-4 py-2">
                <button onClick={() => deleteCourse(course._id)} className="text-red-500 ml-2">Delete</button>
                <button onClick={() => openViewPopup(course)} className="text-lime-600 ml-2">View</button>
                <button onClick={() => openUpdatePopup(course)} className="text-blue-500 ml-2">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}


