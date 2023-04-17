import axios from "axios";
import config from "../config.json"
import { ExamType, ExamsType } from "../Shared/types/ExamType";

export const addExam = (data:any) : Promise<any> => {
    return axios.post(`${config.apiUrl}/api/exams/addExams`,data).then((res) => {
        return res.data}).catch((e) => {
            alert("Add failed")
    })

}

export const getExam = (id:any) : Promise<ExamType> => {
    return axios.get(`${config.apiUrl}/api/exams/getExam`,{params:{id:id}}).then((res) => {
        return res.data})
}
export const getExams = () : Promise<ExamsType> => {
    return axios.get(`${config.apiUrl}/api/exams/getExams`).then((res) => {
        return res.data})
}

export const deleteExam = (id:string) : Promise<ExamsType> => {
    return axios.delete(`${config.apiUrl}/api/exams/deleteExam`,{data:{id:id}}).then((res) => {
        return res.data.message}).catch((e)=> {
            alert("delete failed!")
        })
}


export const getQuestions = (id:any) : Promise<any> => {
    return axios.get(`${config.apiUrl}/api/exams/getQuestions`,{params:{id:id}}).then((res) => {
        return res.data})
}

export const sendAnswers = (answers:any,idForExam:any,userName:string,userId:string) : Promise<any> => {
    return axios.post(`${config.apiUrl}/api/exams/sendAnswers`,{answers,idForExam,userName,userId}).then((res)=> {
        return res.data;
    })
}

export const findStudentInArray = (idForStudent:string,idForExam:string):Promise<any> => {
    return axios.get(`${config.apiUrl}/api/exams/findStudentInArray`,{params:{idForStudent:idForStudent,idForExam:idForExam}}).then((res)=> {
        return res.data;
    })
}

export const deleteQuestion = (idForExam:any,_id:string) : Promise<any> => {
    return axios.delete(`${config.apiUrl}/api/exams/deleteQuestion`,{params:{idForExam:idForExam,_id:_id}}).then((res) => {
        return res.data})
}

export const createQuestion = (data:any): Promise<ExamsType> => {
    console.log(data)
    return axios.post(`${config.apiUrl}/api/exams/createQuestion`,{data}).then((res) => {
        return res.data.message}).catch((e)=> {
            alert(e)
        })
}


