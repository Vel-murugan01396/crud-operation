
import React, { useContext, useState } from "react";
import { AppContext } from "../../AppContext";
import Swal from 'sweetalert2';
import {useNavigate} from "react-router-dom"

export default function Login() {
  const{loginData,setLoginData}=useContext(AppContext)

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Password validation logic
      if (loginData.password.length < 8) {
        setError("Password must be at least 8 characters long.");
        return;
      }

      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      if (response.ok) {
        // Successful login, you can handle the response accordingly
        const responseData = await response.json();
        console.log( responseData);
        

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have successfully Login up!',
        });
       
        navigate("/dashboard")
        


      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || "Login failed");
        console.error("Login failed:", errorMessage);

        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: errorMessage,
        });
      }
    } catch (error) {
      
      setError("An unexpected error occurred. Please try again.");
      console.error("Unexpected error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login Account</h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Username
          </label>
          <input
            type="text"
            name="name"
            value={loginData.name}
            placeholder="Enter your Name"
            onChange={(e) => setLoginData({ ...loginData, name: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            placeholder="Enter your password"
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          onClick={handleSubmit}
        >
          Login
        </button>
      </div>
    </div>
  );
}
