import React from 'react'
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
import axios from 'axios'
import { useState } from 'react';


export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [done, setDone] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("/user/write-email", {
        email
      });
      setDone(true)
    } catch (err) {
      setError(true);
      setErrorMessage(err.response.data.error)
    }
    console.log({email})
}
  return (
    <body >
    <div >
    <MDBContainer fluid >
    
    <MDBRow className='d-flex justify-content-center align-items-center h-100'>
      <MDBCol col='12'>

        <MDBCard className=' text-white my-5 mx-auto' style={{backgroundColor:"#d55b5c",borderRadius: '1rem',borderColor:"#0b0754",borderWidth:"3px", maxWidth: '400px'}}>
          <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
<img width="25%" src="data:image/png;base64,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"/>
<h2 className="fw-bold mb-2 text-uppercase" style={{textAlign:"center"}}>Forgot your password?</h2>
            <h7 className="text-white" style={{textAlign:"center"}}>No need to worry!</h7>

            <p className="text-white-50" style={{textAlign:"center"}}>Please enter the email address associated with your account.</p>

            <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' placeholder='your@email.com' label='Email' id='formControlLg' size="lg" onChange={(e) => setEmail(e.target.value)} value={email}/>

            <button outline className='generalbutton mx-2 px-5' color='white' size='lg' onClick={handleSubmit}>
              Reset my password
            </button>
            {done && <p style={{color:"#66cc00",textAlign:"center",marginBottom:"-10px"}}>A link has been sent to your email to change your password.</p>}

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
 </body>
  )
 
}
