import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Home from "./components/Home";
import ProfileSetup from "./components/ProfileSetup"; // Import ProfileSetup component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/home" element={<Home />} /> ✅ new route */}
        <Route path="/profile-setup" element={<ProfileSetup />} />{" "}
        {/* Profile setup route */}
      </Routes>
    </Router>
  );
}

export default App;
