import React, { useState } from "react";
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom"


export default function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    mobilenumber: ""
  });


  const navigate = useNavigate();

  const handleSubmit = async () => {
   
    console.log(formData);

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      
        // Optionally, you can show a success message using SweetAlert2 or any other UI library
        Swal.fire({
          icon: 'success',
          title: 'Signup Successful',
          text: 'You have successfully signed up!',
        });
        navigate("/login")
       
      } else {
        const errorResponse = await response.json();
        const errorMessage = errorResponse.message || 'Something went wrong during signup. Please try again.';
        // Handle errors, optionally show an error message
        Swal.fire({
          icon: 'error',
          title: 'Signup Failed',
          text: errorMessage,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An unexpected error occurred. Please try again.',
      });
      console.log(error);
    }
  };

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Signup Account</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter your email"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-2">
            Username
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter your Name"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="mobilenumber" className="block text-gray-600 text-sm font-medium mb-2">
            Mobile Number
          </label>
          <input
            type="number"
            name="mobilenumber"
            value={formData.mobilenumber}
            placeholder="Enter your Mobilenumber"
            onChange={(e) => setFormData({ ...formData, mobilenumber: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
