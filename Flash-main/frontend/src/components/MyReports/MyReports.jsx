import { useEffect,useState } from "react"


const MyReport = ({report})=>{
    //const [isAdmin,setIsAdmin] = useState(null)
    const [color,setColor]=useState("white")
    const goToFollowUps = ()=>{
        window.location.href='/reports/'+report._id+'/followUps'

    }
   
    useEffect(()=>{
        if(report.status=="unresolved"){
            setColor("#FAE0E0")
        }
        if(report.status=="solved"){
            setColor("#D7EEE2")
        }
        if(report.status=="pending"){
            setColor("#FFE5CC")
        }
        const fetchType = async ()=>{
            const response = await fetch ('/login/type')
            const json = await response.json()
    
            console.log(json)
    /*
            if (json == "adminstrator")
                {
                    setIsAdmin(true)
                }
            else{
                setIsAdmin(false)

            }
            */
        }
    
        fetchType()
    
       },[])
    return (
        <div className="course-details" style={{ fontFamily:"sans-serif", height:"150px",backgroundColor:color}}>
            
             <p style={{fontSize:"20px", marginBottom:"-10px"}}> <strong> Complain: </strong>{report.text} </p>
             <p style={{marginBottom:"10px", color:"#c0c0c0"}}>__________________________________________________________________________________________________________________________________________________________________</p>
             <p style={{  fontSize:"15px"}}><strong> Type: </strong>{report.type}</p>
            <p style={{  fontSize:"15px",display:"inline"}}><strong> Status: </strong></p>

            {(report.status==="unresolved") && <p style={{  color:"red",display:"inline", fontSize:"15px"}}><b>{report.status}</b>  {report.status=="unresolved" &&   <img title="Check followups" width="2%" className="fup" src="https://img.icons8.com/windows/512/chat-messages.png" onClick={goToFollowUps}/>}
</p>}
       {(report.status==="unseen") && <p style={{  color:"darkblue",display:"inline", fontSize:"15px"}}><b>{report.status}</b></p>}
       {(report.status==="pending") && <p style={{  color:"#FF8000",display:"inline", fontSize:"15px"}}><b>{report.status}</b></p>}
       {(report.status==="solved") && <p style={{  color:"#009900",display:"inline", fontSize:"15px"}}><b>{report.status}</b></p>}
           


           
            



            

            <br></br>
        </div>
        
    )
   
}

export default MyReport
