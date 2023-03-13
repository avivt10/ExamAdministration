import React from 'react'
import "./FinishExam.css"
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useNavigate } from 'react-router-dom';
export type FinishExamProps = {
    onClose: () => void;
    numberOfSolvedQuestions:number,
    numberQuestions:number,
  };
const FinishExam = ({onClose,numberOfSolvedQuestions,numberQuestions} : FinishExamProps) => {
    const navigate = useNavigate();
  return (
    <div className="finish-exam-main-container">
        <SentimentVeryDissatisfiedIcon className="icon"/>
        <h2 style={{textAlign:"center"}}> the exam is over!</h2>
        <p style={{color:"red",textAlign:"center"}}>You answered {numberOfSolvedQuestions} out of {numberQuestions}</p>
        <button style={{marginLeft:"700px"}} onClick={()=> {
            navigate("/studentHome")
        }}
        >
           go to home page
            </button>
    </div>
  )
}

export default FinishExam