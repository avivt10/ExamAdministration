import React from 'react'
import FinishExam from '../FinishExam/FinishExam';
import "./ExamDialog.css"

export type ExamDialogProps = {
  onClose : () => void;
  open: boolean;
  numberOfSolvedQuestions:number,
  numberQuestions:number,
}

const ExamDialog = ({onClose,open,numberOfSolvedQuestions,numberQuestions}:ExamDialogProps) => {
  if (!open)
  {
    return null;
  }
  return (
    <div className="modal">
      <FinishExam onClose={onClose} numberOfSolvedQuestions={numberOfSolvedQuestions} numberQuestions={numberQuestions}/>
    </div>
  )
}

export default ExamDialog