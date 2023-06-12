import FinishExam from '../FinishExam/FinishExam';
import "./ExamDialog.css"

export type ExamDialogProps = {
  open: boolean;
  numberOfSolvedQuestions:number,
  numberQuestions:number,
  allQuestions:any,
}

const ExamDialog = ({open,numberOfSolvedQuestions,numberQuestions,allQuestions}:ExamDialogProps) => {
  if (!open)
  {
    return null;
  }
  return (
    <div className="modal">
      <FinishExam numberOfSolvedQuestions={numberOfSolvedQuestions} numberQuestions={numberQuestions} allQuestions={allQuestions}/>
    </div>
  )
}

export default ExamDialog