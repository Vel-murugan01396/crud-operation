import React, { useEffect, useState }  from "react";
import selectStorage from "../../../../Firebase";
import { getDownloadURL, uploadBytes,ref } from "firebase/storage";
import Swal from 'sweetalert2';

export default function Product(){
    const [formData, setFormData] = useState({
        selectedFile: null,
        sector: "",
        title:"",
        description: "",
        downloadImage:"",
        eligibilitycriteria:""
      });
      const [sectors, SetSector] = useState([]);
      const [isAddUserPopupOpen, setAddUserPopupOpen] = useState(false);
      const [proffessions, setProffessions] = useState([]);
      const [viewUser, setViewUser] = useState(null);
      const [isViewUserModalOpen, setViewUserModalOpen] = useState(false);
      const [isUpdateUserPopupOpen, setUpdateUserPopupOpen] = useState(false);
      const [selectedUser, setSelectedUser] = useState(null);
      const [userProffection, setUserProffection] = useState([]);
  

 

    // showing sector,proffection

    useEffect(() => {
      fetchProfession();
      fetchSector();
    }, []);

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

    const fetchProfession = async () => {
      try {
        const response = await fetch("http://localhost:8000/proffection");
        if (response.ok) {
          const data = await response.json();
          setProffessions(data);
        } else {
          console.error("Error fetching products:", response.status);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const uploadingImage=async()=>{
        try {
            if(formData.selectedFile){
                const storageRef=ref(selectStorage,`proffection/${formData.selectedFile.name}`);
                const snapshot=await uploadBytes(storageRef,formData.selectedFile);
                console.log(snapshot);
                const downloadImage=await getDownloadURL(storageRef);
                console.log("file succes",downloadImage);

                postMethod({
                    sector:formData.sector,
                    title:formData.title,
                    description:formData.description,
                    eligibilitycriteria:formData.eligibilitycriteria,
                    downloadImage,
                });
            }else {
                console.error("No file selected");
              }
            
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const postMethod=async(data)=>{
        try {
            const response= await fetch("http://localhost:8000/proffection",{
                method:"POST",
                headers:{"content-Type":"application/json",},
                body:JSON.stringify(data),
            });
            if (response.ok) {
              const responseData = await response.json();
              console.log(responseData);
              setAddUserPopupOpen(false);
      
              Swal.fire({
                icon: 'success',
                title: 'User Added Successfully!',
                showConfirmButton: false,
                timer: 500,
              });
              fetchProfession();
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
    }

    const openUpdatePopup = (user) => {
      console.log(user);
      setUpdateUserPopupOpen(true);
      setSelectedUser(user);
      setFormData({
        selectedFile: null,
        sector:user.sector,
        title: user.title,
        description: user.description,
        downloadImage: user.downloadImage,
        eligibilitycriteria:user.eligibilitycriteria,
      });
    };

   
    
    const updatingImage= async(userId)=>{
      try {
        if(formData.selectedFile){
          const storageRef=ref(selectStorage,`proffection/${formData.selectedFile.name}`);
          await uploadBytes(storageRef,formData.selectedFile);
          const downloadImage=await getDownloadURL(storageRef);

          const updatedData={
            sector:formData.sector,
            title:formData.title,
            description:formData.description,
            eligibilitycriteria:formData.eligibilitycriteria,
            downloadImage,
          };
          const updatedUserProffection=userProffection.map(user =>
            user._id ===userId ? {...user,...updatedData}:user);

            setUserProffection(updatedUserProffection);

            //testing console
        //     console.log(updatedUserProffection);
        //     console.log(userProffection);
        // console.log(userId);
        const response = await fetch(
          `http://localhost:8000/proffection/${userId}`, // Use the provided userId
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
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
          fetchProfession();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          });
        }
      } else {
        console.error("No file selected");
      }

        
        
      } catch (error) {
        console.error("Error updating file:", error);
      }

    }

    const deleteImage = async (userId) => {
      try {
        const response = await fetch(`http://localhost:8000/proffection/${userId}`, {
          method: "DELETE",
        });
  
        if (response.ok) {
          // Update the state to remove the deleted user
          const updatedUserProffection = userProffection.filter(user => user._id !== userId);
          setUserProffection(updatedUserProffection);
  
          Swal.fire({
            icon: 'success',
            title: 'User Deleted Successfully!',
            showConfirmButton: false,
            timer: 500,
          });
          fetchProfession();
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





    const openViewPopup = (user) => {
      setViewUser(user);
      setViewUserModalOpen(true);
    };

    return(<>
   


<div className="flex justify-between mb-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-black">Profession  Datas</h2>

          <button className="bg-blue-600 text-white px-4 py-2 rounded" 
          onClick={() => setAddUserPopupOpen(true)}
          >
            +ADD USER
          </button>
        </div>
        <div className="overflow-auto" style={{ maxHeight: "400px" }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-xs text-center font-medium text-gray-500 uppercase tracking-wider">
            <th className="p-4">S.No</th>
            <th > Sector  </th>
              <th > Profession TITLE </th>
              <th >Profession DESCRIPTION</th>
              <th >Profession Thumbnail</th>
             <th> eligibilitycriteria</th>
              <th > Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {proffessions.map((user, index) => (
              <tr key={index}>
                <td className="p-4 text-left">{index + 1}</td>
                <td className="max-w-xs overflow-hidden text-center">
                  {user.sector}
                </td>
                <td className="max-w-xs overflow-hidden text-center">
                  {user.title}
                </td>
                <td className="max-w-xs overflow-hidden text-center">
                  {user.description}
                </td>
                <td className="max-w-xs overflow-hidden text-center">
                  <img
                    src={user.downloadImage}
                    alt="Thumbnail"
                    className="h-20 p-2"
                  />
                </td>
                <td className="max-w-xs overflow-hidden text-center">
                  {user.eligibilitycriteria}
                </td>
                <td className=" px-4 py-2">
                  <button
                    className="text-blue-500 ml-2"
                    onClick={() => openUpdatePopup(user)}
                  >
                    Update
                  </button>
                  <button  className="text-red-500 ml-2"
                    onClick={() => deleteImage(user._id)}
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


        {isAddUserPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-2xl mb-4">Add User</h2>
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
              <label className="block text-sm font-semibold mb-2">Title:</label>
              <input
                type="text"
                // value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Description:</label>
              <input
                type="text"
                // value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, selectedFile: e.target.files[0] })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Eligibilitycriteria:</label>
              <input
                type="text"
                // value={formData.eligibilitycriteria}
                onChange={(e) => setFormData({ ...formData, eligibilitycriteria: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-violet-500 hover:bg-violet-500 text-white py-2 px-4 rounded mr-2"
                onClick={uploadingImage}
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
              <p className="text-sm font-semibold mb-2"> Profession Title: {viewUser.title}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Profession Description: {viewUser.description}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Profession Thumbnail:</p>
              <img
                src={viewUser.downloadImage}
                alt="Thumbnail"
                className="h-20"
              />
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Profession Eligibilitycriteria: {viewUser.eligibilitycriteria}</p>
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
              <label className="block text-sm font-medium text-gray-600">sectors:</label>
              <select  className="mt-1 p-2 border border-gray-300 rounded-md w-full" onChange={(e)=> setFormData({ ...formData, sector: e.target.value })}>
           <option  >{formData.sector}</option>
           {sectors?.map((sector) => (
                    <option key={sector.title} value={sector.title}>
                      {sector.title}
                    </option>))}
        </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Profession Title:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Profession Description:</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Profession Thumbnail:</label>
              <input
                type="file"
                accept="image/*"
                
                onChange={(e) => setFormData({ ...formData, selectedFile: e.target.files[0] })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Profession Eligibilitycriteria:</label>
              <input
                type="text"
                value={formData.eligibilitycriteria}
                onChange={(e) => setFormData({ ...formData, eligibilitycriteria: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => updatingImage(selectedUser._id)}
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
    </>)
}

