import { AnswersType } from "../../../Shared/types/AnswerType";
import { QuestionType } from "../../../Shared/types/QuestionType";
import { useExamContext } from './../../../Shared/context/exam-context';
import { useEffect, useState } from 'react';

export type DisplayStartExamProps = {
  question: QuestionType;
  answers:AnswersType,
  setAnswers:Function,
  indexQuestion:number,
  numOfSolvedQuestionsState:number,
  setNumSolvedQuestionsState:Function,
}
const DisplayStartExam = ({question,answers,indexQuestion,numOfSolvedQuestionsState,setNumSolvedQuestionsState }: DisplayStartExamProps) => {
  const {numberOfSolvedQuestions,setNumberOfSolvedQuestions} = useExamContext();
  console.log(answers)

  
  
  const selectedAnswer = (indexQuestion:number,indexAnswer:number,selectedAnswerInString:string)=> {
    const obj = {
      indexQuestion: indexQuestion,
      indexAnswer:indexAnswer,
      selectedAnswerInString:selectedAnswerInString,
    }
      if(answers.length > 0)
      {
        let counter = 0;
        for (let i = 0; i < answers.length; i++) {
          if(answers[i].indexQuestion === indexQuestion)
          {
            answers[i].indexAnswer = indexAnswer;
            answers[i].selectedAnswerInString = selectedAnswerInString;
            counter++;
            break;
          }
        }
        if(counter === 0)
        {
          answers.push(obj)
          setNumSolvedQuestionsState(numOfSolvedQuestionsState + 1)
          console.log(numOfSolvedQuestionsState)
        }
      }
      else
      {
        answers.push(obj)
        setNumSolvedQuestionsState(numOfSolvedQuestionsState + 1)
      }
      }  

  return (
    <div className="box-container"> 
      <div className="question-container">
        <div className="question-style">
          {question.question.slice(0, 4) === "http" ? (
            <div>
                 {indexQuestion}
              <img
                src={question.question}
                alt="2"
                className="img-style-display-question"
              />
            </div>
          ) : (
            <h3> {indexQuestion}) {question.question}</h3>
          )}
        </div>
        <ul>
          <div style={{ display: "flex" }}>
          <input type="radio" onClick={()=> selectedAnswer(indexQuestion,1,question.option1)} name={question.question}/>
            <li className="option-style"> {question.option1}</li>
          </div>
          <div style={{ display: "flex" }}>
          <input type="radio" onClick={()=> selectedAnswer(indexQuestion,2,question.option2)} name={question.question}/>
          <li className="option-style"> {question.option2}</li>
          </div>
          <div style={{ display: "flex" }}>
          <input type="radio" onClick={()=> selectedAnswer(indexQuestion,3,question.option3)} name={question.question}/>
          <li className="option-style"> {question.option3}</li>
          </div>
          <div style={{ display: "flex" }}>
          <input type="radio" onClick={()=> selectedAnswer(indexQuestion,4,question.option4)} name={question.question}/>
          <li className="option-style"> {question.option4}</li>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default DisplayStartExam;
