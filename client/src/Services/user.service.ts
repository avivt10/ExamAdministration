import axios from "axios";
import config from "../config.json"
import { ExamsType } from "../Shared/types/ExamType";

export const signIn = (userName:string,password:string) : Promise<any> => {
    return axios.post(`${config.apiUrl}/api/users/signIn`,{userName,password}).then((res) => {
        return res.data})
}
export const getExams = (idForUser:string,role:string) : Promise<ExamsType> => {
    return axios.get(`${config.apiUrl}/api/users/getExams`,{params:{id:idForUser,role:role}}).then((res) => {
        return res.data})
}

export const addExam = (data:any) : Promise<any> => {
        return axios.post(`${config.apiUrl}/api/users/addExams`,data).then((res) => {
            return res.data}).catch((e) => {
                alert("Add failed")
        })
    
    }

    export const deleteExam = (idForExam:string,idForUser:string) : Promise<ExamsType> => {
        return axios.delete(`${config.apiUrl}/api/users/deleteExam`,{data:{idForExam:idForExam,idForUser:idForUser}}).then((res) => {
            return res.data.message}).catch((e)=> {
                alert("delete failed!")
            })
    }
export const getFullExam = (idForStudent:any,idForExam:any) : Promise<any> => {
    return axios.get(`${config.apiUrl}/api/users/getFullExam`,{params:{idForStudent:idForStudent,idForExam:idForExam}}).then((res) => {
        return res.data}).catch((e) => {
            console.log(e)
    })
}


export const createQuestion = (data:any): Promise<ExamsType> => {
    return axios.post(`${config.apiUrl}/api/users/createQuestion`,{data}).then((res) => {
        return res.data.message}).catch((e)=> {
            alert(e)
        })
}


export const deleteQuestion = (idForExam:any,idQuestion:string,idForUser:any) : Promise<any> => {
    return axios.delete(`${config.apiUrl}/api/users/deleteQuestion`,{params:{idForExam:idForExam,idQuestion:idQuestion,idForUser:idForUser}}).then((res) => {
        return res.data})
}

export const getQuestions = (idForExam:any,idForUser:any) : Promise<any> => {
    return axios.get(`${config.apiUrl}/api/users/getQuestions`,{params:{idForExam:idForExam,idForUser:idForUser}}).then((res) => {
        return res.data})
}

export const studentTookTest = (idForStudent:string,idForExam:string):Promise<any> => {
    return axios.get(`${config.apiUrl}/api/users/studentTookTest`,{params:{idForStudent:idForStudent,idForExam:idForExam}}).then((res)=> {
        return res.data;
    })
}

export const getExam = (idForExam:any,idForUser:any) : Promise<any> => {
    return axios.get(`${config.apiUrl}/api/users/getExam`,{params:{idForExam:idForExam,idForUser:idForUser}}).then((res) => {
        return res.data})
}


export const sendAnswers = (answers:any,idForExam:any,idForUser:string,fullName:any,allQuestions:any) : Promise<any> => {
    return axios.post(`${config.apiUrl}/api/users/sendAnswers`,{answers,idForExam,idForUser,fullName,allQuestions}).then((res)=> {
        return res.data;
    })
}
