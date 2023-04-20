import React from 'react'

import {Navigate,Outlet} from "react-router-dom"; 


const PrivateRoutesLecturer = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    
return(
    userData.role === "lecturer" && userData.isLogin ? <Outlet/> : <Navigate to="/"/>
)
}

export default PrivateRoutesLecturer