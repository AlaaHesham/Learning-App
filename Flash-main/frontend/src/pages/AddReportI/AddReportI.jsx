
import React from 'react'
import { useState,useEffect } from 'react';

const AddReportI = ({report})=>{
    const [text, setText] = useState('')
    const [type, setType] = useState('')
    const [error, setError] = useState(null)
    const [userId,setUserId]=useState(null)
   

    useEffect(()=>{
      const fetchID = async ()=>{
          const response = await fetch ('/login/userId')
          const json = await response.json()
  
          //console.log(json.id)
  
          if (response.ok)
          {
              setUserId(json.id)
          }
        }
  
      fetchID()
  },[])

   
    const handleSubmit = async (e)=>{
        e.preventDefault()

        const entry ={text,type}
      
        const response = await fetch("/instructors/"+userId+"/addReports", {
            method: "POST",
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        console.log(entry)
        const json = await response.json()

        if(!response.ok)
        {
            setError(json.error)
        }
        if(response.ok){
           
            console.log('report added!',json)
            window.location.href="/instructor/MyReports"



        }

    }
    
   
    return (
        <div>
       <form className="status" onSubmit={handleSubmit}>
            <label>Complain: </label>       
            <input className="registerInput" type="text" placeholder="What's your complain?" onChange={(e) => setText(e.target.value)} />    
            <p><strong> Type: </strong></p>

            <select  onChange={(e) => setType(e.target.value)}>
            <option  value="none" disbaled>Choose a type</option>
             <option  value="technical">technical</option>
       <option   value="financial">financial</option>
         <option   value="other">other</option>
        </select>
        <button>Add</button>
        {error && <p>{error}</p>}


           </form>


           
        </div>

    )
   
}

export default AddReportI
