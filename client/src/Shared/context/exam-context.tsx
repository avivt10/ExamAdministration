import { createContext,useContext } from "react";
import { ExamType } from "../types/ExamType";
import { QuestionsType } from "../types/QuestionType";

export type ExamContextType = {
  exam:ExamType[],
  setExam:Function,
  idForExam:string,
  setIdForExam:Function,
  questions:QuestionsType,
  setQuestions:Function,
}

export const ExamContext = createContext<ExamContextType>({
    exam:[],
    setExam:() => null,
    idForExam:"",
    setIdForExam:() => null,
    questions:[],
    setQuestions:() => null,
})

export const useExamContext = () => useContext(ExamContext)