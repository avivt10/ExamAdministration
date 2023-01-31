import React, { useState } from 'react';
import './App.css';
import HomePage from './Components/HomePage/HomePage';
import LecturerPage from './Components/LecturerPage/LecturerPage';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { AuthContext } from './Shared/context/auth-context';
import StudentPage from './Components/StudentPage/StudentPage';


function App() {
  const [token,setToken] = useState<string>("");
  const [userName,setUserName] = useState<string>("")
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userId,setUserId] = useState<string>("")
  


  let routes = (
    <BrowserRouter>
            <Routes> 
        <Route path="/" element={<HomePage/>}/>
        <Route path="/studentPage" element={<StudentPage/>}/>
        <Route path="/lecturerPage" element={<LecturerPage/>}/>
        </Routes>
    </BrowserRouter>

  )


  // // ///63d7db50a8cf714f5af5a8c1

  // if(userId === "63d7db50a8cf714f5af5a8c1")
  // {
  //   routes = (
  //     <BrowserRouter>
  //         <Routes>
  //           <Route path="/lecturerPage" element={<LecturerPage/>}/>
  //         </Routes>
  //     </BrowserRouter>
  //   )
  // }
  return (
    <div>
      <AuthContext.Provider value={{token,setToken,userName,setUserName,isLogin,setIsLogin,userId,setUserId}}>
      <main> {routes} </main>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
