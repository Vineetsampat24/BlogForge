import React from 'react'
import { useAuth } from '../context-api/AuthContext'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const {logout}=useAuth()
    const navigate=useNavigate()

    const handleLogout=()=>{
        logout()
        navigate("/")
    }

  return (
    <button onClick={handleLogout} className=' bg-red-600 text-white rounded-md hover:bg-red-800 px-3 py-1 font-medium transition'>
        Logout
    </button>
  )
}

export default Logout