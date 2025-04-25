import React from "react";
import "../pages-css/Login.css";

function Login() {
  return (
    
    <div className="login-container">
      
      <form className="login-form">
        <div className="name-passClass">
        <center><h2>Login to GeoGuesser</h2></center>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" placeholder="Enter Email" />
        </div>
        <div className="name-passClass">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter password" />
        </div>
        <button type="submit">Login</button>
        <br></br>
        <button type="submit2">Creat account</button>
      </form>
    </div>
  );
}
export default Login;
