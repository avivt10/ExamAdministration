import { QuestionsType } from "./QuestionType";

export type ExamType = {
    examName:string,
    _id:string,
    date:string,
    lecturerName:string,
    beginningTime:string,
    totalTime:string,
    randomQuestions:boolean,
    questions:QuestionsType,
}

export type ExamsType = ExamType[];