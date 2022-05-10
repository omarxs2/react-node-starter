import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Dashboard from './app/views/dashboard/Dashboard';
import Users from './app/views/users/Users';
import Universities from './app/views/universities/Universities';
import Departments from './app/views/departments/Departments';
import ApplyNow from "./pages/apply/ApplyNow";
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
          <Route
            path="/apply"
            element={<ApplyNow />}
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
            path="/users"
            element={<Users />}
          />
          <Route
            path="/universities"
            element={<Universities />}
          />
          <Route
            path="/departments"
            element={<Departments />}
          />

        </>

      )}
          <Route path="*" element={<Navigate to={token ? "/app" : "/login"} />} />

    </Routes>
  );
}

export default App;
