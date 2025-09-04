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
        localStorage.setItem("token", response.data.token);
        navigate("/");
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
        {/* 💤 Gif on top right corner */}
        <img src="/peach.gif" alt="Sleeping Cat" className="sleeping-gif" />

        <h2>Hii...Buddy</h2>
        <input
          type="text"
          placeholder="What's your Username😃"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Here Password Please🙈🙈"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Hit on me✨</button>
      </form>
    </div>
  );
}

export default Login;
