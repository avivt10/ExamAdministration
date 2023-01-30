import axios from "axios";
import config from "../config.json"

export const signIn = (userName:string,password:string) : Promise<any> => {
    return axios.post(`${config.apiUrl}/api/users/signIn`,{userName,password}).then((res) => {
        return res.data}).catch((e) => {
            alert("Login failed")
    })

}