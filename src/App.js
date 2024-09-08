import React from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./Pages/Loading";
import LoginPage from "./Pages/Login";
import Register from "./Pages/Register";
import './style.css'
import Mainhomepage from "./Pages/Mainhomepage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Mainhomepage url={"dashboard"} />} />
        <Route path="/all-attendence" element={<Mainhomepage url={"all-attendence"} />} />
        <Route path="/leave-report" element={<Mainhomepage url={"leave-report"} />} />
        <Route path="/profile" element={<Mainhomepage url={"profile"} />} />
      </Routes>
    </div>
  );
}

export default App;
