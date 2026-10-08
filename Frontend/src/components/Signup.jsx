import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import apiUrl from "../config/api";

function Signup() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate=useNavigate()

  const handleSignup = async() => {
    try {
     const res=await axios.post(`${apiUrl}/api/user/signup`,{
        username,
        email,
        password
      })
      alert(res.data.message)
      navigate("/")
    } catch (error) {
      alert(error.response.data.error)
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white w-80 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-5">Signup</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          onClick={handleSignup}
          className="bg-green-600 text-white w-full py-2 rounded"
        >
          Signup
        </button>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-green-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;