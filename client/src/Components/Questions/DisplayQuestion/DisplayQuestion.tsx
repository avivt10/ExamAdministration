<<<<<<< HEAD
import { useEffect } from 'react'
=======
>>>>>>> a5dea2d405257d05e9770d30cc43a6cd793f5f7b
import { getQuestions } from '../../../Services/user.service'
import { deleteQuestion } from '../../../Services/user.service'
import { useExamContext } from '../../../Shared/context/exam-context'
import { QuestionType } from '../../../Shared/types/QuestionType'
import "./DisplayQuestion.css"
export type DisplayQuestionProps = {
  question:QuestionType | any,
  index:number,
}

const DisplayQuestion = ({question,index} : DisplayQuestionProps) => {
  const {setQuestions} = useExamContext();
  const idForExam = localStorage.getItem("currentExam")
  const storageData = JSON.parse(localStorage.getItem("userData") || "{}")

    const sendQuestionForDelete = async(idQuestion:string)=> {
      try{
         const res = await deleteQuestion(idForExam,idQuestion,storageData.id);
         if(res)
         {
          const newQuestions = await getQuestions(idForExam,storageData.id);
          setQuestions(newQuestions.data)
          alert(res.message)
         }
        }
      catch(err)
      {
        console.log(err)
      }
    }


    if(storageData.role === "student")
    {
      return (
        <div>
          <div style={{display:"flex",marginLeft:"20px"}}>
          <p className="correct-answers-text"> Correct Answers</p>
          <div className="correct-answers-box"/>
          </div>

          <div style={{display:"flex",marginLeft:"20px"}}>
          <p className="wrong-answers-text"> Wrong Answers</p>
          <div className="wrong-answers-box"/>
          </div>

        <div className="box-container">
          <div className="question-container">
              <div className="question-style">
                {
              question.slice(0,4) === "http" ?
              <div>
               <img src={question.question} alt="1" className="img-style-display-question"/>
              </div>
             
                  :
                  <div>
                    <h4> {index})</h4>
                    <h3>  {question.question}</h3>
                  </div>
      
    
                }
                </div>
              <ul>
                 <li className="option-style"> 1) {question.option1}</li>
                 <li className="option-style"> 2) {question.option2}</li>
                 <li className="option-style"> 3) {question.option3}</li>
                 <li className="option-style"> 4) {question.option4}</li>
              </ul>
          </div>
        </div>
        </div>
      )
    }
    return (
    <div className="box-container">
      <div className="question-container">
          <div className="question-style">
            {
          question.question.slice(0,4) === "http" ?
          <div>
           <img src={question.question} alt="1" className="img-style-display-question"/>
          </div>
         
              :
              <div>
                <h4> {index})</h4>
                <h3>  {question.question}</h3>
              </div>
  

            }
            </div>
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