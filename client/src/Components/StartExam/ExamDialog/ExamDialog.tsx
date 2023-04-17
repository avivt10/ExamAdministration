import React, { useEffect } from 'react'
import FinishExam from '../FinishExam/FinishExam';
import "./ExamDialog.css"

export type ExamDialogProps = {
  open: boolean;
  numberOfSolvedQuestions:number,
  numberQuestions:number,
}

const ExamDialog = ({open,numberOfSolvedQuestions,numberQuestions}:ExamDialogProps) => {

  
  if (!open)
  {
    return null;
  }
  return (
    <div className="modal">
      <FinishExam numberOfSolvedQuestions={numberOfSolvedQuestions} numberQuestions={numberQuestions}/>
    </div>
  )
}

export default ExamDialog