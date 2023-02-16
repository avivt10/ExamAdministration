import React from 'react'

import {Navigate,Outlet} from "react-router-dom"; 

// export type PrivateRoutesProps = {
//     isLogin : Boolean,
//     userId: String,
// }


const PrivateRoutes = () => {
    const isLogin = localStorage.getItem("userData")
return(
    isLogin ? <Outlet/> : <Navigate to="/"/>
)
}

export default PrivateRoutes