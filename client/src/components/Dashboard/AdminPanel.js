import React,{useState,useContext} from "react";
import { Link,Route,Routes,useNavigate } from "react-router-dom";
import User from "./components/User/User";
import Sector from "./components/Sectors/Sector";
import Tag from "./components/Tags/Tag";

import { AppContext } from "../../AppContext";
import Product from "./components/Product/Product";
import EntranceExam from "./components/EntranceExam/EnteranceExam";

//Degree components
import Degree from "./components/Degree/Degree";
import Certificate from "./components/Degree/Certificate/Certificate";
import Course from "./components/Degree/Course/Course";
import Salary from "./components/Degree/Salary/Salary";
import DiplomaCourses from "./components/Degree/DiplmoCourses/DiplmoCourses";
import Collages from "./components/Collages/Collages";
import Pgdiplmo from "./components/Degree/Pgdiplmo/Pgdiplmp";
import Jobs from "./components/Jobs/Jobs";
import Phd from "./components/Degree/Phd/Phd";






export default function AdminPanel(){
     const{loginData}=useContext(AppContext)
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
      };
    
      const handleLogout = () => {
        // Clear the logged-in user information
       
        // Redirect to the login page
        navigate('/login');
      };
      const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
      };
    return(
        <>
          <div className="flex h-screen bg-gray-200">
      {/* Sidebar */}
      <div className={`w-60 bg-gray-800 text-white p-4 ${sidebarVisible ? '' : 'hidden'}`}>
        <h1 className="text-2xl font-semibold mb-8 cursor-pointer">
         <Link to="/dashboard"> Admin Panel </Link></h1>
        <ul>
          <li className="mb-2">
            <Link to="/dashboard/sector" className="hover:text-gray-300">Sector</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/tags" className="hover:text-gray-300">Tags</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/user" className="hover:text-gray-300">Users</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/product" className="hover:text-gray-300">Profession</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/entranceexam" className="hover:text-gray-300">Entrance Exam</Link>
          </li>

          <li className="mb-2">
            <Link to="/dashboard/degree" className="hover:text-gray-300 flex " onClick={toggleDropdown}> <span className="hover:text-gray-300">Degree</span>
                <svg
                  className={`w-4 h-4 m-1  ${
                    dropdownVisible ? "transform rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg></Link>
          </li>

          <div>
        {dropdownVisible && (
            <ul>
              <li className="mb-2">
            <Link to="/dashboard/degree/salary" className="hover:text-gray-300">Salary</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/degree/certificate" className="hover:text-gray-300">Certificate Course</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/degree/course" className="hover:text-gray-300">Course</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/degree/diplmoacourse" className="hover:text-gray-300">Diplmoa Course</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/degree/pgdiplmo" className="hover:text-gray-300">PG Diplmo</Link>
          </li>  
          <li className="mb-2">
            <Link to="/dashboard/degree/phd" className="hover:text-gray-300">PHD</Link>
          </li> 
            </ul>
          )}
          </div>
          <li className="mb-2">
            <Link to="/dashboard/collages" className="hover:text-gray-300">Collages</Link>
          </li>
          <li className="mb-2">
            <Link to="/dashboard/jobs" className="hover:text-gray-300">Jobs</Link>
          </li>
          
        </ul>
  
      </div>

      {/* Main Content */}
      <div className="w-full p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          {/* Hamburger Menu */}
          <button onClick={toggleSidebar} className="">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          {/* Logout Button */}
          <div className="text-black">Welcome! {loginData.name}</div>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleLogout}>Logout</button>
        </div>

        {/* Your main content goes here */}
      

        {/* Display content based on selected menu item */}
        {sidebarVisible && (
          <Routes>
            <Route path="/user" element={<User />} />
            <Route path="/sector" element={<Sector />} />
            <Route path="/tags" element={<Tag />} />
            <Route path="/product" element={<Product/>}/>
            <Route path="/entranceexam" element={<EntranceExam/>}/>
            <Route path="/degree" element={<Degree/>}/>
            <Route path="/collages" element={<Collages/>}/>
            <Route path="/jobs" element={<Jobs/>}/>
           
            {/* dropdown Components */}
            <Route path="/degree/certificate" element={<Certificate/>}/>
            <Route path="/degree/course" element={<Course/>}/>
            <Route path="/degree/salary" element={<Salary/>}/>
            <Route path="degree/diplmoacourse" element={<DiplomaCourses/>}/>
            <Route path="degree/pgdiplmo" element={<Pgdiplmo/>}/>
            <Route path="degree/phd" element={<Phd/>}/>

            
           
           

          </Routes>
        )}
      </div>
    </div>
       
        
        </>
    )
}