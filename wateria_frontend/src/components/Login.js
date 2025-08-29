import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import "./Login.css";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post("/api/auth/login", { username, password });
      
      if (response.data.token) {
        // store JWT token instead of btoa(username:password)
        localStorage.setItem("token", response.data.token);
        navigate("/"); // redirect to Dashboard
      } else {
        alert("Invalid credentials");
      }
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
