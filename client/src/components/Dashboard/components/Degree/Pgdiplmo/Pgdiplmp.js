import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function Pgdiplmo() {
  const [courses, setCourses] = useState([]);
  const [isAddCoursesPopupOpen, setAddCoursesPopupOpen] = useState(false);
  const [isUpdateCoursesPopupOpen, setUpdateCoursesPopupOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState(null);
  const [viewCourse, setViewCourse] = useState(null);
  const [isViewCourseModalOpen, setViewCourseModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    PgDipolmaCourseName: "",
    Duration: ""
  });

  const fetchAllData = async () => {
    try {
      const response = await fetch("http://localhost:8000/pgdiploma");
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error("Error fetching products:", response.status);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const addCourse = async () => {
    try {
      const response = await fetch("http://localhost:8000/pgdiploma", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAddCoursesPopupOpen(false);

        Swal.fire({
          icon: 'success',
          title: 'PgdipolmaCourses Added Successfully!',
          showConfirmButton: false,
          timer: 500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error("Error adding salary:", error);
    }
  };

  const updateCourse = async (coursesId) => {
    try {
      const response = await fetch(`http://localhost:8000/pgdiploma/${coursesId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setUpdateCoursesPopupOpen(false);

        Swal.fire({
          icon: 'success',
          title: 'PgdipolmaCourses Updated Successfully!',
          showConfirmButton: false,
          timer: 500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error("Error updating salary:", error);
    }
  };

  const deleteCourse = async (coursesId) => {
    try {
      const response = await fetch(`http://localhost:8000/pgdiploma/${coursesId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedCourses = courses.filter(course => course._id !== coursesId);
        setCourses(updatedCourses);

        Swal.fire({
          icon: 'success',
          title: 'Courses Deleted Successfully!',
          showConfirmButton: false,
          timer: 500,
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    } catch (error) {
      console.error("Error deleting courses:", error);
    }
  };

  const openUpdatePopup = (course) => {
    setUpdateCoursesPopupOpen(true);
    setSelectedCourses(course);
    setFormData({
      PgDipolmaCourseName: course.PgDipolmaCourseName,
      Duration: course.Duration,
    });
  };

  const openViewPopup = (course) => {
    setViewCourse(course);
    setViewCourseModalOpen(true);
  };
  return (
    <>
      {isAddCoursesPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Add Course</h2>
            <form onSubmit={addCourse}>
              <div className="mb-4">
                <label  className="block text-sm font-medium text-gray-600"> PgDipolmaCourseName</label>
                <input
                  type="text"
                  id="courseName"
                  value={formData.PgDipolmaCourseName}
                  onChange={(e) => setFormData({ ...formData, PgDipolmaCourseName: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label  className="block text-sm font-medium text-gray-600">Duration</label>
                <input
                  type="text"
                  id="duration"
                  
                  value={formData.Duration}
                  onChange={(e) => setFormData({ ...formData, Duration: e.target.value })}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add</button>
                <button type="button" onClick={() => setAddCoursesPopupOpen(false)} className="bg-red-500 text-gray-800 px-4 py-2 rounded-md">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      {isUpdateCoursesPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Update Course</h2>
            <form onSubmit={() => updateCourse(selectedCourses._id)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Course Name</label>
                <input
                  type="text"
                  
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.PgDipolmaCourseName}
                  onChange={(e) => setFormData({ ...formData, PgDipolmaCourseName: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">Duration</label>
                <input
                  type="text"
                  id="duration"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  value={formData.Duration}
                  onChange={(e) => setFormData({ ...formData, Duration: e.target.value })}
                />
              </div>
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Update</button>
                <button type="button" onClick={() => setUpdateCoursesPopupOpen(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
  
      {isViewCourseModalOpen && viewCourse && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="w-2/4 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-bold mb-4">View Course</h2>
            <div>
              <p><span className="text-sm font-semibold mb-2">Course Name:</span> {viewCourse.PgDipolmaCourseName}</p>
              <p><span className="text-sm font-semibold mb-2">Duration:</span> {viewCourse.Duration}</p>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setViewCourseModalOpen(false)} className="bg-blue-500 text-white px-4 py-2 rounded-md">Close</button>
            </div>
          </div>
        </div>
      )}
  
      <div className="flex justify-between mb-6 mt-10">
        <h1 className="text-2xl font-semibold mb-4 text-black">PgDipolmaCourseName</h1>
        <button onClick={() => setAddCoursesPopupOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">+Add Course</button>
        </div>
     
        <div className="overflow-auto" style={{ maxHeight: "400px" }}>
        <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
            <tr className="text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
            <th className="p-4">S.No</th>
              <th >PgDipolmaCourseName</th>
              <th >Duration</th>
              <th >Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {courses.map((course, index) => (
              <tr key={course._id}>
                <td className="p-4 text-center">{index + 1}</td>
                <td className="max-w-xs overflow-hidden text-center">{course.PgDipolmaCourseName}</td>
                <td className="max-w-xs overflow-hidden text-center">{course.Duration}</td>
                <td className="max-w-xs overflow-hidden text-center">
                  <button onClick={() => openUpdatePopup(course)}  className="text-blue-500 ml-2">Update</button>
                  <button onClick={() => deleteCourse(course._id)} className="text-red-500 ml-2">Delete</button>
                  <button onClick={() => openViewPopup(course)} className="text-lime-600 ml-2">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </>
  );

}