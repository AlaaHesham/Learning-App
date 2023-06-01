import React from 'react'
import { useState,useEffect } from "react"
import axios from "axios";

//import CourseDetails2 from '../../components/CourseDetails2/CourseDetails2'

import CourseDetails3 from "../../components/CourseDetails3/CourseDetails3"

import './PopularCourses.scss'

const PopularCourses =() => {
    const [courses , setCourses] = useState(null)
    
    useEffect(()=>{
        const fetchCourses = async ()=>{
            const response = await fetch ('/courses/popularCourses')
            const json = await response.json()

            console.log(json)

            if (response.ok)
            {
                setCourses(json)
            }
          }

        fetchCourses()
    },[])
    return (

      <div className="view-course">
      <div className="topbar">
        {courses && courses.map(course => (
          <CourseDetails3 key={course._id}  course={course}></CourseDetails3>
        ))}
      </div>
    </div>
      )
}    



export default PopularCourses