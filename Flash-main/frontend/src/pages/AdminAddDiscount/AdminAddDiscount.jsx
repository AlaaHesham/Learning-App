import React from 'react'
import { useState, useEffect } from "react"
import axios from "axios";


import InstructorCourseComponent from "../../components/InstructorCourseComponent/InstructorCourseComponent"
//import CourseDetails2 from '../../components/CourseDetails2/CourseDetails2'
import AdminCourses from '../../components/AdminCourses/AdminCourses';
import AdminMultibleDiscount from '../../components/AdminMultibleDiscount/AdminMultibleDiscount';

const AdminAddDiscount = () => {

  const [courses, setCourses] = useState([])
  const [userId, setUserId] = useState(null)
  const [selected, setSelected] = useState([])
  const [showCancel, setShowCancel] = useState(true)
  const [all, setAll] = useState(false)

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
    const fetchCourses = async () => {
      const response = await fetch('/courses')
      const json = await response.json()

      console.log(json)

      if (response.ok) {
        setCourses(json)
      }
    }

    fetchCourses()
  }, [])
  const selectAll = () => {
    setAll(!all)

    if (!all) {
      let tmp = []
      for (let i = 0; i < courses.length; i++) {
        tmp.push(courses[i]._id)
      }
      setSelected(tmp)
    } else
      setSelected([])

  }
  return (

    <div className="refund-requests-admin ">
     
      
      <input className="admin-courses-checkbox"  style={{marginRight:"90px",marginBottom:"-50px"}} type="checkbox" onChange={() => { selectAll() }}></input>
      <label id='selectAll-label' style={{marginRight:"-2px",marginTop:"-15px"}}>Select All</label>
      {selected.length > 0 ?
        <div id='multiDiscount'>
          <AdminMultibleDiscount
            courseIds={selected}
            removeCancel={() => {
              setShowCancel(false)
            }}
            done={() => setAll(false)}
          />
        </div>
        :
        <></>}
      <div className="courses">
        {courses && courses.map(course => (
          <AdminCourses
            key={course._id}
            course={course}
            select={(id) => { setSelected([...selected, id]) }}
            remove={(id) => { setSelected(selected.filter(ids => ids !== id)) }}
            all={all}
          />
        ))}
      </div>

    </div>
  )
}


export default AdminAddDiscount