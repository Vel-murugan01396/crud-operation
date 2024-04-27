import { useState, useEffect } from "react";
import Swal from 'sweetalert2';

export default function Collages(){
    const [colleges, setColleges] = useState([]);
  const [isAddCollegePopupOpen, setAddCollegePopupOpen] = useState(false);
  const [isUpdateCollegePopupOpen, setUpdateCollegePopupOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [viewCourse, setViewCourse] = useState(null); 
  const [isViewCourseModalOpen, setViewCourseModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    TypesofCollege: "",
    Collegename: "",
    Collegeaddress: "",
    CoursesOffered: " ",
    MinEducation: "",
    TypeofEducation: "",
    Scholarships: ""
    
  });

  
  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const response = await fetch('http://localhost:8000/collage');
      if (!response.ok) {
        throw new Error('Failed to fetch colleges');
      }
      const data = await response.json();
      setColleges(data);
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };

  const addCollege = async () => {
    try {
      const response = await fetch("http://localhost:8000/collage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setAddCollegePopupOpen(false);
        fetchColleges();
        Swal.fire({
          icon: 'success',
          title: 'College Added Successfully!',
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
      console.error("Error adding college:", error);
    }
  };

 
  
  

  const deleteCollege = async (collegeId) => {
    try {
      const response = await fetch(`http://localhost:8000/collage/${collegeId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        const updatedColleges = colleges.filter(college => college._id !== collegeId);
        setColleges(updatedColleges);
        Swal.fire({
          icon: 'success',
          title: 'College Deleted Successfully!',
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
      console.error("Error deleting college:", error);
    }
  };
  const openUpdatePopup = (college) => {
    if (college && college._id) {
      setUpdateCollegePopupOpen(true);
      setSelectedCollege(college);
      setFormData({
        TypesofCollege: college.TypesofCollege,
        Collegename: college.Collegename,
        Collegeaddress: college.Collegeaddress,
        CoursesOffered: college.CoursesOffered,
        TypeofEducation: college.TypeofEducation,
        Scholarships: college.Scholarships
      });
    } else {
      console.error('College or its ID is null or undefined');
      setSelectedCollege(null);
      setFormData({
        TypesofCollege: '',
        Collegename: '',
        Collegeaddress: '',
        CoursesOffered: '',
        TypeofEducation: '',
        Scholarships: ''
      });
    }
  };
  
  const updateCollege = () => {
    if (!selectedCollege || !selectedCollege._id) {
      console.error('Selected college or its ID is null or undefined');
      return;
    }
  
    console.log('Updating college:', selectedCollege);
  
    fetch(`http://localhost:8000/collage/${selectedCollege._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (response.ok) {
          setUpdateCollegePopupOpen(false);
          // Optionally, you can fetch the updated colleges list here
          fetchColleges();
          Swal.fire({
            icon: 'success',
            title: 'College Updated Successfully!',
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          console.error('Failed to update college');
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to update college',
          });
        }
      })
      .catch(error => {
        console.error('Error updating college:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      });
  };
  


 
  const openViewPopup = (college) => {
    setViewCourse(college); 
    setViewCourseModalOpen(true); 
};
  const handleRadioChange = (e) => {
    setFormData({ ...formData, TypesofCollege: e.target.value });
  };
    return(<>
      <div>
      {/* Add College Popup */}
      {isAddCollegePopupOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
      <h2 className="text-2xl font-semibold mb-4">Add College</h2>

      <div>
      <label className="block text-sm  font-medium text-gray-600">Types of College:</label>
      <div className="flex gap-5">
        <label>
          <input
            type="radio"
            value="Aboard"
            // checked={formData.TypesofCollege === "Aboard"}
            onChange={handleRadioChange}
            className=" mt-3 "
          />
          Aboard
        </label>
        
        <label>
          <input
            type="radio"
            value="Domestic"
            // checked={formData.TypesofCollege === "Domestic"}
            onChange={handleRadioChange}
            className=" mt-3 "
          />
          Domestic
        </label>
      </div>
    </div>

      
      {/* Form inputs for adding a new college */}
      <div className="mb-4">
        <label className="block text-sm  font-medium text-gray-600">College Name:</label>
        <input
          type="text"
        //   value={formData.Collegename}
          onChange={(e) => setFormData({ ...formData, Collegename: e.target.value })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">College Address:</label>
        <input
          type="text"
        //   value={formData.Collegeaddress}
          onChange={(e) => setFormData({ ...formData, Collegeaddress: e.target.value })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Courses Offered:</label>
        <input
          type="text"
        //   value={formData.CoursesOffered}
          onChange={(e) => setFormData({ ...formData, CoursesOffered: e.target.value })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Type of Education:</label>
        <div className="flex gap-5">
          <label>
            <input
              type="radio"
              value="Distance Education"
              className=" mt-3 "
            //   checked={formData.TypeofEducation === "Distance Education"}
              onChange={(e) => setFormData({ ...formData, TypeofEducation: e.target.value })}
            />
            Distance Education
          </label>
          <label>
            <input
              type="radio"
              value="Part-Time"
              className=" mt-3 "
            //   checked={formData.TypeofEducation === "Part-Time"}
              onChange={(e) => setFormData({ ...formData, TypeofEducation: e.target.value })}
            />
            Part-Time
          </label>
          </div>
          <div className="flex gap-5">
          <label>
            <input
              type="radio"
              value="Regular"
              className=" mt-3 "
            //   checked={formData.TypeofEducation === "Regular"}
              onChange={(e) => setFormData({ ...formData, TypeofEducation: e.target.value })}
            />
            Regular
          </label>
          <label>
            <input
              type="radio"
              value="Full-Time"
              className=" mt-3 "
            //   checked={formData.TypeofEducation === "Full-Time"}
              onChange={(e) => setFormData({ ...formData, TypeofEducation: e.target.value })}
            />
            Full-Time
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Scholarships:</label>
        <input
          type="text"
        //   value={formData.  Scholarships}
          onChange={(e) => setFormData({ ...formData,   Scholarships: e.target.value })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>




      {/* Buttons for saving or canceling */}
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={addCollege}
        >
          Save
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={() => setAddCollegePopupOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}
{isUpdateCollegePopupOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
      <h2 className="text-2xl font-semibold mb-4">Update College</h2>
      
      

    <div>
      <label className="block text-sm  font-medium text-gray-600">Types of College:</label>
      <div className="flex gap-5">
        <label>
          <input
            type="radio"
            value="Aboard"
            checked={formData.TypesofCollege === "Aboard"}
            onChange={handleRadioChange}
            className=" mt-3 "
          />
          Aboard
        </label>
        <label>
          <input
            type="radio"
            value="Domestic"
            checked={formData.TypesofCollege === "Domestic"}
            onChange={handleRadioChange}
            className=" mt-3 "
          />
          Domestic
        </label>
      </div>
    </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">College Name:</label>
        <input
          type="text"
          value={formData.Collegename}
          onChange={(e) => setFormData({ ...formData, Collegename: e.target.value })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Collegeaddress:</label>
        <input
          type="text"
          value={formData.Collegeaddress}
          onChange={(e) => setFormData({ ...formData, Collegeaddress: e.target.value })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Courses Offered:</label>
        <input
          type="text"
          value={formData.CoursesOffered}
          onChange={(e) => setFormData({ ...formData, CoursesOffered: e.target.value })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>
     <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Type of Education:</label>
        <div className="flex gap-5">
          <label>
            <input
              type="radio"
              value="Distance Education"
              className=" mt-3 "
              checked={formData.TypeofEducation === "Distance Education"}
              onChange={(e) => setFormData({ ...formData, TypeofEducation: e.target.value })}
            />
            Distance Education
          </label>
          <label>
            <input
              type="radio"
              value="Part-Time"
              className=" mt-3 "
              checked={formData.TypeofEducation === "Part-Time"}
              onChange={(e) => setFormData({ ...formData, TypeofEducation: e.target.value })}
            />
            Part-Time
          </label>
          </div>
          <div className="flex gap-5">
          <label>
            <input
              type="radio"
              value="Regular"
              className=" mt-3 "
              checked={formData.TypeofEducation === "Regular"}
              onChange={(e) => setFormData({ ...formData, TypeofEducation: e.target.value })}
            />
            Regular
          </label>
          <label>
            <input
              type="radio"
              value="Full-Time"
              className=" mt-3 "
              checked={formData.TypeofEducation === "Full-Time"}
              onChange={(e) => setFormData({ ...formData, TypeofEducation: e.target.value })}
            />
            Full-Time
          </label>
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Scholarships:</label>
        <input
          type="text"
          value={formData.  Scholarships}
          onChange={(e) => setFormData({ ...formData,   Scholarships: e.target.value })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>




      {/* Buttons for updating or canceling */}
      <div className="flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={updateCollege}
        >
          Update
        </button>
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={() => setUpdateCollegePopupOpen(false)}
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
        <p className="block text-sm font-semibold mb-2">Type of College: {viewCourse.TypesofCollege}</p>
      </div>
      <div className="mb-4">
        <p className="block text-sm font-semibold mb-2">College Name: {viewCourse.Collegename}</p>
      </div>
      <div className="mb-4">
        <p className="block text-sm font-semibold mb-2">College Address: {viewCourse.Collegeaddress}</p>
      </div>
      <div className="mb-4">
        <p className="block text-sm font-semibold mb-2">CoursesOffered: {viewCourse.CoursesOffered}</p>
      </div>
<div className="mb-4">
        <p className="block text-sm font-semibold mb-2">Type of Education: {viewCourse.TypeofEducation}</p>
      </div>
<div className="mb-4">
        <p className="block text-sm font-semibold mb-2">Scholarships: {viewCourse.Scholarships}</p>
      </div>
      <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => setViewCourseModalOpen(false)}>
        Close
      </button>
    </div>
  </div>
)}
      


      {/* Main Content */}
      <div className="flex justify-between mb-6 mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-black">College Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setAddCollegePopupOpen(true)}>
          +ADD College
        </button>
      </div>
      <div className="overflow-auto" style={{ maxHeight: "400px" }}>
      {/* Colleges Table */}
      <table className="min-w-full divide-y divide-gray-200">
        <thead  className="bg-gray-50">
        <tr className="text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
            <th className="p-4">S.NO</th>
            <th >Type of College</th>
            <th >College Name</th>
            <th >College Address</th>
            <th >CoursesOffered</th>
            <th >Type of Education</th>
            <th >Scholarships</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white text-black">       

         {colleges.map((college, index) => (
    <tr key={index}>
       <td className="p-4 text-center">{index + 1}</td>
      <td className="max-w-xs overflow-hidden text-center">{college.TypesofCollege}</td>
      <td className="max-w-xs overflow-hidden text-center">{college.Collegename}</td>
      <td className="max-w-xs overflow-hidden text-center">{college.Collegeaddress}</td>
      <td className="max-w-xs overflow-hidden text-center">{college.CoursesOffered}</td>
      
      <td className="max-w-xs overflow-hidden text-center">{college.TypeofEducation}</td>
      <td className="max-w-xs overflow-hidden text-center">{college.Scholarships}</td>
      <td className= "px-4 py-2 flex justify-center">
        {/* Buttons to perform actions on each college */}
        <button  className="text-blue-500 ml-2"onClick={() => openUpdatePopup(college)} >Update</button>
        <button className="text-red-500 ml-2"onClick={() => deleteCollege(college._id)} >Delete</button>
        <button className= "text-lime-600 ml-2" onClick={() => openViewPopup(college)} >View</button>
      </td>
    </tr>
  ))}
</tbody>
</table>
</div>

</div>
    </>)
}