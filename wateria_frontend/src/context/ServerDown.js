import React from "react";

const ServerDown = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      {/* Nezuko Gif */}
      <img
        src="/Nezuko_Sticker.gif"  // put your uploaded file here
        alt="Nezuko Napping"
        style={{ maxWidth: "200px", marginBottom: "20px" }}
      />

      {/* Message */}
      <h2>Oops! Our server is taking a nap 😴</h2>
      <p>Please try again in a few minutes.</p>
    </div>
  );
};

export default ServerDown;
