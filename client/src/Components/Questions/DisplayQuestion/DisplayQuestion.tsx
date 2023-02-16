import React, { useState } from 'react'
import { ExamType } from '../../../Shared/types/ExamType'
import reportWebVitals from './../../../reportWebVitals';

export type DisplayQuestionProps = {
  questions:Object,
}

const DisplayQuestion = ({questions} : DisplayQuestionProps) => {
  // const result = Object.keys(question).map((key) => [])\


  const obj = [
    {
      id:"13",name:"aviv",age:"23"
    },
    {
      id:"213",name:"ofer",age:"11"
    },
    {
      id:"321",name:"ofira",age:"123"
    },
  ]

  console.log(obj)
  console.log(questions)
  return (
    <div>
    
    
      

    </div>
  )
}

export default DisplayQuestion