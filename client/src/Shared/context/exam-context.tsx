import { createContext,useContext } from "react";
import { AnswersType } from "../types/AnswerType";
import { ExamType } from "../types/ExamType";
import { QuestionsType } from "../types/QuestionType";

export type ExamContextType = {
  exams:ExamType[],
  setExams:Function,
  questions:QuestionsType,
  setQuestions:Function,
  answers:AnswersType,
  setAnswers:Function,
  numberOfSolvedQuestions:number,
  setNumberOfSolvedQuestions:Function,
  isLoading:Boolean,
  setIsLoading:Function,
}

export const ExamContext = createContext<ExamContextType>({
    exams:[],
    setExams:() => null,
    questions:[],
    setQuestions:() => null,
    answers:[],
    setAnswers:() => null,
    numberOfSolvedQuestions:0,
    setNumberOfSolvedQuestions:() => null,
    isLoading:false,
    setIsLoading:() => null,

})

export const useExamContext = () => useContext(ExamContext)