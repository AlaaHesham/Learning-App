import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';

export default function AddAdmin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/administrators/addAdministartor", {
        username,
        password,
      });
      setDone(true)
      setError(false)
      setUsername('')
      setPassword('')
    } catch (err) {
      setError(true);
      setDone(false)
      setErrorMessage(err.response.data.error)
    }
  }

  return (
    <div className='add-admin' style={{borderRadius:"20px"}}>
      <div className="admin-Title">Add Adminstrator</div>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className='admin-form-divChild'>
          <label>Username</label>
          <input className="registerInput" type="text" value={username} placeholder="Enter your username..." onChange={(e) => setUsername(e.target.value)} />
        </div>
        <br /><br />
        <div className='admin-form-divChild'>
          <label>Password</label>
          <input className="registerInput" type="password" value={password} placeholder="Enter your password..." onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='submit'>
          <button className="btn btn-primary" style={{backgroundColor:"#fa7465"}} type="submit">Add</button>

        </div>
      </form>
      <br></br>
      {error && <span style={{ color: "red", marginTop: "10px" }}>{errorMessage}</span>}
      {done && <span style={{ color: "green", marginTop: "10px" }}>Admin Added!</span>}

    </div>
  )
}
