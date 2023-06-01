import { useParams } from "react-router-dom";
import { useState } from "react"

const requestRefund = ()=>{
    const [error,setError]= useState(null)
    const [success,setSuccess]= useState(null)

    const params = useParams();
    const id = params.id
    const courseId = params.courseId

    const handleRequest =async()=>{
        const entry = { courseId}
        const response = await fetch('/requestRefund/'+id, {
            method: 'POST',
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
            setError(null)
            setSuccess(true)
        }
    }
    return(
        <div>
            <button onClick={handleRequest}>Request Refund</button>
            {error&& <p>{error}</p>}
            {success&& <p>Request sent successfully</p>}
        </div>

    )
}
export default requestRefund