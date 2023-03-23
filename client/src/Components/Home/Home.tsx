import React, { useEffect, useState } from "react";
import { BallTriangle } from "react-loader-spinner";
import { getExams } from "../../Services/exam.service";
import NavBar from "../../Shared/Components/NavBar/NavBar";
import { useExamContext } from "../../Shared/context/exam-context";
import { useSearchContext } from "../../Shared/context/search-context";
import { ExamsType } from "../../Shared/types/ExamType";
import DisplayExam from "../DisplayExam/DisplayExam";
import "./Home.css"

const Home = () => {
  const { exams, setExams,answers,setAnswers } = useExamContext();
  const [idExistInArray, setIdExistInArray] = useState(false);
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const listOfPerformedExams = JSON.parse(localStorage.getItem("listOfPerformedExams") || "[]");
  const { itemSearch } = useSearchContext();
  const [filteredExams, setFilteredExams] = useState<ExamsType>(exams);
  console.log(answers)
  useEffect(() => {
    setAnswers([])
    setTimeout(() => {
      setFilteredExams(exams)
    }, 2000);
  }, [exams])

  useEffect(() => {
    if(itemSearch !== "")
    {
      let filtered = exams.filter((exam) => exam.examName.toLocaleLowerCase().includes(itemSearch.toLocaleLowerCase()))
      setFilteredExams(filtered)
    }
  }, [itemSearch])

  useEffect(()=> {
    const getAllExams = async ()=> {
      const allExams = await getExams();
      setExams(allExams);
    }
    getAllExams();
    const isExist = listOfPerformedExams.includes(userData.id)
        setIdExistInArray(isExist)
},[])


    if(filteredExams.length === 0)
    {
     return(
       <div>
         <NavBar/>
         <div style={{margin:"auto",width:"100px", marginTop:"200px"}}>
         <BallTriangle height="300px" color="black"/>
         </div>
       </div>
     )
    }
  if (userData.token && userData.id === "63d7db50a8cf714f5af5a8c1") {
    return (
<div>
      <NavBar/>
  
           <div style={{marginTop:"50px"}}>
            <table>
              <thead>
              <tr>
               <th> Exam Name</th>
               <th> Date</th>
               <th> Lecturer Name</th>
               <th> View questions</th>
               <th> Add Question</th>
               <th> Delete</th>
              </tr>
              </thead>
              {
                filteredExams.map((exam) => (
                  <DisplayExam exam={exam} idExistInArray={idExistInArray} key={exam._id} />
                ) )
              }
            </table>

          </div>
        

    </div>
    )
}
 if(userData.token )
 {
    return(
        <div>
        <NavBar/>
        <div style={{marginTop:"50px"}}>
        <table>
              <thead>
              <tr>
               <th> Exam Name</th>
               <th> Date</th>
               <th> Lecturer Name</th>
               <th> Start Exam</th>
              </tr>
              </thead>
              {
                filteredExams.map((exam)=> (
                  <DisplayExam exam={exam} idExistInArray={idExistInArray} key={exam.examName} />
                ))
              }
        </table>
        </div>
        </div>
    )
 }
 return( 
  null
  )
};

export default Home;
