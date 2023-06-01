import { useEffect,useState } from "react"
import { useParams } from "react-router-dom";



const AddFollowUp = ()=>{
    const [question, setQuestion] = useState('')
    const [error, setError] = useState(null)
    const {id} = useParams();

   
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
    
   
    return (
        
        <div className="course-details">
            <form className="status" onSubmit={handleSubmit}>
            <label>Question : </label>       
            <input className="registerInput" type="text" placeholder="What's your question?" onChange={(e) => setQuestion(e.target.value)} />    
           
        <button>Add</button>
        {error && <p>{error}</p>}


           </form>



            

            <br></br>
        </div>
        
    )
   
}

export default AddFollowUp
