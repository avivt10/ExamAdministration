import React, { useState } from "react";
import "./SignIn.css";
import { signIn } from '../../Services/user.service';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../../Shared/context/auth-context';

const SignIn = () => { 
  const [_userName,_setUserName] = useState("");
  const [password,setPassword] = useState("");
  const {setUserName,setUserId,setIsLogin} = useAuthContext()
  

  const navigate = useNavigate();
  const LoginUser = async()=> {

  
  try{
    const res = await signIn(_userName,password)
    if(res)
    {
      setUserName(res.userName)
      setIsLogin(true)
      window.localStorage.setItem("userData",JSON.stringify({ token : res.token,
        firstName : res.firstName,id:res.id,isLogin:true}))
      setUserId(res.id)
      alert(res.message)
      if(res.id === "63d7db50a8cf714f5af5a8c1")
      {
        navigate("lecturerPage")
      }
      else
      {
        navigate("studentPage")
      }

    }
  }
  catch(error)
  {
    alert(error)
  }
}

  const checkValues = () => {
     const validAll = _userName && password;
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
                onChange={(e) => _setUserName(e.target.value)}
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

export default SignIn;

