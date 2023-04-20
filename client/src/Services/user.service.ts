import axios from "axios";
import config from "../config.json"

export const signIn = (userName:string,password:string) : Promise<any> => {
    return axios.post(`${config.apiUrl}/api/users/signIn`,{userName,password}).then((res) => {
        return res.data}).catch((e) => {
            alert("Login failed")
    })
}

export const getFullExam = (idForStudent:any,idForExam:any) : Promise<any> => {
    return axios.get(`${config.apiUrl}/api/users/getFullExam`,{params:{idForStudent:idForStudent,idForExam:idForExam}}).then((res) => {
        return res.data}).catch((e) => {
            alert("Login failed")
    })
}