import { createContext,useContext } from "react";
import { AnswersType } from "../types/AnswerType";
import { ExamType } from "../types/ExamType";
import { PerformedExamsType } from "../types/PerformedExamType";
import { QuestionsType } from "../types/QuestionType";

export type ExamContextType = {
  exams:ExamType[],
  setExams:Function,
  idForExam:string,
  setIdForExam:Function,
  questions:QuestionsType,
  setQuestions:Function,
  answers:AnswersType,
  setAnswers:Function,
  performedExams:PerformedExamsType,
  setPerformedExams:Function,
  numberOfSolvedQuestions:number,
  setNumberOfSolvedQuestions:Function,
}

export const ExamContext = createContext<ExamContextType>({
    exams:[],
    setExams:() => null,
    idForExam:"",
    setIdForExam:() => null,
    questions:[],
    setQuestions:() => null,
    answers:[],
    setAnswers:() => null,
    performedExams:[],
    setPerformedExams:() => null,
    numberOfSolvedQuestions:0,
    setNumberOfSolvedQuestions:() => null,
})

export const useExamContext = () => useContext(ExamContext)