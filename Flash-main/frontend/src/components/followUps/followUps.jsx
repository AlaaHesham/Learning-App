import { useEffect,useState } from "react"
import { useParams } from "react-router-dom";

import Cookie from 'js-cookie'
const Fdetails =  ({followup})=>{
    const [answer, setAnswer] = useState('')
    const [error, setError] = useState(null)
    const {id} = useParams();
    
    const [Name,setName] = useState(null)

    const [isAdmin,setIsAdmin] = useState(null)
    const [reply, setReply] = useState(false)

    
    const addReply = (e)=>{
        e.preventDefault()
        setReply(!reply)
    }
   
    useEffect(()=>{
        const fetchName = async ()=>{
            const rid = await fetch ('/reports/'+id+'/reporter')
            const jsonr = await rid.json()
            const responseI = await fetch ('/instructors/'+jsonr[0].reporter+'/getName')
            const jsonI = await responseI.json()
            console.log("r "+jsonr[0].reporter)

            const responseIT = await fetch ('/individualTrainees/'+jsonr[0].reporter+'/getName')
            const jsonIT = await responseIT.json()
            console.log("it "+jsonIT)

            const responseC = await fetch ('/corporateTrainees/'+jsonr[0].reporter+'/getName')
            const jsonC = await responseC.json()
            console.log("c "+jsonC)

            if (jsonI!=null)
            {
                setName(jsonI.username)

            }
            if (jsonIT!=null)
            {
                setName(jsonIT.username)

            } if (jsonC!=null)
            {
                setName(jsonC.username)

            }
          }

    
        let role=Cookie.get('role')
        console.log(role)
            if (role == "administrator")
                {
                    setIsAdmin(true)
                }
            else{
                setIsAdmin(false)

            }
            fetchName()

       
       },[])

       const handleSubmit = async (e)=>{
        e.preventDefault()

        const entry ={answer}
      
        const response = await fetch("/reports/"+id+"/followUp/"+followup._id, {
            method: "PATCH",
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
           
            console.log('answer added!',json)
            window.location.reload();


        }

    }
    console.log("name "+Name)

    return (
        <div >
            <br></br>
            <div className="column half" style={{fontSize:"20px"}}>
            {!isAdmin  &&  <div style={{color:"grey",fontSize:"12px"}}>You:</div>}
            {!isAdmin&& <p className="msg"  >{followup.question}</p>}
            </div>
            
            <div className="column last" style={{fontSize:"20px"}}>
            {!isAdmin  && followup.answer!=="" && <div style={{color:"#d60c199e",fontSize:"12px"}}>Admin:</div>}
            {!isAdmin  && followup.answer!=="" && <p  className="msg1" >{followup.answer}</p>}
            </div>
           
            <div className="column half" style={{fontSize:"20px"}}>
            {isAdmin  && <div style={{color:"#d60c199e",fontSize:"12px"}}>{Name}:</div>}
            {isAdmin&& <p className="msg1"  >{followup.question}</p>}
            { isAdmin && (followup.answer=='')&&<img className="fup" src="https://img.icons8.com/ios/512/left2.png" style={{display:"inline"}} width="1.5%" onClick={addReply}/>}
            
</div>


          
           <form className="status" onSubmit={handleSubmit} >
           
           { reply&&  <input style={{borderRadius:"9px"}} type="text" placeholder="Answer doubt" onChange={(e) => setAnswer(e.target.value)} />  }  
           { reply&& <button className="sendbtn">Send</button>}
           </form>
           {error && <p>{error}</p>}
           <div className="column last" style={{fontSize:"20px"}}>
           {isAdmin && (followup.answer!='')&& <div style={{color:"grey",fontSize:"12px"}}>You:</div>}

           {isAdmin && (followup.answer!='')&& <p className="msg">{followup.answer}</p>}
           </div>

            

            <br></br>
        </div>
    )
   
}

export default Fdetails
