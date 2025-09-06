// src/pages/NotFoundPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotFoundPage.css";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <img
          src="/peach_goma.gif"   // ✅ Place this gif in your public folder
          alt="Funny Not Found"
          className="notfound-gif"
        />
        <h1>🚫 Oops! Page Not Found</h1>
        <p>Man, you’re not allowed here or maybe you mistyped the link.</p>
        <button onClick={() => navigate("/")}>⬅ Go Back Home</button>
      </div>
    </div>
  );
};

export default NotFoundPage;
