import axios from "axios";
import config from "../config.json"
import { ExamType } from "../Shared/types/ExamType";

export const getTheExamineePage = (idForExam:string,idForStudent:string) : Promise<ExamType> => {
    return axios.get(`${config.apiUrl}/api/exams/getTheExamineePage`,{params:{idForExam:idForExam,idForStudent:idForStudent}}).then((res) =>{
        return res.data})
}




