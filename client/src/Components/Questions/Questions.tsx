import React from 'react'
import NavBar from '../../Shared/Components/NavBar/NavBar'
import { useExamContext } from '../../Shared/context/exam-context';
import "./Questions.css"
import DisplayQuestion from './DisplayQuestion/DisplayQuestion';
import { useState } from 'react';
import { useEffect } from 'react';

const Question = () => {
  const {idForExam,exam} = useExamContext();
  const [arrQuestions,setArrQuestions] = useState([]);
  const [array,setArray] = useState([]);



  console.log(exam)
  return (
    <div>
      <NavBar/>

      <div className="box-container">
        {
          exam.map((item) => (
            <div>
              <> {item._id}</>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default Question