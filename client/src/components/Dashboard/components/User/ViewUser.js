import React from "react";

const ViewUser = ({ user, onClose }) => {
  return (
   
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-1/3 bg-white p-6 rounded shadow-md relative">
      <div className="w-full flex justify-between p-2">
          <h2 className="text-2xl text-blue-500">User Details</h2>
          <span className="text-3xl text-black" onClick={onClose}>
            &times;
          </span>
          </div>
       

        <div className="w-full px-7 text-black">
          <p>
            Name: {user.name}
          </p>
          <p>
            Email: {user.email}
          </p>
          <p>
            Password: {user.password}
          </p>
        </div>
        </div>
      </div>
   
  );
};

export default ViewUser;
