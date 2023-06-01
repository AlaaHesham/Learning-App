import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const Request = (props) => {
    const [courseTitle, setCourseTitle] = useState("")
    const [courseSubject, setCourseSubject] = useState("")
    const [traineeName, setTraineeName] = useState("")
    const [traineeEmail, setTraineeEmail] = useState("")
    const [type, setType] = useState("")
    const [error, setError] = useState(null)
    const [message, setMessage] = useState(null)
    const params = useParams();
    const id = params.id
    useEffect(() => {
        const fetchType = async () => {
            const response = await fetch('/login/type')
            const json = await response.json()

            console.log("here"+json)

            if (response.ok) {
                setType(json)
            }

        }

        fetchType()

    }, [])
    useEffect(() => {
        const fetchCourse = async () => {
            const response = await fetch("/courses/" + props.request.courseId)
            const json = await response.json()

            console.log(json)

            if (response.ok) {
                setCourseTitle(json.title)
                setCourseSubject(json.subject)
            }

        }

        fetchCourse()

    }, [])

    useEffect(() => {
        const fetchIndividualTrainee = async () => {
            const response = await fetch("/individualTrainees/" + props.request.userId)
            const json = await response.json()

            console.log(json)

            if (response.ok) {
                setTraineeName(json.firstName + " " + json.lastName)
                setTraineeEmail(json.email)

            }

        }

        fetchIndividualTrainee()

    }, [])

    const handleReject = async () => {
        const _id = props.request._id
        const userId = props.request.userId
        const courseId = props.request.courseId
        const entry = { _id, userId, courseId }

        const response = await fetch("/administrators/" + id + "/rejectRefund", {
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
            setMessage("Refund Request Rejected.")
            setError(null)
        }
    }
    const handleAccept = async () => {
        const _id = props.request._id
        const userId = props.request.userId
        const courseId = props.request.courseId
        const entry = { _id, userId, courseId }

        const response = await fetch("/administrators/" + id + "/acceptRefund", {
            method: 'PATCH',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        console.log(json)
        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setMessage("Refund Request Accepted!")
            setError(null)
        }
    }
    console.log(type + "again")
    return (
        <>
         {(type !== "administrator" ) &&<div className="course-details" style={{ background: "#f4939511",width:"60vw",height:"30vh" }} >
            <div >
                <div >
                    <p style={{fontSize:"18px"}}><b>Course Title: </b>{courseTitle}</p>
                </div><br></br>
                <div >
                <p style={{fontSize:"18px"}}><b>Course Subject: </b>{courseSubject}</p>
                </div><br />
                <div >
                <p style={{fontSize:"18px"}}><b>Progress:</b> {props.request.progress} %</p>
                </div><br />
                <div >
                <p style={{fontSize:"18px"}}><b>State:</b> {props.request.state}</p>
                </div><br />
            </div>
</div>  }     
{type === "administrator" && props.request.state == "pending" &&<div className="request-container" style={{ background: "#f4939511 " }} hidden={message}>


           <div>
            <div className="request-labels">
                    <label >Course Title:</label>
                    <span> {courseTitle}</span>
                </div><br />
                <div className="request-labels">
                    <label >Course Subject:</label>
                    <span> {courseSubject}</span>
                </div><br />
                <div className="request-labels">
                    <label >Progress: </label>
                    <span>{props.request.progress} %</span>
                </div><br />
                <div className="request-labels">
                    <label >State: </label>
                    <span>{props.request.state}</span>
                </div><br />
                <div className="request-labels">
                    <label >Trainee Name: </label>
                    <span>{traineeName}</span>
                </div><br />
                <div className="request-labels">
                    <label >Trainee Email: </label>
                    <span>{traineeEmail}</span>
                </div><br />
                {!message && <button style={{marginLeft:"60%",width:"80px"}} className="yaybtn" onClick={handleAccept}>Accept</button>}
                {!message && <button style={{marginLeft:"10px",backgroundColor:"red",width:"80px"}} className="yaybtn" onClick={handleReject}>Reject</button>}
                <br />
                {error && <span className="create-course-error">{error}</span>}
                {message && <span style={{color:"green"}} >{message}</span>}
            </div>
        </div>}
        </>
    )
}

export default Request