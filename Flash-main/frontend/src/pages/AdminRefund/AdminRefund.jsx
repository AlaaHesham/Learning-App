import { useState, useEffect } from "react"
import Request from "../../components/Request/Request"
import "./AdminRefund.css"
const AdminRefund = () => {
    const [requests, setRequests] = useState([])
    const [isLoading,setIsLoading]=useState(true)

    useEffect(() => {
        const fetchRefundRequests = async () => {
            const response = await fetch('/administrators/refundRequests')
            const json = await response.json()
            console.log("here")
            console.log(json)
            if (response.ok) {
                setRequests(json)
                setIsLoading(false)
            }
        }

        fetchRefundRequests()
    }, [])



    if (isLoading) {
        return <div className="App">Loading...</div>
      }
    return (
        <div className="refund-requests-admin" style={{marginRight:"-35px",overflowY:"auto"}}>
            {requests.map(request => {
                if (request.state === "pending")
                    return (
                        <div key={request}>
                            <Request request={request} />
                        </div>
                    )
            })}
            {requests.length === 0 ? <p  style={{textAlign:"center",fontSize:"20px"}}>Relax, no requests yet!</p> : <></>}
        </div>
    )
}
export default AdminRefund