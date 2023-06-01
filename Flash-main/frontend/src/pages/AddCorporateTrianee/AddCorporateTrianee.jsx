import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from '../../components/Navbar/Navbar'
import { Link } from "react-router-dom";

export default function AddCorporateTrainee() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [gender, setgender] = useState("");
  const [corporate, setcorporate] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/administrators/addCorporateTrainee", {
        username,
        password,
        email,
        firstName,
        lastName,
        gender,
        corporate
      });
      setDone(true)
      setError(false)
      setUsername('')
      setPassword('')
      setEmail('')
      setfirstName('')
      setlastName('')
      setgender('')
      setcorporate('')
    } catch (err) {
      setError(true);
      setErrorMessage(err.response.data.error)
      setDone(false)
    }
  }

  return (
    <div className='add-admin' style={{ borderRadius: "20px" }}>
      <div className="admin-Title">Add Corporate trainee</div>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className='admin-form-divChild'>
          <label>Username</label>
          <input className="registerInput" type="text" value={username} placeholder="Enter username..." onChange={(e) => setUsername(e.target.value)} />

        </div>
        <br></br><br></br>
        <div className='admin-form-divChild'>

          <label>Password</label>
          <input className="registerInput" type="password" value={password} placeholder="Enter password..." onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br></br><br></br>
        <div className='admin-form-divChild'>
          <label>Email</label>
          <input className="registerInput" type="email" value={email} placeholder="Enter Email..." onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br></br><br></br>
        <div className='admin-form-divChild'>
          <label>First name</label>
          <input className="registerInput" type="text" value={firstName} placeholder="Enter first name..." onChange={(e) => setfirstName(e.target.value)} />
        </div>
        <br></br><br></br>
        <div className='admin-form-divChild'>
          <label>Last name</label>
          <input className="registerInput" type="text" value={lastName} placeholder="Enter last name..." onChange={(e) => setlastName(e.target.value)} />
        </div>

        <br></br><br></br>
        <div className='admin-form-divChild'>
          <label >select gender:</label>
          <select name="gender" id="gender" value={gender} onChange={(e) => setgender(e.target.value)}>
            <option value="none" >Choose a gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>

        <br></br><br></br>
        <div className='admin-form-divChild'>
          <label>Corporate</label>
          <select name="cop" value={corporate} onChange={(e) => setcorporate(e.target.value)}>
            <option value="none" >Choose a corporate</option>
            <option value="WAM">WAM</option>
            <option value="MAW">MAW</option>
          </select>


        </div>
        <br></br><br></br>
        <div className='submit'>
          <button className="btn btn-primary" style={{ backgroundColor: "#fa7465" }} type="submit">Add</button>
        </div>
      </form>
      <br></br>
      {error && <span style={{ color: "red", marginTop: "10px" }}>{errorMessage}</span>}
      {done && <span style={{ color: "green", marginTop: "10px" }}>Corporate Trainee Added!</span>}

    </div>
  )
}
