import React from "react";
import "../pages-css/Login.css";

function Login() {
  return (
    
    <div className="login-container">
      <form className="login-form">
        <div className="name-passClass">
        <center><h2>Login to GeoGuesser</h2></center>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Enter username" />
        </div>
        <div className="name-passClass">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;