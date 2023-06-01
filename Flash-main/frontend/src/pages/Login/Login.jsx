
import React from 'react'
import { useState,useEffect } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
  }
  from 'mdb-react-ui-kit';
  import Overlay from "react-overlay-component";
  import useCollapse from 'react-collapsed';


const Login =()=>{


    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [newPassword,setNewPassword]=useState("")
    const [error,setError] = useState (null)
    const [contract, setContract]=useState(null)
    const [contractState,setContractState]=useState(null) //is contract accepted (by instructor)
    const [isOpen,setIsOpen]=useState(false) //is overlay open (for instructor)
    const [isOpenCTrainee,setIsOpenCTrainee]=useState(false) //is overlay open (for ctrainee)
    const [data,setData]=useState(null) 
    const [agree,setAgree]=useState(false) //is the policy agreed to (by instructor)
    const [firstLogin,setFirstLogin]=useState(null) //is this the first login for a cTrainee
    const [firstLoginError,setFirstLoginError]=useState(null)

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();

    const handleUsernameChange=(event)=>{
        setUsername(event.target.value)
        setError(null)
    }
    const handlePasswordChange=(event)=>{
        setPassword(event.target.value)
        setFirstLoginError(null)
        setError(null)
    }

    const handleNewPasswordChange=(event)=>{
      setNewPassword(event.target.value)
      setError(null)
  }

    const handleLogin =async()=>{

        if(username==="")
        {
            setError("Please enter a username")
        }
        else if(password==="")
        {
            setError("Please enter a password")
        }
        else
        {
            const response =  fetch("/login",
            {
             method:'POST',
             body: JSON.stringify({
                username: username,
                password:password
              }),
            headers:{
                 'Content-Type':'application/json'
             }
             }).
             then((response) => response.json())
             .then((data) => {
              if(!data.id)
                setError(data.msg)
              else{
                //console.log(data);
                setData(data)
                // Handle data
                //window.location.href="/"+data.type+"/"+data.id 
              }
             })
             .catch((err) => {
                console.log(err.message);
             });
        }
    } 

    useEffect(()=>{
      const checkFirstLogin=async()=>{

      if(data.type==="instructor")
      {
        const response = await fetch ('/instructors/getInstructor')
        const json = await response.json()
        if (response.ok){
                setContractState(json.acceptedContract)
                setContract(json.contract)
        }
      }
      else if(data.type==="corporateTrainee")
      {
        const response = await fetch ('/corporateTrainees/getCorporateTrainee')
        const json = await response.json()
        if (response.ok){
                setFirstLogin(json.isFirstLogin)
        }
      }
      else
      {
        window.location.href="/"+data.type+"/"+data.id 
      }
    }
    if(data)
      {
        checkFirstLogin()
      }

    
  },[data])

  useEffect(()=>{
    if(contractState!=null)
    {
      //console.log(contractState)
      if(contractState==false)
        {
          setIsOpen(true)
        }
        else{
          window.location.href="/"+data.type+"/"+data.id 
        }
    }

  },[contractState])

  useEffect(()=>{
    if(firstLogin!=null)
    {
      if(firstLogin==true)
        {
          setIsOpenCTrainee(true)
        }
        else{
          window.location.href="/"+data.type+"/"+data.id 
        }
    }

  },[firstLogin])


    const handleAccept=async()=>{

      if(!agree )
      {
        setFirstLoginError("Plaese accept your contract and our payment policy")
      }
      else if (newPassword==="")
      {
        setFirstLoginError("Please enter a new password")
      }
      else
      {
      const cond = {"acceptedContract": true}
      const response = await fetch('/instructors/updateContract', {
          method: 'PATCH',
          body: JSON.stringify(cond),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      const json = await response.json()

      const response2 = await fetch('/user/reset-password/'+data.id, {
        method: 'PATCH',
        body: JSON.stringify({password:newPassword}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

      if (response.ok && response2.ok) {
          //console.log(response)
          window.location.href="/"+data.type+"/"+data.id 
      }
    }
    }

    const handleAcceptCTrainee=async()=>{
      if(newPassword==="")
      {
        setFirstLoginError("Plaese enter a new password")
      }
      else{
      const response = await fetch('/corporateTrainees/firstLoginDone', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
         
      }
      )
      const json = await response.json()

      const response2 = await fetch('/user/reset-password/'+data.id, {
        method: 'PATCH',
        body: JSON.stringify({password:newPassword}),
        headers: {
            'Content-Type': 'application/json'
        }
    })

      if (response.ok && response2.ok) {
          //console.log(response)
          window.location.href="/"+data.type+"/"+data.id 
      }
    }
  
    }

    const checkboxHandler = () => {
      setFirstLoginError(null)
      setAgree(!agree);
    }


    return (
      <div >
        <MDBContainer fluid >
    
          <MDBRow className='d-flex justify-content-center align-items-center h-100'>
            <MDBCol col='12'>
    
              <MDBCard className=' text-white my-5 mx-auto' style={{backgroundColor:"#647cd2",borderRadius: '1rem', maxWidth: '400px'}}>
                <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
    
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50 mb-5" style={{textAlign:"center"}}>Please enter your username and password!</p>
    
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='formControlLg' size="lg" onChange={handleUsernameChange} value={username}/>
                  <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" onChange={handlePasswordChange} value={password}/>
    
                  <button style={{backgroundColor:"#d55b5c"}} outline className='generalbutton mx-2 px-5' color='white' size='lg' onClick={handleLogin}>
                    Login
                  </button>
                  {error && <p style={{color:"#8B0000"}}>{error}</p>}
    <br></br>
                  <div>
                    <p className="mb-0">Don't have an account? <a href="/signup" class="text-white-50 " >Sign Up</a></p>
    
                  </div>

                  <div>
                    <p className="mb-0"> <a href="/" class="text-white-50 " >Continue as guest</a></p>
                  </div>
                  <div>
                    <p className="mb-0"> <a href="/user/write-email" class="text-white-50 " >Forgot password ?</a></p>
                  </div>
                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>

        <Overlay  isOpen={isOpen} closeOverlay={()=>{setIsOpen(false)}}>
                <h2>Welcome, this is your first time here!</h2>
                <div className="collapsible">
                      <div className="header" {...getToggleProps()}>
                      <input type="checkbox" id="agree" onChange={checkboxHandler} />
                         <label forhtml="agree"> I agree to the <b  style={{cursor:"pointer"}}>payment policy</b></label>
                      </div>
                      <div {...getCollapseProps()}>
                          <div className="content">
                          After registering for a course, if the student wants to withdraw himself/herself from 
                          the admission procedure the refunds to credit cards may take up to 5 business days.
                          No refund will be granted after progress in the course exceeds 50%
                           </div>
                       </div>
                    </div><br></br><br></br>
                    <div>
                      <h4>Contract:</h4>
                <p>{contract}</p>
                </div>
                <text>Please enter your new password</text>
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" style={{width:"450px",marginLeft:"-50px"}} onChange={handleNewPasswordChange} value={newPassword}/>
                <button style={{backgroundColor:"#212486",color:"white",marginLeft:"350px"}} onClick={handleAccept} >
                    Accept contract
                </button>
                {firstLoginError && <p style={{color:"red"}}>{firstLoginError}</p>}
            </Overlay>

            <Overlay  isOpen={isOpenCTrainee} closeOverlay={()=>{setIsOpenCTrainee(false)}}>
                <h2>Welcome, this is your first time here!</h2>
                <text>Please enter your new password</text>
                <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='formControlLg' type='password' size="lg" style={{width:"450px",marginLeft:"-50px"}} onChange={handleNewPasswordChange} value={newPassword}/>
                <button style={{backgroundColor:"#212486",color:"white",marginLeft:"350px"}} onClick={handleAcceptCTrainee} >
                    Change password
                </button>
                {firstLoginError && <p style={{color:"red"}}>{firstLoginError}</p>}
            </Overlay>
        </div>

      );

}

export default Login