import React, { useEffect } from 'react'
import "./FinishExam.css"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useNavigate } from 'react-router-dom';
import { sendAnswers } from '../../../Services/exam.service';
import { useExamContext } from './../../../Shared/context/exam-context';
export type FinishExamProps = {
    numberOfSolvedQuestions:number,
    numberQuestions:number,
    allQuestions:any
  };
const FinishExam = ({numberOfSolvedQuestions,numberQuestions,allQuestions} : FinishExamProps) => {
    const {answers,setAnswers} = useExamContext()
    const idForExam = localStorage.getItem("currentExam");
    const userData = JSON.parse(localStorage.getItem("userData")|| "{}")
    
  const navigate = useNavigate();
    const sendAnswersToServer = async()=>{
      try{
          const res = await sendAnswers(answers,idForExam,userData.fullName,userData.id,allQuestions)
          if(res)
          {
            setAnswers([]);
            alert("exam sent successfully")
            navigate("/home/student")
          }
      }catch(error){
        console.log(error)
      }
    }
  return (
    <div className="finish-exam-main-container">
        <SentimentVeryDissatisfiedIcon className="icon"/>
        <h2 style={{textAlign:"center"}}> the exam is over!</h2>
        <p style={{color:"red",textAlign:"center"}}>You answered {numberOfSolvedQuestions} out of {numberQuestions}</p>
        <button style={{marginLeft:"250px",marginTop:"60px",width:"50%"}} onClick={()=> {
            sendAnswersToServer()
        }}
        >
           send exam 
            </button>
    </div>
  )
}

export default FinishExam