import { useState, useEffect } from "react";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import selectStorage from "../../../../Firebase";
import Swal from 'sweetalert2';

export default function Sector() {
  const [formData, setFormData] = useState({
    selectedFile: null,
    title: "",
    description: "",
  });
  const [userSector, setUserSector] = useState([]);
  const [isAddUserPopupOpen, setAddUserPopupOpen] = useState(false);
  const [isUpdateUserPopupOpen, setUpdateUserPopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [viewUser, setViewUser] = useState(null);
  const [isViewUserModalOpen, setViewUserModalOpen] = useState(false);


  useEffect(() => {
    fetchUserDetails();
  }, []);
  const fetchUserDetails = async () => {
    try {
      const response = await fetch("http://localhost:8000/sector");
      if (response.ok) {
        const data = await response.json();
        setUserSector(data);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };




  const uploadImage = async () => {
    try {
      if (formData.selectedFile) {
        const storageRef = ref(
          selectStorage,
          `sector/${formData.selectedFile.name}`
        );
        const snapshot = await uploadBytes(storageRef, formData.selectedFile);
        console.log(snapshot);

        const downloadURL = await getDownloadURL(storageRef);
        console.log(
          "File uploaded successfully! Download URL:",
          downloadURL
        );

        postMethod({
          title: formData.title,
          description: formData.description,
          downloadURL,
        });
      } else {
        console.error("No file selected");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };




  const postMethod = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/sector", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
        fetchUserDetails();
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

  const openUpdatePopup = (user) => {
    console.log(user);
    setUpdateUserPopupOpen(true);
    setSelectedUser(user);
    setFormData({
      selectedFile: null,
      title: user.title,
      description: user.description,
    });
  };

  const updateImage = async (userId) => {
    try {


      if (formData.selectedFile) {
        const storageRef = ref(
          selectStorage,
          `sector/${formData.selectedFile.name}`
        );
        await uploadBytes(storageRef, formData.selectedFile);
        const downloadURL = await getDownloadURL(storageRef);

        const updatedData = {
          title: formData.title,
          description: formData.description,
          downloadURL,
        };
        const updatedUserSector = userSector.map(user =>
          user._id === userId ? { ...user, ...updatedData } : user
        );
        setUserSector(updatedUserSector);
        console.log(updatedUserSector);
        console.log(userSector);
        console.log(userId);
        const response = await fetch(
          `http://localhost:8000/sector/${userId}`, // Use the provided userId
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
          fetchUserDetails();
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
  };


  const deleteImage = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8000/sector/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update the state to remove the deleted user
        const updatedUserSector = userSector.filter(user => user._id !== userId);
        setUserSector(updatedUserSector);

        Swal.fire({
          icon: 'success',
          title: 'User Deleted Successfully!',
          showConfirmButton: false,
          timer: 500,
        });
        fetchUserDetails();
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


  return (
    <>
      {isAddUserPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Add User</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Sector Title:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Sector Description:</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Sector Thumbnail:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, selectedFile: e.target.files[0] })}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={uploadImage}
              >
                Upload Image
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={() => setAddUserPopupOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isUpdateUserPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Update Sector</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Sector Title:</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Sector Description:</label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Sector Thumbnail:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFormData({ ...formData, selectedFile: e.target.files[0] })}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={() => updateImage(selectedUser._id)}
              >
                Update Image
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
      {isViewUserModalOpen && viewUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-2/4 bg-white p-6 rounded shadow-md relative">
            <h2 className="text-2xl font-semibold mb-4">Sector Details</h2>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Sector Title: {viewUser.title}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Sector Description: {viewUser.description}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Sector Thumbnail:</p>
              <img
                src={viewUser.downloadURL}
                alt="Thumbnail"
                className="h-20"
              />
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

      
        <div className="flex justify-between mb-6 mt-10">
          <h2 className="text-2xl font-semibold mb-4 text-black">Sectors  Datas</h2>

          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setAddUserPopupOpen(true)}>
            +ADD USER
          </button>
        </div>
        <div className="overflow-auto" style={{ maxHeight: "400px" }}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-xs text-left font-medium text-gray-500 uppercase tracking-wider">
            <th className="p-4">S.No</th>
              <th > Sector TITLE </th>
              <th >Sector DESCRIPTION</th>
              <th >Sector Thumbnail</th>
              <th > Action</th>
            </tr>
          </thead>
          <tbody className="bg-white text-black">
            {userSector.map((user, index) => (
              <tr key={index}>
                <td className="p-4 text-left">{index + 1}</td>
                <td className="max-w-xs overflow-hidden text-left">
                  {user.title}
                </td>
                <td className="max-w-xs overflow-hidden text-left">
                  {user.description}
                </td>
                <td className="max-w-xs overflow-hidden text-left">
                  <img
                    src={user.downloadURL}
                    alt="Thumbnail"
                    className="h-20 p-2 "
                  />
                </td>
                <td className=" px-4 py-2">
                  <button
                    className="text-blue-500 ml-2"
                    onClick={() => openUpdatePopup(user)}
                  >
                    Update
                  </button>
                  <button  className="text-red-500 ml-2"
                    onClick={() => deleteImage(user._id)}>
                    Delete
                  </button>
                  <button className="text-lime-600 ml-2"
                    onClick={() => openViewPopup(user)}>
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

















