import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";

import Admin from "./components/Admin";

import { useAuth } from "./context-api/AuthContext";

function App() {
  const { token } = useAuth();

  let role = null;

  if (token) {
    const user = JSON.parse(atob(token.split(".")[1]));
    role = user.role;
  }

  return (
    <Routes>
      {token ? (
        <>
          <Route path="/" element={<Home />} />

          <Route
            path="/admin"
            element={
              role === "admin" ? (
                <Admin />
              ) : (
                <div className="min-h-screen flex items-center justify-center bg-slate-50">
                  <div className="text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                    <h1 className="text-3xl font-bold text-red-600">
                      Admin Only
                    </h1>

                    <p className="text-slate-500 mt-2">
                      You do not have permission to access this page.
                    </p>
                  </div>
                </div>
              )
            }
          />
        </>
      ) : (
        <>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}
    </Routes>
  );
}

export default App;