import React, { useEffect, useState } from "react";
import "./App.css";
import LecturerPage from "./Components/LecturerPage/LecturerPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./Shared/context/auth-context";
import StudentPage from "./Components/StudentPage/StudentPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import AddTest from "./Components/AddExam/AddExam";
import { ExamsType } from "./Shared/types/ExamType";
import SignIn from './Components/SignIn/SignIn'
import Home from "./Components/Home/Home";
import { ExamContext } from "./Shared/context/exam-context";
import { getExams } from "./Services/exam.service";
import Questions from "./Components/Questions/Questions";
import AddQuestion from './Components/Questions/AddQuestion/AddQuestion';

function App() {
  const [exam,setExam] = useState<ExamsType>([]);
  const [idForExam,setIdForExam] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [questions,setQuestions] = useState([]);

  useEffect(() => {
    const getIdFromStorage = localStorage.getItem("currentExam")
    setIdForExam(getIdFromStorage || "")
    const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (
      storageData &&
      storageData.token &&
      storageData.firstName &&
      storageData.id
    ) {
      setToken(storageData.token);
      setUserName(storageData.firstName);
      setUserId(storageData.id);
      setIsLogin(true);
    }

    const getAllExams = async ()=> {
      const allExams = await getExams();
      setExam(allExams);
    }
    getAllExams();
  }, []);

  let routes = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<PrivateRoutes/>}>
          <Route path="/studentPage" element={<StudentPage />} />
          <Route path="/lecturerPage" element={<LecturerPage />}/>
          <Route path="/addTest" element={<AddTest/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/questions" element={<Questions/>}/>
          <Route path="/addQuestion" element={<AddQuestion/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );


  return (
    <div>
      <AuthContext.Provider
        value={{
          token,
          setToken,
          userName,
          setUserName,
          isLogin,
          setIsLogin,
          userId,
          setUserId,
        }}
      >
        <ExamContext.Provider value={{exam,setExam,idForExam,setIdForExam,questions,setQuestions}}>
        <main> {routes} </main>
        </ExamContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
