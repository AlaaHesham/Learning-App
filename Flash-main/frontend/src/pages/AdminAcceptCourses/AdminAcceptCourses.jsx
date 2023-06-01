import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios";
import RequestedCourse from '../../components/RequestedCourse/RequestedCourse';


const AdminAcceptCourses = () => {
    const [courses, setCourses] = useState([]);
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const fetchID = async () => {
            const response = await fetch('/login/userId')
            const json = await response.json()

            //console.log(json.id)

            if (response.ok) {
                setUserId(json.id)
            }
        }

        fetchID()
    }, [])
    useEffect(() => {
        const fetchRequestedCourses = async () => {
            const response = await fetch("/administrators/" + userId + "/requested-courses")
            const json = await response.json()
            if (response.ok) {
                console.log("json:" + json)
                setCourses(json);
            }
        }

        fetchRequestedCourses()
    }, [])

    return (
        <div className="refund-requests-admin">
            <div className="courses">
                {courses && courses.map((c) => (

                    <RequestedCourse key={c} course={c} />

                ))}
            </div >
            {courses.length === 0 ? <p style={{ textAlign: "center", fontSize: "20px" }}>Relax, no requests yet!</p> : <></>}
        </div>
    )
}



export default AdminAcceptCourses