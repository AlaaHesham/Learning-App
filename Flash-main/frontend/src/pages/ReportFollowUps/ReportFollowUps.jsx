import Fdetails from '../../components/followUps/followUps'

import { useEffect,useState } from "react"
import { useParams } from "react-router-dom";
import Popup from '../../components/Popup/Popup';
import Cookie from 'js-cookie'
import {MdOutlineArrowBack} from "react-icons/md";
import { useNavigate} from 'react-router-dom';



const ReportFollowUps =() =>  {
    const [reports , setReports] = useState(null)
    const [followups , setFollowups] = useState(null)
    const [isAdmin,setIsAdmin] = useState(null)
    const [question, setQuestion] = useState('')
    const [error, setError] = useState(null)
    const {id} = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [isLoading,setIsLoading]=useState(true)
    const [role,setRole]=useState(null)

    
  const navigate = useNavigate();

    const togglePopup = () => {
        setIsOpen(!isOpen);
      }
   
    const handleSubmit = async (e)=>{
        e.preventDefault()

        const entry ={question}
      
        const response = await fetch("/reports/"+id+"/followUp", {
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
           
            console.log('followup added!',json)
            window.location.href='/reports/'+id+'/followUps'
        }

    }
    useEffect(()=>{

        if (isInitialRender) {
            setRole(Cookie.get('role'))
            fetchFollowUps()
            setIsInitialRender(false);
            setIsLoading(false)
    }
       },[])

       useEffect(()=>{
        if (role) {
        
            if(role==="administrator")
            {
                setIsAdmin(true)
            }
            else{
                setIsAdmin(false)
            }
    }
       },[role])


    const fetchFollowUps = async ()=>{
        const response = await fetch ('/reports/'+id+'/followUp')
        const json = await response.json()

        console.log(json)

        if (response.ok)
        {
            setReports(json)
        }
      }

      useEffect(()=>{
        if(reports)
        {
            setFollowups(reports[0].followUps)
            console.log(reports[0].followUps)
        }
      },[reports])

      const handleNavigate=()=>{
        if(role==="corporateTrainee")
            window.location.href="/corporateTrainee/MyReports"
        else if (role==="individualTrainee")
            window.location.href="/individualTrainee/MyReports"
        else if (role==="instructor")
            window.location.href="/instructor/MyReports"
        else if (role==="administrator")
             window.location.href="/reports"
      }

    console.log({followups})

    if (isLoading) {
        return <div className="App">Loading...</div>;
      }
    return (
       <> <MdOutlineArrowBack class="opacity_img" style={{width:"50px",height:"50px",color:"#d55b5c"}} onClick={handleNavigate}></MdOutlineArrowBack>

        <div style={{minHeight:"100vh"}}>
                              {!isAdmin  && <button style={{marginLeft:"1150px"}} className="btn" onClick={togglePopup}> + follow up</button>}
                              <div><img className="fimg" src="https://www1.intouchlink.com/wp-content/uploads/2021/03/Service-Request-Manager-2048x1240.png"></img></div>

                        <div >
            {followups && followups.map(followup => (
              <Fdetails key={followup._id}  followup={followup}></Fdetails>
            ))}
             {!followups && <h2>No follow ups yet!</h2>}
          </div>
                        <br></br>
                        {isOpen && <Popup 
      content={<>
                    <div style={{fontSize:"20px",color:"#606060",marginLeft:"-150px"}} >New follow up</div>
 <form style={{color:"#606060",fontFamily:"sansserif"}} onSubmit={handleSubmit} >
                <label>Question : </label>       
                <br></br>
            <input className="reporttext1"  type="text" onChange={(e) => setQuestion(e.target.value)} />    
           <br></br>
           <br></br>
            <button style={{ marginLeft:"510px",fontsize:"80px",backgroundColor:"#d55b5c"}} className="yaybtn" >Add</button>
        {error && <p>{error}</p>}


           </form>

      </>}
      handleClose={togglePopup}
    />}
        </div>
        </>
      )
    
}

export default ReportFollowUps
