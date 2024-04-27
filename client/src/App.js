import React from "react";
import "./index.css";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Login from "./components/LoginPage";
import Signup from "./components/SignupPage";
import AppContextProvider from "./AppContext";
import AdminPanel from "./components/Dashboard/AdminPanel";
import Dora from "./components/Dora";

function App() {
  

  return (
    <AppContextProvider>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Signup/>}></Route>
      
        {/* <Route path="/dasboard" element={<DasboardPage/>}></Route> */}
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/dashboard/*" element={<AdminPanel/>}></Route>
        <Route path="/dora" element={<Dora/>}></Route>
    </Routes>
    
    </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
