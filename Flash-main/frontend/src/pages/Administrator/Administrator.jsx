import React from 'react'
import {Link} from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import { useParams } from "react-router-dom";

export default function () {
  const params = useParams();
  const id = params.id

 /* const handleLogOut=()=>{
    const response =  fetch ('/login/logout')
    console.log(response.json)
    window.location.href="/login"

}*/

const handleRefundReq =()=>{
  window.location.href ="/"+id+"/refund"
}
  return (
    <div>
        <Link to="/adminstrator/addInstructor">
        <button>Add instructor</button>
        </Link>
        <Link to="/adminstrator/addAdmin">
        <button>Add adminstrator</button>
        </Link>
        <Link to="/adminstrator/addCorporateTrianee">
        <button>Add corporate trainee</button>
        </Link>

        <Link to="/reports">
        <button>Check Reports</button>
        </Link>
        
        <Link to="/adminstrator/adminAcceptCourses">
        <button>view requested courses</button>
        </Link>
        <Link to="/adminstrator/adminAddDiscount">
        <button>Add discount</button>
        </Link>
        <Link to="/courses/PopularCourses">
        <button>view popular courses</button>
        </Link>

        <button onClick={handleRefundReq}>Check Refund Requests</button>
        
        

    </div>
  )
}
