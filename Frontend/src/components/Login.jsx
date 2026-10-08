import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {useAuth} from '../context-api/AuthContext'
import apiUrl from "../config/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login}=useAuth()
  
  const navigate = useNavigate();
  
  const handleLogin = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api/user/login`, {
        email,
        password,
      });
      console.log(res.data);
      login(res.data.token)
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-100">
      <div className="bg-white w-80 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-5">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-green-600 text-white rounded-md px-4 w-full py-2 hover:bg-green-900 transition duration-300"
        >
          Login
        </button>

        <p className="mt-3 text-center">
          New Account?{" "}
          <Link className="text-green-600 hover:underline" to="/signup">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;