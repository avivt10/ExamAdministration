import React from 'react'

import {Navigate,Outlet} from "react-router-dom"; 


const PrivateRoutesStudents = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    
return(
     userData.isLogin && userData.role === "student" ? <Outlet/> : <Navigate to="/"/>
)
}

export default PrivateRoutesStudents