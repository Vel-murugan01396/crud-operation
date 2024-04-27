// UserDetailsPopup.js

import React, { useState } from "react";

const AddUser = ({ onClose, onAddUser }) => {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    mobilenumber:"",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    // Perform any validation if needed before adding the user
    onAddUser(newUser);
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
        <div className="w-full flex justify-between p-2">
          <h2 className="text-lg text-blue-500">Add User</h2>
          <span className="text-3xl text-black" onClick={onClose}>
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
            value={newUser.name}
            onChange={handleInputChange}
           
          />
          </div> 

          <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
              Email:
            </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={newUser.email}
            onChange={handleInputChange}
           
          />
          </div>

          <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
        Password:
            </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={newUser.password}
            onChange={handleInputChange}
           
          />
          </div>

          <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
        Mobilenumber:
            </label>
          <input
            type="mobilenumber"
            name="mobilenumber"
            placeholder="Mobilenumber"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={newUser.mobilenumber}
            onChange={handleInputChange}
           
          />
          </div>
          

          <button
            onClick={handleAddUser}
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm m-1"
          >
            Add User
          </button>
        </div>
      </div>
  
  );
};

export default AddUser;
