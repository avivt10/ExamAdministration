import { deleteQuestion, getQuestions } from '../../../Services/exam.service'
import { useExamContext } from '../../../Shared/context/exam-context'
import { QuestionType } from '../../../Shared/types/QuestionType'
import "./DisplayQuestion.css"
export type DisplayQuestionProps = {
  question:QuestionType,
}

const DisplayQuestion = ({question} : DisplayQuestionProps) => {
  const {setQuestions} = useExamContext();
  const typeQuestion = question.question.slice(0,4) === "http" ? "Image" : "Text";
  const idForExam = localStorage.getItem("currentExam")
    const sendQuestionForDelete = async(_id:string)=> {
      try{
          await deleteQuestion(idForExam,_id);
          const newQuestions = await getQuestions(idForExam);
          setQuestions(newQuestions.data)
        }
      catch(err)
      {
        console.log(err)
      }
    }

    return (
    <div className="box-container">
      <div className="question-container">
          <h3 className="question-style">
            {
          question.question.slice(0,4) === "http" ?
          <div>
           <img src={question.question} alt="1" className="img-style-display-question"/>
          </div>
         
              :
              <h3> {question.question}</h3>
  

            }
            </h3>
          <ul>
             <li className="option-style"> 1) {question.option1}</li>
             <li className="option-style"> 2) {question.option2}</li>
             <li className="option-style"> 3) {question.option3}</li>
             <li className="option-style"> 4) {question.option4}</li>
          </ul>
          <button className="button-delete-question" onClick={()=> {sendQuestionForDelete(question._id)}}> delete </button>
      </div>
    </div>
  )
}

export default DisplayQuestion