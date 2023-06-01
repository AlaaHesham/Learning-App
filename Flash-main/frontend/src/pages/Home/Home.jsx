import {Link} from 'react-router-dom'
import { useState,useEffect } from "react";
import './Home.scss'
import CourseDetailsGuest from "../../components/CourseDetailsGuest/CourseDetailsGuest"
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
var bg = require("./bg.jpeg")

const Home =() => {

    const [courses , setCourses] = useState(null)
    
    useEffect(()=>{
        const fetchCourses = async ()=>{
            const response = await fetch ('/courses/popularCoursesGuest')
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
        <>
        <body>
        <div >
        <br></br>
<div style={{ marginLeft:'30%'}}>
<span style={{ fontSize:'30px',marginLeft:'45px'}}><b>Explore your creativity with thousands</b></span>
        <span style={{ fontSize:'30px'}}><b> <br></br>   of hands on classes within a few clicks away.</b></span>

        </div>

<img width= '70%' height="60%" style={{ marginLeft: '250px'}} src="https://th.bing.com/th/id/R.4212ae52dd6d5df56738a4190a2cf4f4?rik=PYq1nN1p7FhkVw&riu=http%3a%2f%2famericanpublishingservices.com%2fblog%2fwp-content%2fuploads%2f2020%2f11%2fBenefit-Translation-1.png&ehk=lJeFKZASkfzZncs7k0voZ78Z%2b2IJR7yMk8az7fbln0M%3d&risl=&pid=ImgRaw&r=0"  ></img>
        </div>
      <div>

         <div className="view-course" style={{textAlign:"center",marginTop:"120px", backgroundImage: "url("+bg+")",backgroundRepeat:"no-repeat",backgroundSize:"1400px" }} >
         <h1  style={{textAlign:"center",marginLeft:"240px",color:"#d8e2fb",marginTop:"70px"}} > <b>Our most popular courses.</b></h1>

         <div className="topbar" >
           {courses && courses.map(course => (
                <MDBCol size='4'  >
             <CourseDetailsGuest key={course._id}  course={course}></CourseDetailsGuest>
             </MDBCol>
             
           ))}
         </div>
       </div>
       </div>
       </body>
       </>
        )
    }
    
export default Home