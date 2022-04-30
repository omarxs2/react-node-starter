import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Home from './app/views/home/Home';
import { useSelector } from 'react-redux'

function App() {
  const token = useSelector((state) => state.auth.loginApp.token)


  return (
    <Routes>
      {!token && (
        <>
          <Route
            path="/login"
            element={<Login />}
          />
          <Route
            path="/signup"
            element={<SignUp />}
          />
        </>
      )}

      {token && (
        <>
          <Route path="/app"
            element={<Home />} />
        </>
      )}
      <Route path="*" element={<Navigate to={token ? "/app" : "/login"} />} />
    </Routes>
  );
}

export default App;
