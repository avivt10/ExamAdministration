import React from 'react'
import NavBar from '../../Shared/Components/NavBar/NavBar';
import { useAuthContext } from '../../Shared/context/auth-context';
import { Navigate, useNavigate } from "react-router-dom";

const LecturerPage = () => {
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");

    if(storageData.id === "63d7db50a8cf714f5af5a8c1")
    {
      return (
        <>
          <NavBar/>
        </>
      )
    }
  return (
    <Navigate to="/studentPage"/>
  )
}

export default LecturerPage;