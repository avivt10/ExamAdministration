import { createContext,useContext } from "react";

export type AuthContextType = {
    token:string,
    setToken:Function,
    userFullName:string,
    setUserFullName:Function,
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
    userFullName: "",
    setUserFullName: ()=> null,
    userId:"",
    setUserId:()=> null,
})

export const useAuthContext = () => useContext(AuthContext);