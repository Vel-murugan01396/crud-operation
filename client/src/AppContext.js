import React,{createContext,useState} from "react";


export const AppContext =createContext();


const AppContextProvider=({children})=>{
    const[loginData, setLoginData]=useState([]);
  


    return(
        <AppContext.Provider
        value={{loginData,setLoginData,}}>
            {children}
        </AppContext.Provider>
    );

};

export default AppContextProvider;