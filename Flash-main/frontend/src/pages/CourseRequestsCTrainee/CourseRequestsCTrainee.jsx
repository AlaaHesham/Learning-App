import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react';

export default function CourseRequestsCTrainee() {

  const [isInitialRender, setIsInitialRender] = useState(true)
  const [coursesRequests, setCoursesRequests] = useState(null)
  const [courseTitles, setCourseTitles] = useState([])
  const [isLoading1, setIsLoading1] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)

  const getRequests = async () => {
    const res = await axios.get("/corporateTrainees/courseRequests");
    setIsInitialRender(false)
    setCoursesRequests(res.data.courseRequests)
    setIsLoading1(false)
  };

  const getTitles = async () => {
    let tmp = []
    for (let i = 0; i < coursesRequests.length; i++) {
      let id = coursesRequests[i].title
      const res = await axios.get("/courses/" + id);
      console.log(res)
      tmp[i] = res.data.title
    }
    setCourseTitles(tmp)
    setIsLoading2(false)
  };

  useEffect(() => {
    if (isInitialRender) {
      getRequests()
    }
  }, [])

  useEffect(() => {
    if (coursesRequests && !isLoading1) {
      console.log(coursesRequests)
      getTitles()
    }

  }, [coursesRequests])

  if (isLoading1 || isLoading2) {
    return <div className="App">Loading...</div>;
  }

  return (

    <div className='courses'>
      {coursesRequests.map((c) => (
        <div className="course-details" style={{ background: "#f4939511", width: "60vw", height: "30vh" }} >
          <div >
            <p style={{ fontSize: "18px" }}><b>Course Title: </b>{courseTitles[coursesRequests.indexOf(c)]}</p>
          </div><br></br>
          <div >
            <p style={{ fontSize: "18px" }}><b>Status: </b>{c.status}</p>
          </div><br />
        </div>
      ))}

      {coursesRequests && coursesRequests.length === 0 &&
        <>
          <h2>Your course requests will appear here!</h2>
          <img width='70%' height="60%" style={{ marginLeft: '250px' }} src="https://i0.wp.com/dancebusinessweekly.com/wp-content/uploads/2021/04/GettyImages-1253922154-scaled.jpg?resize=1024%2C683&ssl=1"></img>
        </>
      }
    </div>
  )
}