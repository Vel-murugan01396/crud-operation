

import React, { useEffect, useState }  from "react";
import Swal from 'sweetalert2';


export default function EntranceExam(){
    const [formData, setFormData] = useState({
        sector: "",
        profession:"",
        entranceexam:[] ,
      });
    const [sectors, SetSector] = useState([]);
    const [Alldata, setAlldata] = useState([]);
    const [Profession, SetProfession] = useState([]);
    const [isAddUserPopupOpen, setAddUserPopupOpen] = useState(false);
    const [viewUser, setViewUser] = useState(null);
    const [isViewUserModalOpen, setViewUserModalOpen] = useState(false);
    const [isUpdateUserPopupOpen, setUpdateUserPopupOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    // const [userExam, setUserExam] = useState([]);

    useEffect(() => {
    
        fetchSector();
        fetchProfession();
        fetchAllData();
      }, []);

      //show sector
      const fetchSector = async () => {
        try {
          const response = await fetch("http://localhost:8000/sector");
          if (response.ok) {
            const data = await response.json();
            SetSector(data);
          } else {
            console.error("Error fetching products:", response.status);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      //show profession
      const fetchProfession = async () => {
        try {
          const response = await fetch("http://localhost:8000/proffection");
          if (response.ok) {
            const data = await response.json();
            SetProfession(data);
          } else {
            console.error("Error fetching products:", response.status);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };

      const fetchAllData = async () => {
        try {
          const response = await fetch("http://localhost:8000/exam");
          if (response.ok) {
            const data = await response.json();
            setAlldata(data);
          } else {
            console.error("Error fetching products:", response.status);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };


      const postMethod = async () => {
        console.log(formData)
        try {
          const response = await fetch("http://localhost:8000/exam", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
           

          });
         
    
    
          if (response.ok) {
            const responseData = await response.json();
            fetchAllData();
            console.log(responseData);
            setAddUserPopupOpen(false);
          
    
            Swal.fire({
              icon: 'success',
              title: 'User Added Successfully!',
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
          console.error("Error in postMethod:", error);
        }
      };

     //input values code
      const handleTagInputKeyDown = (event) => {
        if (event.key === 'Enter' && event.target.value.trim() !== '') {
          setFormData({ ...formData, entranceexam: [...formData.entranceexam, event.target.value.trim()] });
          event.target.value = '';
        }
      };
    
      const handleTagRemove = (index) => {
        const newEntranceexam = [...formData.entranceexam];
        newEntranceexam.splice(index, 1);
        setFormData({ ...formData, entranceexam: newEntranceexam });
      };

      const openViewPopup = (user) => {
        setViewUser(user);
        setViewUserModalOpen(true);
      };

//only update
      const openUpdatePopup = (user) => {
        console.log(user);
        setUpdateUserPopupOpen(true);
        setSelectedUser(user);
        setFormData({
          sector:user.sector,
          profession: user.profession,
          entranceexam: user.entranceexam,
        });
      };
 

        
    const PutMethod= async()=>{
      try {
       
        const response = await fetch(
          `http://localhost:8000/exam/${selectedUser._id}`, // Use the provided userId
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {

          setUpdateUserPopupOpen(false);
          Swal.fire({
            icon: 'success',
            title: 'User Updated Successfully!',
            showConfirmButton: false,
            timer: 500,
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
        console.error("Error updating file:", error);
      }

    }


    //delete

    const DeleteMethod = async (userId) => {
      try {
        const response = await fetch(`http://localhost:8000/exam/${userId}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          // Update the state to remove the deleted user
          const updatedUserexam = Alldata.filter(user => user._id !== userId);
          setAlldata(updatedUserexam);
  
          Swal.fire({
            icon: 'success',
            title: 'User Deleted Successfully!',
            showConfirmButton: false,
            timer: 500,
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
        console.error("Error deleting user:", error);
      }
    };


     

  return (
    <>

{isAddUserPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl mb-4">Add Exam</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">sectors:</label>
              <select className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={(e)=> setFormData({ ...formData, sector: e.target.value })}>
           <option value="">Select a sector</option>
           {sectors?.map((sector) => (
                    <option key={sector.title} value={sector.title}>
                      {sector.title}
                    </option>))}
        </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Profession:</label>
              <select className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={(e)=> setFormData({ ...formData, profession: e.target.value })}>
           <option value="">Select a Profession</option>
           {Profession?.map((profession) => (
                    <option key={profession.title} value={profession.title}>
                      {profession.title}
                    </option>))}
        </select>
            </div>
             

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Entrance Exam</label>
              <div className="max-w-md mx-auto">
                <div className="flex flex-wrap mb-4">
                  {formData.entranceexam.map((exam, index) => (
                    <div key={index} className="bg-lime-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 flex items-center">
                      <span >{exam}</span>
                      <button className="ml-2 outline-none focus:outline-none" onClick={() => handleTagRemove(index)}>
                        x
                      </button>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Add Entrance Exams..."
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </div>
             
           
        
            <div className="flex justify-between">
              <button
                className="bg-violet-500 hover:bg-violet-500 text-white py-2 px-4 rounded mr-2"
                onClick={postMethod}
              >
                SAVE
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                onClick={() => setAddUserPopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

{isViewUserModalOpen && viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-2/4 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Sector Details</h2>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Sector : {viewUser.sector}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2"> Profession : {viewUser.profession}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Entrance Exam: {viewUser.entranceexam}</p>
            </div>
            <div className="flex justify-end">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setViewUserModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

{isUpdateUserPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Update Profession</h2>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">sectors:</label>
              <select className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={(e)=> setFormData({ ...formData, sector: e.target.value })}>
           <option >{formData.sector}</option>
           {sectors?.map((sector) => (
                    <option key={sector.title} value={sector.title}>
                      {sector.title}
                    </option>))}
        </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Profession:</label>
              <select className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={(e)=> setFormData({ ...formData, profession: e.target.value })}>
           <option >{formData.profession}</option>
           {Profession?.map((profession) => (
                    <option key={profession.title} value={profession.title}>
                      {profession.title}
                    </option>))}
        </select>
            </div>
             

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Entrance Exam</label>
              <div className="max-w-md mx-auto">
                <div className="flex flex-wrap mb-4">
                  {formData.entranceexam.map((exam, index) => (
                    <div key={index} className="bg-lime-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 flex items-center">
                      <span>{exam}</span>&&
                      <button className="ml-2 outline-none focus:outline-none" onClick={() => handleTagRemove(index)}>
                        x
                      </button>
                      
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Add Entrance Exams..."
                  className="bg-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => PutMethod(selectedUser._id)}
              >
                SAVE
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setUpdateUserPopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}



     <div className="flex justify-between mb-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-black">Entrance Exam  Datas</h2>

          <button className="bg-blue-600 text-white px-4 py-2 rounded" 
          onClick={() => setAddUserPopupOpen(true)}
          >
            +ADD USER
          </button>
        </div>
        <div className="overflow-auto" style={{ maxHeight: "400px" }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-xs text-left font-medium text-gray-500 uppercase tracking-wider">
            <th className="p-4">S.No</th>
            <th > Sector  </th>
              <th > Profession  </th>
              <th >Entrance Exam</th>
              <th > Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {Alldata.map((user, index) => (
              <tr key={index}>
                <td className="p-4 text-center">{index + 1}</td>
                <td className="max-w-xs overflow-hidden text-center">
                  {user.sector}
                </td>
                <td className="max-w-xs overflow-hidden text-center">
                  {user.profession}
                </td>
                <td className="max-w-xs overflow-hidden text-center ">
                  {user.entranceexam}
                </td>
                <td className=" px-4 py-2">
                  <button
                    className="text-blue-500 ml-2"
                    onClick={() => openUpdatePopup(user)}
                  >
                    Update
                  </button>
                  <button  className="text-red-500 ml-2"
                    onClick={() => DeleteMethod(user._id)}
                    >
                    Delete
                  </button>
                  <button className="text-lime-600 ml-2"
                     onClick={() => openViewPopup(user)}
                    >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
     






     
    </>
  );
}


