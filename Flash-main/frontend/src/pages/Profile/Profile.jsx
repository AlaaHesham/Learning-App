import React from 'react';
import {useState,useEffect} from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { Paper, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import Overlay from "react-overlay-component";
import './Profile.scss'
import {BiEditAlt} from "react-icons/bi"
import {MdOutlineDoneOutline} from 'react-icons/md';
import {BsFillWalletFill} from 'react-icons/bs';
import Cookie from 'js-cookie'

export default function ProfilePage() {

    const [user,setUser]=useState(null)
    const [role,setRole]=useState(null)
    const [isLoading, setLoading] = useState(true);
    const [isPasswordOpen, setIsPasswordOpen] = useState(false);
    const [oldPassword,setOldPassword]=useState("")
    const [newPasswordFirst,setNewPasswordFirst]=useState("")
    const [newPasswordSecond,setNewPasswordSecond]=useState("")
    const [newPasswordError,setNewPasswordError]=useState(null)
    const [error,setError]=useState(null)
    const [success, setSuccess] = useState(false)
    const [message,setMessage]=useState(null)
    const [isEditingEmail,setIsEditingEmail]=useState(false)
    const [isEditingBiography,setIsEditingBiography]=useState(false)
    const [email,setEmail]=useState("")
    const [miniBiography,setMiniBiography]=useState("")
    const [errorNew,setErrorNew]=useState(null)
    const [currency,setCurrency]=useState(null)
    const [adjustedWallet,setAdjustedWallet]=useState(null)

    

    useEffect(()=>{
        setRole(Cookie.get('role'))
        const fetchUser = async ()=>{
            
            const response = await fetch ('/user/userInfo')
            const json = await response.json()
    
            console.log(json)
    
            if (response.ok)
                {
                    setUser(json)
                    console.log("response: ",json)
                    setLoading(false);
                }
        }
        fetchUser();
    },[])

    useEffect(()=>{

        if(newPasswordFirst!==newPasswordSecond)
            setNewPasswordError("Passwords do not match")
        else
            setNewPasswordError(null)
    },[newPasswordSecond])

    useEffect(()=>{
      if(user)
      {
        setEmail(user.email)
        setMiniBiography(user.miniBiography)
        if(role==="instructor" || role==="corporateTrainee"){
        fetchCurrency()
        }
      }
    },[user])

    useEffect(()=>{
      if(currency)
      {
        getAdjustedPrice();
      }
    },[currency])

    const handlePasswordChange=async(e)=>{

      if(newPasswordError!==null || oldPassword==="" || newPasswordFirst==="" || newPasswordSecond==="")
        {
          e.preventDefault()
          setErrorNew("Please fill all fields")
        }
      else{
        e.preventDefault()
        if(newPasswordError===null)
        {
            const response =await fetch('user/changePassword', {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                 oldPassword:oldPassword,
                 newPassword:newPasswordFirst
                }),
              })
                .then((res) => res.json())
                .then((res) => {setMessage(res)})

                setOldPassword("")
                setNewPasswordFirst("")
                setNewPasswordSecond("")
    
        }
      }
    }
    const fetchCurrency = async () => {
      const response = await fetch('/login/currency')
      const json = await response.json()


      if (response.ok) {
          setCurrency(json)
      }
  }

  const getAdjustedPrice = async () => {

    const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=da8698baa20640669fb02c79f6afb3e0')
    const json = await response.json()//returns a json object with an array of all exchange rates with USD as base

    const rate = json.rates[currency]
    if (response.ok) {
        setAdjustedWallet( user.wallet/rate)

    }
}
    const handleEmailAndBioChange=async()=>{
      const entry = { email, miniBiography }
        const response = await fetch('/instructors/'+user._id+'/editInfo', {
            method: 'PATCH',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setSuccess(true)
            setError('')
            setIsEditingEmail(false)
            setIsEditingBiography(false)
        }
    }

    if (isLoading) {
        return <div className="App">Loading...</div>;
      }
  return (
<div style={{minHeight:"100vh"}}>
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='/'>Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px' }}
                  fluid />
                <p className="text-muted mb-1">{user.username}</p>
                <p className="text-muted mb-1">{role}</p>
                <p className="text-muted mb-4">{user.country}</p>
                <div className="d-flex justify-content-center mb-2">
                  {/*<MDBBtn>Follow</MDBBtn>*/}
                  <Button style={{background:'#212486',color:"white",marginBottom:"10px"}}
                  outline className="ms-1" onClick={()=>{setIsPasswordOpen(true)}}>Change Password</Button>
                </div>
              </MDBCardBody>
            </MDBCard>

            <Overlay clickDismiss={true} className="change-password-profile" isOpen={isPasswordOpen} closeOverlay={()=>{setIsPasswordOpen(false)}}>
            <div className="change-password-profile" style={{ textAlign: 'center' }}>
          <h3 className="title" >Change Password</h3>
          <Paper elevation={6} >
            <form onSubmit={handlePasswordChange} noValidate autoComplete="off">

              <label >
                <span >Current password *</span>
                <TextField
                  onChange={(e) => {setOldPassword( e.target.value);setErrorNew(null)}}
                  type='password'
                  value={ oldPassword }
                  placeholder='Enter current password'
                  variant="outlined"
                  style={{width:"400px"}}
                  margin="normal"
                  autoComplete='new-password'
                />
              </label>
              <label >
                <span style={{marginLeft:"10px"}}>New password *</span>
                <TextField
                  onChange={(e) => {
                    setNewPasswordFirst(e.target.value);setErrorNew(null)
                  }}
                  type='password'
                  value={ newPasswordFirst }
                  placeholder='Enter new password'
                  variant="outlined"
                  style={{width:"400px"}}
                  margin="normal"
                  autoComplete='new-password'
                />
              </label>
              <label >
                <span >Repeat new password *</span>
                <TextField
                  onChange={(e) => {
                    setNewPasswordSecond( e.target.value);setErrorNew(null)
                  }}
                  type='password'
                  value={ newPasswordSecond }
                  placeholder='Repeat new password'
                  variant="outlined"
                  style={{width:"400px"}}
                  margin="normal"
                  autoComplete='new-password'
                  error={newPasswordError}
                />
              </label>
              { newPasswordError && <p>{newPasswordError}</p> }
              { errorNew && <p style={{color:"red"}}>{errorNew}</p> }
              <Button
                type="submit"
                variant="contained"
                style={{background:'#212486',color:"white",marginBottom:"10px"}}
                onClick={handlePasswordChange}

              > <SendIcon /> Change Password</Button>
               { message && <p>{message}</p> }
            </form>
          </Paper>
        </div>
            </Overlay>

          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>First Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.firstName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Last Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.lastName}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    {role==="instructor" && !isEditingEmail &&
                    <MDBCardText className="text-muted">{email}<BiEditAlt class="opacity_img" onClick={(e)=>{setIsEditingEmail(true)}} style={{marginLeft:"250px",width:"25px",height:"25px"}}/></MDBCardText>}
                          
                    {role==="instructor" && isEditingEmail &&
                     <p style={{ display: "flex"}}><input type="email" id="typeEmail" class="form-control" style={{aligncontent: "flex-start",width:"540px"}} value={email} onChange={(e)=>{setEmail(e.target.value)}} /><MdOutlineDoneOutline class="opacity_img" style={{aligncontent: "flex-end",marginTop:"10px"}} onClick={handleEmailAndBioChange} /></p>}
                   
                   {role!=="instructor" &&
                    <MDBCardText className="text-muted">{email}</MDBCardText>}
                  
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Gender</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{user.gender}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
               {(role==="individualTrainee") &&<>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Wallet Credit</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{adjustedWallet}{currency}<BsFillWalletFill style={{marginLeft:"10px"}}></BsFillWalletFill></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                </>
                  }
                   {(role==="instructor" || role==="individualTrainee") &&<>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Monthly income</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{adjustedWallet}{currency}<BsFillWalletFill style={{marginLeft:"10px"}}></BsFillWalletFill></MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                </>
                  }
                {role==="instructor" && !isEditingBiography &&<>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Biography</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">{miniBiography}<BiEditAlt class="opacity_img" onClick={(e)=>{setIsEditingBiography(true)}} style={{width:"25px",height:"25px",marginLeft:"400px"}}/></MDBCardText>
                  </MDBCol>
                </MDBRow>
                 <hr /></>
                 }

                {role==="instructor" && isEditingBiography &&<>
                   <MDBRow>
                   <MDBCol sm="3">
                     <MDBCardText>Biography</MDBCardText>
                   </MDBCol>
                   <MDBCol sm="9">
                   <p style={{ display: "flex"}} ><input type="text" id="typeEmail" class="form-control" style={{aligncontent: "flex-start",width:"540px"}} value={miniBiography} onChange={(e)=>{setMiniBiography(e.target.value)}} /><MdOutlineDoneOutline class="opacity_img" style={{aligncontent: "flex-end",marginTop:"10px"}} onClick={handleEmailAndBioChange} /></p>
                  </MDBCol>
                 </MDBRow>
                  <hr /></>
                  }
              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    </div>
  );
}