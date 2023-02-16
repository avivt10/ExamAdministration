import React from 'react'
import {Navigate} from 'react-router-dom';
import NavBar from './../../Shared/Components/NavBar/NavBar';

const StudentPage = () => {
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
  if(storageData.id === "63d7db50a8cf714f5af5a8c1")
  {
    return(
      <Navigate to="/lecturerPage"/>
    )
  }
  return(
    <div>
    <NavBar/>
    <h1> StudentPage </h1>
    </div>

  )
}

export default StudentPage