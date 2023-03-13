import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "./Shared/context/auth-context";
import AddTest from "./Components/AddExam/AddExam";
import { ExamsType } from "./Shared/types/ExamType";
import SignIn from './Components/SignIn/SignIn'
import { ExamContext } from "./Shared/context/exam-context";
import { getExams } from "./Services/exam.service";
import Questions from "./Components/Questions/Questions";
import AddQuestion from './Components/Questions/AddQuestion/AddQuestion';
import PrivateRoutesLecturer from "./utils/PrivateRoutesLecturer";
import PrivateRoutesStudents from './utils/PrivateRoutesStudents';
import LecturerHome from "./Components/LecturerHome/LecturerHome";
import StudentHome from './Components/StudentHome/StudentHome';
import StartExam from "./Components/StartExam/StartExam";
import { SearchContext } from "./Shared/context/search-context";

function App() {
  const [exams,setExams] = useState<ExamsType>([]);
  const [idForExam,setIdForExam] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [userFullName, setUserFullName] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const [questions,setQuestions] = useState([]);
  const [answers,setAnswers] = useState([]);
  const [performedExams,setPerformedExams] = useState([]);
  const [numberOfSolvedQuestions,setNumberOfSolvedQuestions] = useState(0);
  const [itemSearch, setItemSearch] = useState<string>("");
  useEffect(() => {
    const getIdFromStorage = localStorage.getItem("currentExam")
    setIdForExam(getIdFromStorage || "")
    const storageData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (
      storageData &&
      storageData.token &&
      storageData.firstName &&
      storageData.lastName &&
      storageData.id
    ) {
      setToken(storageData.token);
      setUserFullName(storageData.firstName + " " + storageData.lastName);
      setUserId(storageData.id);
      setIsLogin(true);
    }

    const getAllExams = async ()=> {
      const allExams = await getExams();
      setExams(allExams);
    }
    getAllExams();
  }, []);

  let routes = (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route element={<PrivateRoutesLecturer/>}>
           <Route path="/addTest" element={<AddTest/>}/>
           <Route path="/lecturerHome" element={<LecturerHome/>}/>       
           <Route path="/questions" element={<Questions/>}/>
           <Route path="/addQuestion" element={<AddQuestion/>}/>
        </Route>
        <Route element={<PrivateRoutesStudents/>}>
        <Route path="/studentHome" element={<StudentHome />} />
        <Route path="/startExam" element={<StartExam/>}/>
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
          userFullName,
          setUserFullName,
          isLogin,
          setIsLogin,
          userId,
          setUserId,
        }}
      >
        <ExamContext.Provider value={{exams,setExams,idForExam,setIdForExam,questions,setQuestions,answers,setAnswers,performedExams,setPerformedExams,numberOfSolvedQuestions,setNumberOfSolvedQuestions}}>
        <SearchContext.Provider value={{ itemSearch, setItemSearch }}>
        <main> {routes} </main>
        </SearchContext.Provider>
        </ExamContext.Provider>

      </AuthContext.Provider>
    </div>
  );
}

export default App;
