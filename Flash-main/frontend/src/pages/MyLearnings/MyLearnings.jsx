import React from 'react'
import axios from 'axios'
import { Link, useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react';
import Video from '../../components/video/Video'
import Rate from '../../components/Rate/Rate'
import Stars from '../../components/Stars/Stars'
import './MyLearnings.scss'
import Cookie from 'js-cookie'



export default function MyLearnings() {
    const location = useLocation();
    const path = location.pathname.split("/")[3];
    const [trainee, setTrainee] = useState({});
    const [traineeCourses,setTraineeCourses]=useState([])
    const [currentCourses,setCurrentCourses]=useState([])
    const [pastCourses,setPastCourses]=useState([])
    const [currentCoursesReviews,setCurrentCoursesReviews]=useState([])
    const [pastCoursesReviews,setPastCoursesReviews]=useState([])
    const [coursesCurrent, setCoursesCurrent] = useState([]);
    const [coursesPast, setCoursesPast] = useState([]);
    const [coursesRequests, setcoursesRequests] = useState([]);
    const [open,setOpen]=useState("current")
    const [modalShow, setModalShow] = useState(false);
    const [reviewedCourse,setReviewedCourse]=useState({rating:0,review:""})
    const [isLoading1,setIsloading1]=useState(true)
    const [isLoading2,setIsloading2]=useState(true)
    const [isLoading3,setIsloading3]=useState(true)
    const [isLoading4,setIsloading4]=useState(true)
    const[isCorporate,setIsCorporate]=useState(false)
    
    useEffect(()=>{
       
      let role=Cookie.get('role')
      console.log(role)
      if (role === "corporateTrainee" )
      {
        setIsCorporate(true)
      }
    },[])
    useEffect(() => {
      const getTrainee = async () => {
        const res = await axios.get("/user/" + path);
        setTrainee(res.data);
        setTraineeCourses(res.data.currentCourses)
        setIsloading1(false)
      };
      getTrainee();

    }, [path,modalShow]);
    
    useEffect(()=>{
      const traineeCourse=async()=>{
        setCurrentCourses(traineeCourses.filter(course => course.done === false))
        setPastCourses(traineeCourses.filter(course => course.done === true))
        setIsloading2(false)
      }
      if(!isLoading1){
      traineeCourse()
      }
    },[traineeCourses])

    useEffect(()=>{
      const currentCourse=async()=>{
        let tmp=[]
        let reviews=[]
        for(let i=0;i<currentCourses.length;i++){
          reviews[i]=currentCourses[i].myRating
          
          const res=await axios.get(`/courses/${currentCourses[i].title}`)
          console.log("here"+i)
          console.log(currentCourses[i])
          tmp[i]=res.data
        }
        setCoursesCurrent(tmp);
        setCurrentCoursesReviews(reviews)
        setIsloading3(false)
      }
      if(!isLoading2){
      currentCourse()
      }
    },[currentCourses])

    useEffect(()=>{
      const pastCourse=async()=>{
        let tmp=[]
        let reviews=[]
        for(let i=0;i<pastCourses.length;i++){
          reviews[i]=pastCourses[i].myRating
          const res2=await axios.get(`/courses/${pastCourses[i].title}`)
          tmp[i]=res2.data
        }
        setCoursesPast(tmp);
        setPastCoursesReviews(reviews)
        setIsloading4(false)
      }
      if(!isLoading2){
      pastCourse()
      }
    },[pastCourses])

    if ( isLoading1 || isLoading2 || isLoading3 || isLoading4) {
      return <div className="App">Loading...</div>;
    }
  return (
    <div className='learning' style={{minHeight:"100vh"}}>
      <div className="l-header">
        <h1>My learning</h1>
        <ul style={{cursor:"pointer"}}>
          <li className= {open==="current"? 'li open' :'li'} onClick={()=>setOpen("current")}>Current Courses</li>
          <li className= {open==="past"? 'li open' :'li'} onClick={()=>setOpen("past")}>Past Courses</li>
        </ul>
      </div>
      {open==="current" &&
      <div className='courses'>
      {coursesCurrent.map((c,index) => (
        <div className='course'  key={index}>
            <Video className='video' video={c.previewVideo}/>
            <Link to={`/course/${c._id}`}><span className="title">{c.title}</span></Link>
            <span className="progress">{currentCourses[coursesCurrent.indexOf(c)].percentage+"% Complete"}</span>
            <div className="rating" style={{cursor:"pointer",fontSize:"12px",color:"grey"}} onClick={() => {setModalShow(true);setReviewedCourse({rating:currentCourses[index].myRating.rating,review:currentCourses[index].myRating.review,course:c._id})}}>
            <h9> Your Rating:</h9> <Stars value={currentCoursesReviews[index].rating} />
            </div>
        </div>

       ))}
      </div>
      }
       {open==="current" && coursesCurrent.length==0 &&
      <>
      <h2>Your current courses will appear here!</h2>
       <img width= '70%' height="60%" style={{ marginLeft: '250px'}} src="https://i0.wp.com/dancebusinessweekly.com/wp-content/uploads/2021/04/GettyImages-1253922154-scaled.jpg?resize=1024%2C683&ssl=1"></img>
      </>
      }

      {open==="past" &&
      <div className='courses'>
      {coursesPast.map((c,index) => (
        <div className='course'  key={index}>
            <Video className='video' video={c.previewVideo}/>
            <Link to={`/course/${c._id}`}><span className="title">{c.title}</span></Link>
            <span className="progress">{pastCourses[coursesPast.indexOf(c)].percentage+"% complete"}</span>
            <div className="rating" style={{cursor:"pointer",fontSize:"12px",color:"grey"}} onClick={() => {setModalShow(true);setReviewedCourse({rating:pastCourses[index].myRating.rating,review:pastCourses[index].myRating.review,course:c._id})}}>
            <h9> Your Rating:</h9><Stars value={pastCoursesReviews[index].rating}/>
            </div>
        </div>

       ))}
      </div>
      }
       {open==="past" && coursesPast.length==0 &&
      <>
      <h2>Your past courses will appear here!</h2>
       <img width= '70%' height="60%" style={{ marginLeft: '250px'}} src="https://i0.wp.com/dancebusinessweekly.com/wp-content/uploads/2021/04/GettyImages-1253922154-scaled.jpg?resize=1024%2C683&ssl=1"></img>
      </>
      }



      <Rate
        value={reviewedCourse.rating}
        course={reviewedCourse.course}
        review={reviewedCourse.review}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      
    </div>
  )
}
