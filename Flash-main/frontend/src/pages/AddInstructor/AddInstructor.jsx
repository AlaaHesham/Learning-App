import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import "./AddInstructor.css"
export default function AddInstructor() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  // const [miniBiography, setMiniBiography] = useState("");
  const [gender, setgender] = useState("");
  // const [contract, setContract] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");




  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/administrators/addInstructor", {
        username,
        password,
        email,
        firstName,
        lastName,
        gender
      });
      setDone(true)
      setError(false)
      setUsername('')
      setPassword('')
      setEmail('')
      setfirstName('')
      setlastName('')
      setgender('')

    } catch (err) {
      setError(true);
      setDone(false)
      setErrorMessage(err.response.data.error)
    }
  }

  return (
    <div className='add-admin' style={{ borderRadius: "20px", height: "30%", width: "750px", marginLeft: " 100px" }}>

      <div className="admin-Title">Add Instructor</div>
      <form className="admin-form" style={{ marginLeft: " 130px" }} onSubmit={handleSubmit}>
        <div className='admin-form-divChild'>

          <label>Username</label>

          <input className="registerInput" type="text" value={username} placeholder="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <br />

        <div className='admin-form-divChild'>

          <label>Password</label>

          <input className="registerInput" type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <br />


        <div className='admin-form-divChild'>

          <label>Email</label>

          <input className="registerInput" type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br />


        <div className='admin-form-divChild'>

          <label>First name</label>

          <input className="registerInput" type="text" value={firstName} placeholder="First name" onChange={(e) => setfirstName(e.target.value)} />
        </div>
        <br />
        <div className='admin-form-divChild'>

          <label>Last name</label>

          <input className="registerInput" type="text" value={lastName} placeholder="Last name" onChange={(e) => setlastName(e.target.value)} />
        </div>
        <br />

        {/* <div className='admin-form-divChild'>

          <label>Mini Biography</label>

          <textarea className="registerInput2" type="text" value={miniBiography} placeholder="Minibiography" onChange={(e) => setMiniBiography(e.target.value)} />
        </div>
  <br />*/}

        <div className='admin-form-divChild'>

          <label >select gender:</label>

          <select name="gender" value={gender} id="gender" onChange={(e) => setgender(e.target.value)}>
            <option value="none" >Choose a gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
          </select>
        </div>
        <br />
        {/*<div className='admin-form-divChild'>

          <label>Contract</label>
          <textarea className="registerInput2" type="text" value={contract} placeholder="Enter contract..." onChange={(e) => setContract(e.target.value)} />
        </div>
<br />*/}

        <div className='submit'>
          <button className="btn btn-primary" style={{ backgroundColor: "#fa7465" }} type="submit">Add</button>
        </div>
      </form>
      {error && <span style={{ color: "red", marginTop: "10px" }}>{errorMessage}</span>}
      {done && <span style={{ color: "green", marginTop: "10px" }}>Instructor Added!</span>}

    </div>
  )
}
