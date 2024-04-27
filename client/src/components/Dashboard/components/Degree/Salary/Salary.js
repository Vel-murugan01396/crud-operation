

import { useState, useEffect } from "react";
import Swal from 'sweetalert2';


export default function SalaryComponent() {
 
  const [salaries, setSalaries] = useState([]); 
  const [isAddSalaryPopupOpen, setAddSalaryPopupOpen] = useState(false); 
  const [isUpdateSalaryPopupOpen, setUpdateSalaryPopupOpen] = useState(false); 
  const [selectedSalary, setSelectedSalary] = useState(null); 
  const [viewSalary, setViewSalary] = useState(null); 
  const [isViewSalaryModalOpen, setViewSalaryModalOpen] = useState(false); 
  const [formData, setFormData] = useState({ 
    experienceLevel: "",
    annualSalary: "",
    monthlySalaryRange: "",
    yearlySalaryRange: ""
  });

  useEffect(() => {
    fetchSalaries();
  }, []);

 //useffect code
  const fetchSalaries = async () => {
    try {
      
      const response = await fetch('http://localhost:8000/salary');
      
      
      if (!response.ok) {
        
        throw new Error('Failed to fetch salaries');
      }
      
    
      const data = await response.json();
      
      
      setSalaries(data);
    } catch (error) {
     
      console.error('Error fetching salaries:', error);
      
    }
  };
  
  
 
 
  const addSalary = async () => {
    try {
      
      const response = await fetch("http://localhost:8000/salary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      
      if (response.ok) {
       
        setAddSalaryPopupOpen(false);

        Swal.fire({
          icon: 'success',
          title: 'Salary Added Successfully!',
          showConfirmButton: false,
          timer: 500,
        });
        fetchSalaries()
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


  const openUpdatePopup = (salary) => {
    setUpdateSalaryPopupOpen(true);
    setSelectedSalary(salary);
    setFormData({
      experienceLevel: salary.experienceLevel,
      annualSalary: salary.annualSalary,
      monthlySalaryRange: salary.monthlySalaryRange,
      yearlySalaryRange: salary.yearlySalaryRange
    });
  };
  
  const updateSalary = async () => {
    try {
      const response = await fetch(`http://localhost:8000/salary/${selectedSalary._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setUpdateSalaryPopupOpen(false);

        Swal.fire({
          icon: 'success',
          title: 'Salary Updated Successfully!',
          showConfirmButton: false,
          timer: 500,
        });
        fetchSalaries()
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

  const deleteSalary = async (salaryId) => {
    try {
      const response = await fetch(`http://localhost:8000/salary/${salaryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const updatedSalaries = salaries.filter(salary => salary._id !== salaryId);
        setSalaries(updatedSalaries);

        Swal.fire({
          icon: 'success',
          title: 'Salary Deleted Successfully!',
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
      console.error("Error deleting salary:", error);
    }
  };

 

  const openViewPopup = (salary) => {
    setViewSalary(salary);
    setViewSalaryModalOpen(true);
  };

  return (
    <>
    
      {isAddSalaryPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Add Salary</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Experience Level:</label>
              <input
                type="text"
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
       
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Annual Salary:</label>
              <input
                type="text"
                value={formData.annualSalary}
                onChange={(e) => setFormData({ ...formData, annualSalary: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
           
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Monthly Salary Range:</label>
              <input
                type="text"
                value={formData.monthlySalaryRange}
                onChange={(e) => setFormData({ ...formData, monthlySalaryRange: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
           
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Yearly Salary Range:</label>
              <input
                type="text"
                value={formData.yearlySalaryRange}
                onChange={(e) => setFormData({ ...formData, yearlySalaryRange: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
        
            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={addSalary}
              >
                Add Salary
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setAddSalaryPopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
      {isUpdateSalaryPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Update Salary</h2>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Experience Level:</label>
              <input
                type="text"
                value={formData.experienceLevel}
                onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
           
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Annual Salary:</label>
              <input
                type="text"
                value={formData.annualSalary}
                onChange={(e) => setFormData({ ...formData, annualSalary: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
           
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Monthly Salary Range:</label>
              <input
                type="text"
                value={formData.monthlySalaryRange}
                onChange={(e) => setFormData({ ...formData, monthlySalaryRange: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
           
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Yearly Salary Range:</label>
              <input
                type="text"
                value={formData.yearlySalaryRange}
                onChange={(e) => setFormData({ ...formData, yearlySalaryRange: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          
            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => updateSalary(selectedSalary._id)}
              >
                Update Salary
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setUpdateSalaryPopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      
      {isViewSalaryModalOpen && viewSalary && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">View Salary Details</h2>
           
            <p className="text-sm font-medium mb-2">Experience Level: {viewSalary.experienceLevel}</p>
            <p className="text-sm font-medium mb-2">Annual Salary: {viewSalary.annualSalary}</p>
            <p className="text-sm font-medium mb-2">Monthly Salary Range: {viewSalary.monthlySalaryRange}</p>
            <p className="text-sm font-medium mb-2">Yearly Salary Range: {viewSalary.yearlySalaryRange}</p>
           
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setViewSalaryModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    
      <div className="flex justify-between mb-6 mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-black">Salary Management</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setAddSalaryPopupOpen(true)}>
          Add Salary
        </button>
      </div>

      <div className="table-container overflow-auto" style={{ maxHeight: "400px" }}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 ">
          <tr className="text-xs text-left font-medium text-gray-500 uppercase tracking-wider">
          <th className="p-4">S.No</th>
            <th >Experience Level</th>
            <th>Annual Salary</th>
            <th >Monthly Salary Range</th>
            <th >Yearly Salary Range</th>
            <th >Actions</th>
          </tr>
        </thead>
        <tbody>
         
          {salaries.map((salary, index) => (
            <tr key={index}>
              <td className="p-4 text-left">{index + 1}</td>
              <td className="max-w-xs overflow-hidden text-left">{salary.experienceLevel}</td>
              <td className="max-w-xs overflow-hidden text-left">{salary.annualSalary}</td>
              <td className="max-w-xs overflow-hidden text-left">{salary.monthlySalaryRange}</td>
              <td className="max-w-xs overflow-hidden text-left">{salary.yearlySalaryRange}</td>
              <td className=" px-4 py-2">
               
                <button onClick={() => deleteSalary(salary._id)} className=" text-red-500 ml-2">Delete</button>
                <button onClick={() => openViewPopup(salary)} className="text-lime-600 ml-2">View</button>
                <button onClick={() => openUpdatePopup(salary)} className="text-blue-500 ml-2">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  );
}
