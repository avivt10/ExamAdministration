import React from 'react'

import {Navigate,Outlet} from "react-router-dom"; 


const PrivateRoutesLecturer = () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    
return(
    userData.id === "63d7db50a8cf714f5af5a8c1" && userData.isLogin ? <Outlet/> : <Navigate to="/"/>
)
}

export default PrivateRoutesLecturer