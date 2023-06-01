import React from 'react'
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from'axios'
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon
}from 'mdb-react-ui-kit';

export default function ChangePassword() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [done, setDone] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const path = location.pathname.split("/")[2];
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError(false);
      try {
        const res = await axios.patch("/user/reset-password/"+path, {
          password
        });
        setDone(true)
      } catch (err) {
        setError(true);
        setErrorMessage(err.response.data.error)
      }
  }
    return (
      <div className='forgot'>
      <MDBContainer fluid >
    
    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>

        <MDBCard className=' text-white my-5 mx-auto' style={{backgroundColor:"#d55b5c",borderRadius: '1rem',borderColor:"#0b0754",borderWidth:"3px", maxWidth: '400px'}}>
          <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
          <img width="25%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAACOUlEQVR4nO2XSWtUQRDHyxm9aK6PvKquHg9uHyDqBxDEJbmOaA5u6AcQb4o88qpmrq4XLxKvLhfBBcG4fQUjhhzMR5F+yzgQZzIJaPdz+gcNw1Bd9P9V19IAkcjfhUlfMulGs5a8+JOQjSYuiELIfxQ4RoT8f3mOEaH/LCIW9cn+JEs7HUVGXQ7NDiYV4hzVNoXTwOxg6oQw6rJzVDqTp6HZQezsFNaCGBHyHwWOESH/X56nMSLPfR+Kt7tQn20SEolE/g1zc4/3dKi/YEgeMsoKk34vFuoHJr1nUj0DkO2u7V3CMsorCAljdJ5Jv25dbWTFGDnh9owso37otpn0ztBhX1uSS8z9g4jZ3iTJZojyI4x6jUneVzY/rendCEoI1yJQ1iz1zgHArtHW3bZBuW5Q1sc2Nk/XyTWnHzbVo5Pus7h0clgM+E5srnKiisRYxk0P4JMO9RfqnADIWo0VYjB/5A5hjF6EJsOkH4trZeUANBkmXXVCZmdv7oNpF5Ik2UyVJ9/A99VyjW+nPozJD9XdHnxhSB+UpVcv79QHk14tIyJ3wX/5lTeTlN/NZC1D8q6qfPPguSF+KcXk57e7nzFfLESQfnK+wCduLK/nLE6Xjk26j1mPF3vK8eYUhIAlvT0Qg3Jh/DXLWoy9xVqENXILwqHbHogpr8pbJrlC1D/sxnhXnt1v91+dE79FdNsQGpzKaUv6eauHlcuJYK7TKFzSlqO93K+et65prg6euiY/O/zUjUQgbH4BnPl4Ay2Pwz4AAAAASUVORK5CYII="/>
          <h2 className="fw-bold mb-2 text-uppercase" style={{textAlign:"center"}}>Change your password</h2>
           
           <p className="text-white-50" style={{textAlign:"center"}}>Please enter your new password.</p>

           <MDBInput wrapperClass='mb-4 mx-5 w-100' label='New Password' labelClass='text-white' placeholder='New Password' passwordid='formControlLg' size="lg" onChange={(e) => setPassword(e.target.value)} value={password}/>

           <button outline className='generalbutton mx-2 px-5' color='white' size='lg' onClick={handleSubmit}>
             Change my password
           </button>
           {done && <p style={{color:"#66cc00",textAlign:"center",marginBottom:"-10px",marginTop:"5px"}}>Password updated!</p>}

{error && <p style={{color:"#66cc00",textAlign:"center",marginBottom:"-10px"}}>{error}</p>}
<br></br>
           

           <div>
             <p className="mb-0"> <a href="/login" class="text-white-50 " >Go back to login</a></p>
           </div>
          
          </MDBCardBody>
        </MDBCard>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
  
      </div>
    )
}
