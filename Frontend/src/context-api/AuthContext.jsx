import { createContext, useContext, useState } from "react";

const AuthContext=createContext();

export const AuthProvier=({children})=>{
    const [token,setToken]=useState(localStorage.getItem("token"))

    const login=(token)=>{
        localStorage.setItem("token",token)
        setToken(token)
    }

    const logout=()=>{
        localStorage.removeItem("token")
        setToken(null)
    }

    return (
        <AuthContext.Provider value={{login,token,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)