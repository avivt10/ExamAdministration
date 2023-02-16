import { createContext,useContext } from "react";
import { ExamType } from "../types/ExamType";

export type ExamContextType = {
  exam:ExamType[],
  setExam:Function,
  idForExam:string,
  setIdForExam:Function,
}

export const ExamContext = createContext<ExamContextType>({
    exam:[],
    setExam:() => null,
    idForExam:"",
    setIdForExam:() => null,
})

export const useExamContext = () => useContext(ExamContext)