import React, { useState } from 'react'
import axios from 'axios'
import "../pages-css/Login.css";

  function Login({ onAuth }) {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [message,  setMessage]  = useState('')

  const handleRegister = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/register',
        { email, password }
      )
      setMessage(data.message)
      
      onAuth(data.role || 'player')
    } catch (err) {
      setMessage(err.response?.data.message || 'Error creating account')
    }
  }

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password }
      )
      setMessage(data.message)
      onAuth(data.role)
    } catch (err) {
      setMessage(err.response?.data.message || 'Error logging in')
    }
  }
  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login to GeoGuesser</h2>
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <br></br>
        <div className="button-group">
          <button type="button" onClick={handleRegister}>
            Create Account
          </button>
          <br></br>
          <br></br>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default Login;
