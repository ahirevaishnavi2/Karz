import React, { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    const userCredentials = { username, password };

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:9191/api/auth/users/signup",
        userCredentials
      );

      if (response.data.message) {
        setMessage(response.data.message);
      } else {
        setMessage("User created successfully");
      }
    } catch (error) {
      console.log("Error during signup:", error);

      if (error.response && error.response.status === 409) {
        setMessage("This username is already taken. Please try another one.");
      } else if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = (response) => {
    const googleData = { token: response.credential };

    axios
      .post("http://localhost:9191/api/auth/google", googleData)
      .then((res) => {
        setMessage(res.data);
        localStorage.setItem("username", googleData.token); // Store email if needed after parsing
        navigate("/profile-setup"); // You can redirect them to profile
      })
      .catch((err) => {
        console.error("Google signup error:", err);
        setMessage("Error with Google signup");
      });
  };

  const handleGoogleFailure = () => {
    setMessage("Google login failed");
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Signup</h2>
        <form onSubmit={handleSignup}>
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <div className="or-divider">OR</div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        />

        <p>{message}</p>

        {/* Go to Login button at bottom */}
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleGoToLogin} className="switch-button">
            Already have an account? Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
