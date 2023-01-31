import React from 'react'
import { useAuthContext } from './../../context/auth-context';

const NavBar = () => {
  const {userId} = useAuthContext()
  if(userId === "63d7db50a8cf714f5af5a8c1")
  {
    return (
      <div>
        <h1> nav bar with lecturer</h1>
      </div>
    )
  }
  return (

    <div>NavBar with student</div>
  )
}

export default NavBar