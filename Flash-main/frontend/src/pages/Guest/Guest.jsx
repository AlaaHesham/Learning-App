import { useState,useEffect } from "react";
import './Guest.scss'
import CourseDetails3 from "../../components/CourseDetails3/CourseDetails3"


const Guest=()=>{

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

    //const id =null
   /* const goToAllCourses=()=>{
        window.location.href="/guest/courses"
    }

   const goToFilterCourses=()=>{
        window.location.href="/guest/courses/filter" 
    }*/
    const goToCoursesSearch=()=>{
        window.location.href="/guest/courses/search" 
    }
    /*const goToFilterCoursesP = ()=>{
        window.location.href="/guest/courses/filterp" 
    }*/
   /* const goToChangeCountry=()=>{
        window.location.href="/guest/country"
    }*/

    return(
        <>
        <div>
           
            <button  onClick={goToCoursesSearch}>search Courses</button>
            
        </div>
        <body>
        <div >
        <br></br>
<div style={{ marginLeft:'30%'}}>
<span style={{ fontSize:'30px',marginLeft:'45px'}}><b>Explore your creativity with thousands</b></span>
        <span style={{ fontSize:'30px'}}><b> <br></br>   of hands on classes within a few clicks away.</b></span>

        </div>

<img width= '70%' height="60%" style={{ marginLeft: '250px'}} src="https://th.bing.com/th/id/R.4212ae52dd6d5df56738a4190a2cf4f4?rik=PYq1nN1p7FhkVw&riu=http%3a%2f%2famericanpublishingservices.com%2fblog%2fwp-content%2fuploads%2f2020%2f11%2fBenefit-Translation-1.png&ehk=lJeFKZASkfzZncs7k0voZ78Z%2b2IJR7yMk8az7fbln0M%3d&risl=&pid=ImgRaw&r=0"  ></img>
        </div>
        </body>
        <div className="view-course">
      <div className="topbar">
        {courses && courses.map(course => (
            
          <CourseDetails3 key={course._id}  course={course}></CourseDetails3>
          
        ))}
      </div>
    </div>
    </>
    )
}

export default Guest