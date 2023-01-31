import { createContext,useContext } from "react";

export type AuthContextType = {
    token:string,
    setToken:Function,
    userName:string,
    setUserName:Function,
    isLogin:boolean,
    setIsLogin:Function,
    userId:string,
    setUserId:Function,
}

export const AuthContext = createContext<AuthContextType>({
    isLogin:false,
    setIsLogin: ()=> null,
    token: "",
    setToken: ()=> null,
    userName: "",
    setUserName: ()=> null,
    userId:"",
    setUserId:()=> null,
})

export const useAuthContext = () => useContext(AuthContext);