import React,{useState,useEffect}from "react";
import AddUser from "./AddUser";
import ViewUser from "./ViewUser";
import Swal from "sweetalert2";



export default function User(){
    const [result, setResult] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isViewModalOpen, setViewModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);
    const [updateData, setUpdateData] = useState({
        name: "",
        email: "",
        password: "",
        mobilenumber:"",
      });
   

useEffect(()=>{
    const fetchData=async()=>{
        try {
            const response=await fetch("http://localhost:8000/signup");
            const result= await response.json();

            if(result){
            setResult(result);
        }
            
        } catch (error) {
            console.error("Error during fetch:", error);
        }

    }
    fetchData();

},[])


//update popup

const toggleModal = (user) => {
    setModalOpen(!isModalOpen);
    setSelectedUser({...user});
    setUpdateData({
         name: user.name,
         email: user.email,
         password: user.password,
         mobilenumber:user.mobilenumber,
     });
     console.log(selectedUser)
  };

  //view popup
const toggleViewModal = (user) => {
    setViewModalOpen(!isViewModalOpen);
    setSelectedUser({ ...user });
  };


//Add popup
const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };

  const handleAddUser = async (newUser) => {
    try {
      // Optimistically update the UI
      setResult([...result, newUser]);
  
      const response = await fetch("http://localhost:8000/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
  
      if (response.ok) {
        const addedUser = await response.json();
        console.log(addedUser);
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "User added successfully",
          });
        // Keep the server response, or update further if needed
      } else {
        console.error('Error during user addition:', response.status);

        
      }
      toggleAddModal();
    } catch (error) {
      console.error('Error during user addition:', error);

    }
  };



  //put method
  const handleUpdate = async () => {
    try {
     
      const updatedSignupData = result.map((user) =>
        user._id === selectedUser._id ? { ...user, ...updateData } : user
      );
      setResult(updatedSignupData);
  
      const response = await fetch(`http://localhost:8000/signup/${selectedUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });
  
      if (response.ok) {
       
        setModalOpen(false);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Updated successfully",
        });
      } else {
        
        
        console.error('Error during update:', response.status);
      }
    } catch (error) {
      
     
      console.error('Error during update:', error);
    }
  };


    //delete method
    const handleDelete = async (userId) => {
        try {
          const response = await fetch(`http://localhost:8000/signup/${userId}`, {
            method: 'DELETE',
          });
    
          if (response.ok) {
            const updatedSignupData = result.filter(user => user._id !== userId);
            setResult(updatedSignupData);
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Deleted successfully",
            });
          } else {
            console.error('Error during delete:', response.status);
          }
        } catch (error) {
          console.error('Error during delete:', error);
        }
      };
  



  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
   
  };
  
  const filteredUsers = result.filter((user) =>
  (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
);

    return(
    <><div>

<div className="flex justify-between mb-6 mt-10">
        <h2 className="text-2xl font-semibold mb-4">Users</h2>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search by Name"
            className="mr-1 p-1 border-gray-300 rounded-md text-base"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded"
          onClick={toggleAddModal}
        > +Add</button>
      </div>

     <div className="overflow-auto" style={{ maxHeight: "400px" }}>
      <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 ">
            <tr className="text-xs text-left font-medium text-gray-500 uppercase tracking-wider">
              <th className="p-4"> S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Mobile Number</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {filteredUsers.map((user, index) => (
              <tr key={user._id} className={selectedUser._id === user._id }>
                <td className="p-4 text-left">{index + 1}</td>
                <td className="max-w-xs overflow-hidden text-left">
                  {user.name}
                </td>
                <td className="max-w-xs overflow-hidden text-left">
                  {user.email}
                </td>
                <td className="max-w-xs overflow-hidden text-left">
                  {user.password}
                </td>
                <td className="max-w-xs overflow-hidden text-left">
                  {user.mobilenumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    className={selectedUser._id === user._id ?"text-blue-500": ""}
                    onClick={() => 
                        toggleModal(user)
                      }
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="text-lime-600 ml-2"
                    onClick={() => toggleViewModal(user)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
            <div className="w-full flex justify-between p-2">
              <h2 className="text-lg text-blue-500">Update User</h2>
              <span
                className="text-3xl text-black"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </span>
            </div>


            <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
              Name:
            </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={updateData.name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, name: e.target.value })
                }
           
          />
          </div> 

          <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
              Email:
            </label>
          <input
             type="email"
             placeholder="Email"
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
             value={updateData.email}
             onChange={(e) =>
               setUpdateData({ ...updateData, email: e.target.value })
             }
           
          />
          </div>

          <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
           Password:
            </label>
          <input
             type="password"
             placeholder="Password"
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
             value={updateData.password}
             onChange={(e) =>
               setUpdateData({ ...updateData, password: e.target.value })
             }
           
          />
          </div>

          <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
        Mobilenumber:
            </label>
          <input
             type="mobilenumber"
             placeholder="Mobilenumber"
             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
             value={updateData.mobilenumber}
             onChange={(e) =>
               setUpdateData({ ...updateData, mobilenumber: e.target.value })
             }
           
          />
          </div>
      
              <button
               onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm m-1"
              >
                Save
              </button>
           
          </div>
        </div>
      )}






        {isAddModalOpen && (
        <AddUser onClose={toggleAddModal} onAddUser={handleAddUser} />
      )}

{isViewModalOpen && (
        <ViewUser
          user={selectedUser}
          onClose={() => setViewModalOpen(false)}
        />
      )}
             

        </div>
    </>)
}