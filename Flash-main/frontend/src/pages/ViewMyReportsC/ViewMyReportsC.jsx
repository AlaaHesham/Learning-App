import MyReports from "../../components/MyReports/MyReports"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from '../../components/Popup/Popup';


const ViewMyReportsC = ()=>{
 
    const [reports,setReports]= useState(null)
    const params = useParams();
  //  const userID = params.id
  const [userId,setUserId]=useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('')
  const [type, setType] = useState('')
  const [error, setError] = useState(null)
 
  const togglePopup = () => {
    setIsOpen(!isOpen);
  }



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

  const response = await fetch("/corporateTrainees/"+userId+"/addReports", {
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
      window.location.href="/corporateTrainee/MyReports"



  }

}

    
    useEffect(()=>{
    
        const fetchReports = async ()=>{
            const response = await fetch ('/corporateTrainees/'+userId+'/reports')
            const json = await response.json()

            console.log(json)

            if (response.ok)
            {
                setReports(json)
            }
          }

          if(userId)
            fetchReports()
    },[userId])

    return(
      
        <div className="all-reports" style={{minHeight:"70vh"}}>
                      <button  onClick={togglePopup} className="reportbtn" style={{ fontSize:"20px",marginLeft:"1150px"}}>Report An Issue</button>
                    
             <div className="reports">
            {reports && reports.map(report => (
              <MyReports key={report._id}  report={report}></MyReports>
            ))}
          </div>

          {reports && reports.length===0 &&
          <>
          <h2>Your reports will appear here!</h2>
            <img width= '70%' height="60%" style={{ marginLeft: '250px'}} src="https://i0.wp.com/dancebusinessweekly.com/wp-content/uploads/2021/04/GettyImages-1253922154-scaled.jpg?resize=1024%2C683&ssl=1"></img>
            </>
          }
          
    {isOpen && <Popup 
      content={<>
          <form style={{color:"#606060",fontFamily:"sansserif"}} onSubmit={handleSubmit} >
          <p style={{marginBottom:"5px"}}>Type:</p>

<select  onChange={(e) => setType(e.target.value)} className="reportselect">
<option  value="none" disbaled>Choose a type</option>
 <option  value="technical">technical</option>
<option   value="financial">financial</option>
<option   value="other">other</option>
</select>
<br></br>
<br></br>
            <label style={{ margingLeft:"100px"}}>Issue: </label>    <br></br>   
            <input  className="reporttext" type="text"  onChange={(e) => setText(e.target.value)} />    
            
        <br></br>
        <button style={{marginTop:"10px", marginLeft:"510px",fontsize:"80px",backgroundColor:"#d55b5c"}} className="yaybtn" >Add</button>
        {error && <p>{error}</p>}


           </form>

      </>}
      handleClose={togglePopup}
    />}
        </div>
    )

}

export default ViewMyReportsC