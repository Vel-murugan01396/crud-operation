// import { useState, useEffect } from "react";
// import Swal from 'sweetalert2';

// export default function DiplomaCourse(){

  
//   const [sectors, setSectors] = useState([]);
//   const [professions, setProfessions] = useState([]); 
//   const [formData, setFormData] = useState({ 
//     sector: "",
//     profession: "",
//     diplomaCourseName: "",
//     eligibility: []
//   });

//   const fetchSector = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/sector');
//       if (response.ok) {
//        const data = await response.json();
//       setSectors(data);
//       }
      
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };
//   const fetchProfession = async () => {
//     try {
//       const response = await fetch('http://localhost:8000/proffection');
//       if (!response.ok) {
//         throw new Error('Failed to fetch courses');
//       }
//       const data = await response.json();
//       setProfessions(data);
//     } catch (error) {
//       console.error('Error fetching courses:', error);
//     }
//   };
  

//   useEffect(() => {
//     fetchSector();
//     fetchProfession();
   
//   }, []);
  
//       const addCourse = async () => {
//         try {
//           const response = await fetch("http://localhost:8000/diploma", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(formData),
//           });
    
//           if (response.ok) {
//             console.log(response);
//             console.log(formData);
//             // setAddCoursePopupOpen(false);
//             // fetchAllData();
            
           
    
//             Swal.fire({
//               icon: 'success',
//               title: 'Course Added Successfully!',
//               showConfirmButton: false,
//               timer: 1500,
//             });
//           } else {
//             Swal.fire({
//               icon: 'error',
//               title: 'Oops...',
//               text: 'Something went wrong!',
//             });
//           }
//         } catch (error) {
//           console.error("Error adding course:", error);
//         }
//       };
  

  




//     return(<>


// <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
//             <h2 className="text-2xl font-semibold mb-4">Add Course</h2>
           
//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-2">sectors:</label>
//               <select className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={(e)=> setFormData({ ...formData, sector: e.target.value })}>
//            <option value="">Select a sector</option>
//            {sectors?.map((sector) => (
//                     <option key={sector.title} value={sector.title}>
//                       {sector.title}
//                     </option>))}
//         </select>
//             </div>
           
//             <div className="mb-4">
//               <label className="block text-sm font-semibold mb-2">Profession:</label>
//               <select className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={(e)=> setFormData({ ...formData, profession: e.target.value })}>
//            <option value="">Select a Profession</option>
//            {professions?.map((profession) => (
//                     <option key={profession.title} value={profession.title}>
//                       {profession.title}
//                     </option>))}
//         </select>
//             </div>
         
//             <div className="mb-4">
//               <label className="block text-sm font-medium text-gray-600">Diploma Course Name:</label>
//               <input
//                 type="text"
//                 value={formData.diplomaCourseName}
//                 onChange={(e) => setFormData({ ...formData, diplomaCourseName: e.target.value })}
//                 className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//               />
//             </div>
            
           

//             <div className="flex justify-between">
//               <button
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//                 onClick={addCourse}
//               >
//                 Save
//               </button>
              
//             </div>

            
//           </div>
//         </div>
//     </>)
// }



import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function DiplomaCourses() {
  const [courses, setCourses] = useState([]);
  const [isAddCoursePopupOpen, setAddCoursePopupOpen] = useState(false);
  const [isUpdateCoursePopupOpen, setUpdateCoursePopupOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewCourse, setViewCourse] = useState(null); 
  const [isViewCourseModalOpen, setViewCourseModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    DiplomaCourseName: "",
    Duration: ""
  });

  const fetchAllData = async () => {
        try {
          const response = await fetch("http://localhost:8000/diploma");
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

      const openUpdatePopup = (course) => {
          setUpdateCoursePopupOpen(true);
          setSelectedCourse(course);
          setFormData({
            
            DiplomaCourseName: course.DiplomaCourseName,
            Duration          :course.Duration
          });
          setUpdateCoursePopupOpen(true);
        }
        
        const handleInputChange = (e) => {
          const { name, value } = e.target;
          setFormData({
            ...formData,
            [name]: value
          });
        };
      


const openViewPopup = (course) => {
  setViewCourse(course); 
  setViewCourseModalOpen(true); 
};



      const addCourse = async () => {
                try {
                  const response = await fetch( "http://localhost:8000/diploma", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                  });
            
                  if (response.ok) {
                    console.log(response);
                    console.log(formData);
                    setAddCoursePopupOpen(false);
                    
                   
            
                    Swal.fire({
                      icon: 'success',
                      title: 'Course Added Successfully!',
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

              // //delete functionality
                 const deleteCourse  = async (id) => {
                  try {
                const response = await fetch(`http://localhost:8000/diploma/${id}`, {
                method: "DELETE",
                 });

           if (response.ok) {
            setCourses(courses.filter(course => course._id !== id));

           Swal.fire({
           icon: 'success',
          title: 'Course Deleted Successfully!',
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
    console.error("Error deleting course:", error);
  }
};


//update functionality
           const handleUpdate = async () => {
            try {
           const response = await fetch(`http://localhost:8000/diploma/${selectedCourse._id}`, {
           method: "PUT",
            headers: {
            "Content-Type": "application/json",
           },
          body: JSON.stringify(formData),
          });
  
         if (response.ok) {
         setAddCoursePopupOpen(false);
  
          Swal.fire({
          icon: 'success',
          title: 'Course Updated Successfully!',
          showConfirmButton: false,
          timer: 1500,
        });
  
        fetchAllData(); 
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
              return (
                  <div>
                    {/* Add Course Popup */}
                    {isAddCoursePopupOpen && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
                          <h2 className="text-2xl font-semibold mb-4">Add Course</h2>
                          {/* Course Name Input */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Course Name:</label>
                            <input
                              type="text"
                              name="DiplomaCourseName"
                              value={formData.DiplomaCourseName}
                              onChange={handleInputChange} // This function updates the state as the user types
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                          {/* Duration Input */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-600">Duration:</label>
                            <input
                              type="text"
                              name="Duration"
                              value={formData.Duration}
                              onChange={handleInputChange} // This function updates the state as the user types
                              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            />
                          </div>
                          {/* Save and Cancel Buttons */}
                          <div className="flex justify-between">
                            <button
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                              onClick={addCourse} // This function adds the course
                            >
                              Save
                            </button>
                            <button
                              className="bg-red-500 text-white py-2 px-4 rounded"
                              onClick={() => setAddCoursePopupOpen(false)} // This function closes the popup
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
      {/* Course Name Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Course Name:</label>
        <input
          type="text"
          name="DiplomaCourseName"
          value={formData.DiplomaCourseName}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      {/* Duration Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Duration:</label>
        <input
          type="text"
          name="Duration"
          value={formData.Duration}
          onChange={handleInputChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      {/* Save and Cancel Buttons */}
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={handleUpdate} 
        >
          Update
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
  <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}>
    <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
      <h2 className="text-2xl font-semibold mb-4">View Course</h2>
      
      <div className="mb-4">
        <p className="block text-sm font-semibold mb-2">Diploma Course Name: {viewCourse.DiplomaCourseName}</p>
      </div>
      <div className="mb-4">
        <p className="block text-sm font-semibold mb-2">Duration: {viewCourse.Duration}</p>
      </div>
      <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => setViewCourseModalOpen(false)}>
        Close
      </button>
    </div>
  </div>
)}


 {/* Main Content */}
      <div className="flex justify-between mb-6 mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-black">Diploma Course Management</h2>
        {/* Button to Open Add Course Popup */}
       <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setAddCoursePopupOpen(true)}>
        +ADD Course
       </button>
     </div>
      {/* Courses Table */}
      <div className="overflow-auto" style={{ maxHeight: "400px" }}>
      <table className="min-w-full divide-y divide-gray-200">
       <thead className="bg-gray-50">
         <tr className="text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
           <th>S.NO</th>
           <th>Course Name</th> 
          <th>Duration</th>  
          <th>Actions</th>
          </tr>
        </thead>
       <tbody className="bg-white text-black">
  {/* //         {/* Mapping through Courses */}
         {courses.map((course, index) => (
            <tr key={index}>
              <td className="p-4 text-center">{index + 1}</td>
              <td className="max-w-xs overflow-hidden text-center">{course.DiplomaCourseName}</td>
              <td className="max-w-xs overflow-hidden text-center">{course.Duration}</td>
              <td className="px-4 py-2 flex justify-center ">
                {/* Buttons to Perform Actions on Course */}
                <button className="text-blue-500 ml-2" onClick={() => openUpdatePopup(course)}>Update</button>
                <button className="text-red-500 ml-2" onClick={() => deleteCourse(course._id)}>Delete</button>
                
                <button className="text-lime-600 ml-2" onClick={() => openViewPopup(course)}> View </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
      }; 
















  