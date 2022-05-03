import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Home from './app/views/home/Home';
import Dashboard from './app/views/dashboard/Dashboard';
import Agents from './app/views/agents/Agents';
import Universities from './app/views/universities/Universities';
import Departments from './app/views/departments/Departments';

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
          <Route
            path="/app"
            element={<Dashboard />}
          />
          <Route
            path="/agents"
            element={<Agents />}
          />
          <Route
            path="/universities"
            element={<Universities />}
          />
          <Route
            path="/departments"
            element={<Departments />}
          />
          <Route path="*" element={<Navigate to={token ? "/app" : "/login"} />} />

        </>

      )}

    </Routes>
  );
}

export default App;
