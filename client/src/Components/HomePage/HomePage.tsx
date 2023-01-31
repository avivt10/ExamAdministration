import React, { useState } from "react";
import "./HomePage.css";
import { signIn } from '../../Services/user.service';
import { useNavigate } from "react-router-dom";


const HomePage = () => { 
  const [userName,setUserName] = useState("");
  const [password,setPassword] = useState("");

  const navigate = useNavigate();
  const LoginUser = async()=> {

  
  try{
    const res = await signIn(userName,password)
    if(res)
    {
      alert(res.message)
      navigate("/afterLogin")
    }
  }
  catch(error)
  {
    alert(error)
  }
}

  const checkValues = () => {
     const validAll = userName && password;
     validAll ? LoginUser() : alert("login failed! try agin..")
  }

  return (
    <div className="home-container">
      <img
        className="style-image"
        src="https://images.unsplash.com/photo-1539632346654-dd4c3cffad8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
        alt="1"
      />
      <div className="login-container">
        <div className="card-container">

          <p style={{ textAlign: "center", marginTop: "0",fontSize:"25px",color:"white" }}> login form </p>

          <div className="inputs-container">
            <div className="input-style">
              <input
                type="text"
                className="text-input"
                required
                autoComplete="off"
                placeholder="enter your user name"
                onChange={(e) => setUserName(e.target.value)}
              />
              <label> user-name </label>
            </div>
            <div className="input-style">
              <input
                type="password"
                required
                className="text-input"
                autoComplete="off"
                placeholder="enter your password"
                onChange={(e)=> setPassword(e.target.value)}
              />
              <label> password </label>
            </div>
            <button className="btn-home" onClick={checkValues}>login</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomePage;

//   <div className="container-home">
{
  /* <img
className="style-image"
src="https://images.unsplash.com/photo-1539632346654-dd4c3cffad8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
alt="1"
/>
<div className="container-login">
<div className="container-card">
  <p style={{ textAlign: "center" }}> login form </p>

<div className="inputs-style">
<input type="text" />
  <span> user-name </span>
</div>
<div className="inputs-style">
  <input type="password" />
  <span> password </span>
</div>
</div>
</div>
</div> */
}
