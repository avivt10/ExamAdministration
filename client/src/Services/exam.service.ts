import axios from "axios";
import config from "../config.json"
import { ExamType, ExamsType } from "../Shared/types/ExamType";


export const getTheExamineePage = (idForExam:any,idForStudent:any) : Promise<any> => {
    return axios.get(`${config.apiUrl}/api/exams/getTheExamineePage`,{params:{idForExam:idForExam,idForStudent:idForStudent}}).then((res) =>{
        return res.data})
}
// export const sendAnswers = (answers:any,idForExam:any,userName:string,userId:string,allQuestions:any) : Promise<any> => {
//     return axios.post(`${config.apiUrl}/api/exams/sendAnswers`,{answers,idForExam,userName,userId,allQuestions}).then((res)=> {
//         return res.data;
//     })
// }

// export const findStudentInArray = (idForStudent:string,idForExam:string):Promise<any> => {
//     return axios.get(`${config.apiUrl}/api/exams/findStudentInArray`,{params:{idForStudent:idForStudent,idForExam:idForExam}}).then((res)=> {
//         return res.data;
//     })
// }



