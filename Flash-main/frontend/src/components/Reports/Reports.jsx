import { border } from "@mui/system"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";



const Report = ({ report }) => {
    const goToFollowUps = () => {
        window.location.href = '/reports/' + report._id + '/followUps'

    }

    const [isAdmin, setIsAdmin] = useState(null)
    const [status, setStatus] = useState(report.status)
    const [update, setUpdate] = useState(false)
    const [color, setColor] = useState("white")
    const [Name, setName] = useState(null)
    const [id, setID] = useState(report._id);



    const uclick = () => {
        setUpdate(true)
    }
    const updateStatus = (e) => {
        e.preventDefault()
    }
    console.log("r" + report._id)
    useEffect(() => {
        const fetchName = async ()=>{
            const rid = await fetch ('/reports/'+report._id+'/reporter')
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

        if (report.status == "unresolved") {
            setColor("#FAE0E0")
        }
        if (report.status == "solved") {
            setColor("#D7EEE2")
        }
        if (report.status == "pending") {
            setColor("#FFE5CC")
        }
        const fetchType = async () => {
            const response = await fetch('/login/type')
            const json = await response.json()

            console.log(json)

            if (json == "adminstrator") {
                setIsAdmin(true)
            }
            else {
                setIsAdmin(false)

            }
        }

        fetchType()
        fetchName()

    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault()

        const entry = { status }

        const response = await fetch("/reports/" + report._id, {
            method: "PATCH",
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        console.log(entry)
        const json = await response.json()


        if (response.ok) {

            console.log('status updated!', json)
            console.log(status)
            window.location.href = '/reports'


        }

    }


    return (
        <div className="course-details" style={{ fontFamily: "sans-serif", height: "170px", backgroundColor: color }}>
            <p style={{ fontSize: "20px", marginBottom: "-10px" }}> <strong> Complain: </strong>{report.text} </p>
            <p style={{ marginBottom: "10px", color: "#c0c0c0" }}>__________________________________________________________________________________________________________________________________________________________________</p>
            <p><strong >Reporter name: </strong>{Name}</p>
            <p><strong >Reporter Id: </strong>{report.reporter}</p>
            <p ><strong> Type: </strong>{report.type}</p>

            <form className="status" onSubmit={handleSubmit} onClick={uclick} >
                <label ><p><b>Status: </b></p></label>
                <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} >
                    <option value="" disabled>Update status</option>
                    <option value="unseen">Unseen</option>
                    <option value="pending">Pending</option>
                    <option value="unresolved">Unresolved</option>
                    <option value="solved">Solved</option>
                </select>


                {update && <img title="Update status" style={{ cursor: "pointer" }} src="https://img.icons8.com/material-sharp/512/checkmark.png" width="20px" onClick={handleSubmit} />}


            </form>

            <br></br>
            {report.status == "unresolved" && <img title="Check followups" width="35px" style={{ cursor: "pointer", marginLeft: "98%", marginTop: "-100px" }} src="https://img.icons8.com/windows/512/chat-messages.png" onClick={goToFollowUps} />}

        </div>
    )

}

export default Report
