import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom"
import './CorporateTrainee.scss'
import CourseDetails3 from "../../components/CourseDetails3/CourseDetails3"
var bg = require("./bg.jpeg")


const CorporateTrainee=()=>{
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



    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [trainee, setTrainee] = useState({});
    //const [courses, setCourses] = useState([]);
    
    const params = useParams()
    const id = params.id
  
    useEffect(() => {
      const getTrainee = async () => {
        const res = await axios.get("/corporateTrainees/" + path);
        setTrainee(res.data);
        setCourses(res.data.currentCourses)
      };
      
      getTrainee();
    }, [path]);


   /* const goToAllCourses=()=>{
        window.location.href="/courses/"+id 
    }

    const goToFilterCourses=()=>{
        window.location.href="/courses/filter" 
    }*/
   /* const goToCoursesSearch=()=>{
        window.location.href="/courses/search" 
    }*/

    /*const goToMyReports =()=>{
        window.location.href="/CorporateTrainee/MyReports"

    }*/

    /*const goToMyCourses=()=>{
        window.location.href="myCourses/"+path
    }*/

    {/*const goToChangeCountry=()=>{
        window.location.href="/country"
    }

    const handleLogOut=()=>{
        const response =  fetch ('/login/logout')
        console.log(response.json)
        window.location.href="/login"


    }*/}

    /*const goToPopularCourses=()=>{
        window.location.href="/courses/PopularCourses"
    }*/
   {/* const goToMyProfile=()=>{
        window.location.href="/profile"
    }*/}
    return(
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
        </body>
        <div className="view-course" style={{textAlign:"center",marginTop:"120px", backgroundImage: "url("+bg+")",backgroundRepeat:"no-repeat",backgroundSize:"1400px" }} >
         <h1  style={{textAlign:"center",marginLeft:"240px",color:"#d8e2fb",marginTop:"70px"}} > <b>Our most popular courses.</b></h1>

      <div className="topbar">
        {courses && courses.map(course => (
            
          <CourseDetails3 key={course._id}  course={course}></CourseDetails3>
          
        ))}
      </div>
    </div>
    </>
    )
}

export default CorporateTrainee