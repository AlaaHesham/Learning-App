import { useEffect,useState } from "react"
import Cookie from 'js-cookie'

const AccessDenied =()=>{
    const [userId,setUserId]=useState(null)
   
  
    const fetchID = async () => {
        const response = await fetch('/login/userId')
        const json = await response.json()
    
        //console.log(json.id)
    
        if (response.ok) {
            setUserId(json.id)
        }
    }
    fetchID()

    let role=Cookie.get('role')

   
    const handleClick=()=>{
        if (role === "instructor" ){
        window.location.href="/instructor/"+userId
        }
        if (role === "individualTrainee" ){
            window.location.href="/individualTrainee/"+userId
            }
         if (role === "corporateTrainee" ){
        window.location.href="/corporateTrainee/"+userId
        }
        if (role === "administrator" ){
            window.location.href="/administrator/"+userId
            }   
        if (role === undefined ){
            window.location.href="/"
            }             
    }

    return (

       
        <div style={{textAlign:"center"}}>
            <h2>403</h2>
            <h2>AccessDenied</h2>
            <p>Sorry, but you dont have permission to access this page</p>

           <p> <button  style={{backgroundColor:"#d55b5c"}} className="generalbutton" onClick={ handleClick }>Return to Home Page</button></p>
            <img width="50%" className="policeimg" src="https://www.freevector.com/uploads/vector/preview/29478/Police_officer_vector_4.jpg"/>
        </div>
    )
}

export default AccessDenied