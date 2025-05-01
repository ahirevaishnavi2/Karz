import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; // Reuse the same styles as Signup

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:9191/api/auth/login",
        {
          username,
          password,
        }
      );

      // Check if login was successful
      if (response.status === 200) {
        // Save username and password to localStorage
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        // Redirect to profile-setup
        navigate("/profile-setup");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Invalid username or password");
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
}

export default Login;
