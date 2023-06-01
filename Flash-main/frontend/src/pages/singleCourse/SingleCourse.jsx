import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import AnchorLink from "react-anchor-link-smooth-scroll";
import FileDownload from 'js-file-download'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuIcon from '@mui/icons-material/Menu';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QuizIcon from '@mui/icons-material/Quiz';
import DoneIcon from '@mui/icons-material/Done';
import Video from '../../components/video/Video'
import './singleCourse.scss'
import RatingsView from '../../components/RatingsView/RatingsView';
import Exercises from '../../components/Exercises/Exercises';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Rating from '@mui/material/Rating';
import ReviewView from '../../components/ReviewView/ReviewView';
import Stars from '../../components/Stars/Stars'
import RateInstructor from '../../components/RateInstructor/RateInstructor'
import Cookie from 'js-cookie'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,

} from 'mdb-react-ui-kit';
import {MdOutlineArrowBack} from "react-icons/md";
import { useNavigate} from 'react-router-dom';


export default function SingleCourse() {
  const PF = "http://localhost:7000/lectures/"
  const [selected,setSelected]=useState("content")
  const [display, setDisplay] = useState("video")
  const [open, setOpen] = useState([])
  const [checkedVideo,setCheckedVideo]=useState([])
  const [checkedLecture,setCheckedLecture]=useState([])
  const [checkedEx,setCheckedEx]=useState([])
  const [filterNotes,setFilterNotes]=useState('Current lecture')
  const [openedSubtitle,setOpenedSubtitle]=useState(0);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [trainee,setTrainee]=useState()
  const [currentCourse,setCurrentCourse]=useState()
  const [course, setCourse] = useState({});
  const [ratings, setRatings] = useState([]);
  const [subtitles, setSubtitles] = useState([]);
  const [subtitle, setSubtitle] = useState();
  const [video, setVideo] = useState("")
  const [lecture, setLecture] = useState("")
  const [progress,setProgress]=useState()
  const [instructor,setInstructor]=useState()

  const [starsRatingInst, setStarsRatingInst] = useState([0, 0, 0, 0, 0])
  const [avrgRatingInst, setAvrgRatingInst] = useState(0)
  const [numOfRatingInst, setNumOfRatingInst] = useState(0)
  const [show, setShow] = useState(false)
  const [showInst,setShowInst]=useState(false)
  const [myRatingInst,setMyRatingInst]=useState(0)
  const [myReviewInst,setMyReviewInst]=useState("")
  const [modalShow, setModalShow] = useState(false);

  const [isLoading,setIsLoading]=useState(true)
  const [role,setRole]=useState(null)


  const [error, setError] = useState(null)
  const [sent, setSent] = useState(false)

  const navigate = useNavigate();

  const [notesTaken,setNotesTaken]=useState("")
  const popover1 = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Popover right</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
      </Popover.Body>
    </Popover>
  );

  useEffect(() => {
    const getCourse = async () => {
      const res = await axios.get("/courses/" + path);
      setCourse(res.data);
      setRatings(res.data.ratings)
    };
    const getSubtitles = async () => {
      const res = await axios.get("/subtitles/course/" + path);
      setSubtitles(res.data);
      setVideo(res.data[0].youtubeLink.link)
    };
    const getTrainee=async()=>{
      const res=await axios.get('/user/getTrainee')
      setTrainee(res.data)
    }
    const getInstructor=async()=>{
      const res=await axios.get('/courses/'+path+"/courseInstructor")
      setInstructor(res.data)
      setIsLoading(false)
    }
    
    getCourse();
    getSubtitles();
    getTrainee();
    getInstructor();
    setRole(Cookie.get('role'))
   
  },[path]);

  useEffect(()=>{
    const getMyRatingsAndReviewsForInst=async()=>{
      const res=await axios.post("/instructors/traineeRatingAndReview",{
        instId:course.instructor
      })
      console.log(res)
      console.log("result is above me")
      setMyRatingInst(res.data.rating);
      setMyReviewInst(res.data.review)
      console.log(myRatingInst)
      console.log(myReviewInst)
    }

    if(!isLoading)
   {
    getMyRatingsAndReviewsForInst();
   }
   
  },[course])

  useEffect(() => {
    const getInstructor=async()=>{
      const res=await axios.get('/courses/'+path+"/courseInstructor")
      setInstructor(res.data)
      setIsLoading(false)
    }
    getInstructor()
  }, [path,modalShow]);

  useEffect(()=>{
    const func=async()=>{
      for(let i=0;i<trainee.currentCourses.length;i++){
        if(trainee.currentCourses[i].title.toString()===path){
          setCurrentCourse(trainee.currentCourses[i])
          setProgress(trainee.currentCourses[i].percentage)
        }
      }
    }
    func()
  },[trainee])

  useEffect(()=>{
    console.log(currentCourse)
    let tmp1=[]
    let tmp2=[]
    let tmp3=[]
    const func=async()=>{
      for(let i=0;i<currentCourse.subtitles.length;i++){
        console.log('here')
        tmp1[i]=currentCourse.subtitles[i].video
        tmp2[i]=currentCourse.subtitles[i].lecture
        tmp3[i]=currentCourse.subtitles[i].exercise
      }
    }
    func()
    setCheckedVideo(tmp1)
    setCheckedLecture(tmp2)
    setCheckedEx(tmp3)
    console.log(tmp1)
  },[currentCourse])

  useEffect(()=>{
    const func=async()=>{
      for (let i = 0; i < subtitles.length; i++) {
        open[i] = false
      }
    }
    func()
  },[subtitles])

  useEffect(()=>{
    if(instructor)
    {
      let newAvrgRating = 0
      let newNumOfRating = 0
      let stars = [0, 0, 0, 0, 0]
      for (let i = 0; i < instructor.ratings.length; i++) {
          newNumOfRating++
           newAvrgRating += instructor.ratings[i].rating
          stars[instructor.ratings[i].rating - 1]++
      }
      setNumOfRatingInst(newNumOfRating)
      setAvrgRatingInst(newAvrgRating / newNumOfRating)
      setStarsRatingInst(stars)
    }
  },[instructor])

  const updateProgress = async (sub, type) => {
    const res = await axios.post('/user/update-progress', {
      course: course._id,
      subtitle: sub,
      type: type
    })
    setCurrentCourse(res.data)
  }

  const handleRequest = async () => {
    if(progress>=50)
    {
      setError("You progressed more than 50% of the course")
    }
    else{
    const courseId = course._id
    const entry = { courseId }
    const response = await fetch('/individualTrainees/requestRefund', {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setError(null)
      setSent(true)
    }
  }
  }
  const downloadCertificate=async(e)=>{
    e.preventDefault()
    const res=await axios.post('/user/download-certificate',{
      course:course.title
    },{ responseType: 'blob' })
    FileDownload(res.data,'certificate.pdf')
  }
  const handleNotesTaken = async(e)=> {
    e.preventDefault()
    console.log(openedSubtitle)
    const res=await axios.post('/user/download-notes',{
      course:course._id,
      subtitle:subtitles[openedSubtitle]._id,
      notes:notesTaken
    },{ responseType: 'blob' })
    FileDownload(res.data,`${course.title}.pdf`)
  }
 
  return (

    <div className='single-course' style={{minHeight:"210vh"}}>
      <div className="topbar">
        <div className="left">
        <MdOutlineArrowBack class="opacity_img" style={{width:"50px",height:"50px",color:"white"}} onClick={() => navigate(-1)}></MdOutlineArrowBack>
          <span className="title">{course.title}</span>
          <span className="subject">{course.subject}</span>
        </div>
        <div className="right">
          {
            currentCourse&&currentCourse.done===true&&
            <span className="certificate" style={{cursor:"pointer"}} onClick={(e)=>{downloadCertificate(e)}}>
            <EmojiEventsIcon />
            <span>Get certificate</span>
            </span>
          }
          {
            currentCourse&&currentCourse.done===false&&
            <span  className="certificate">
            {`${progress}%`}
            </span>
          }
          {(role!=="corporateTrainee"&&currentCourse&&currentCourse.done==false) && <button onClick={handleRequest}>Request Refund</button>}
        
          
          {!sent && error && <span>{error}</span>}
          {!error && sent && <alert>Refund request sent successfuly</alert>}
        </div>

      </div>
        <div className="display" id='here'>
         {display==='video'&&<Video video={video}/>}
         {display==='ex'&&<Exercises  id={subtitle} />}
         {display==='lecture'&&<embed src={`${PF}${lecture}`} width={1350} height={600}/>}
        </div>
        <div className="navbar">
          <ul>
            <li className={selected==="content" ? "li open" : "li"} onClick={()=>{setSelected("content")}}>Course content</li>
            <li className={selected==="overview" ? "li open" : "li"} onClick={()=>{setSelected("overview")}}>Overview</li>
            <li className={selected==="notes" ? "li open" : "li"} onClick={()=>{setSelected("notes")}}>Notes</li>
            <li className={selected==="reviews" ? "li open" : "li"} onClick={()=>{setSelected("reviews")}}>Reviews</li>
          </ul>
          <hr />
        </div>
        {selected==="content"&&
        <div className="course-content">
        { subtitles.map((item) => 

               <div className={open[subtitles.indexOf(item)] ? "subtitle-item open" : "subtitle-item"}
                onClick={()=>{let tmp=[...open]; tmp[subtitles.indexOf(item)]=!tmp[subtitles.indexOf(item)];setOpen(tmp);}}>
                <hr />
                <div className="subtitle-title">
                    <span>
                        {item.subtitle}    
                    </span> 
                    <i className="bi-chevron-down toggle-btn" ></i>
                </div>
                <div className="subtitle-content"  >
                   <AnchorLink className='navigate' href='#here'><div  onClick={()=>{setOpenedSubtitle(subtitles.indexOf(item));setVideo(item.youtubeLink.link);updateProgress(item._id,"video");setDisplay('video')}} >
                      <DoneIcon className={checkedVideo[subtitles.indexOf(item)]===true?'done':'not-done'}/>
                      <OndemandVideoIcon />{`  ${item.youtubeLink.description}`}
                    </div></AnchorLink>
                    {
                      item.lecture!==''&&
                      <AnchorLink className='navigate' href='#here'><div  onClick={()=>{setOpenedSubtitle(subtitles.indexOf(item));setLecture(item.lecture);setDisplay('lecture');updateProgress(item._id,"lecture")}}>
                      <DoneIcon className={checkedLecture[subtitles.indexOf(item)]===true?'done':'not-done'}/>
                      <PictureAsPdfIcon />  Lecture slides
                      </div></AnchorLink>
                    }
                    <AnchorLink className='navigate' href='#here'><div onClick={()=>{setOpenedSubtitle(subtitles.indexOf(item));setSubtitle(item._id);setDisplay("ex")}}>
                      <DoneIcon className={checkedEx[subtitles.indexOf(item)]===true?'done':'not-done'}/>
                      <QuizIcon />  Multiple choice exercise
                    </div></AnchorLink>
                </div>
                
            </div>) }
        <hr className='last'/>

        </div>}
      {selected==="overview" &&
        <div className="overview">
         

              <MDBRow style={{marginBottom:"50px"}}> 
             <h5> <img width="30px" src=" https://img.icons8.com/ios-filled/50/null/summary-list.png"/><b>Course Summary</b></h5><br></br> 
              <h6 style={{marginLeft:"28px"}}>{course.shortSummary}</h6>
              </MDBRow>


              <MDBRow>
                  <MDBCol sm="4">
                  <h5> <img width="35px"src="https://img.icons8.com/fluency-systems-filled/48/null/training.png"/><b>Instructor</b></h5><br></br> 
                   
                   <h6 style={{marginLeft:"28px",marginTop:"-25px"}}>{instructor.firstName}  {instructor.lastName}</h6>  <br></br>        
                   </MDBCol>
                   
                
                 <MDBCol sm="6">
                        <h5> <img src="https://img.icons8.com/ios-glyphs/30/null/info--v1.png"/><b>About this instructor</b></h5><br></br> 
                          <div style={{marginLeft:"28px"}}>
                          <h6 style={{marginTop:"-25px"}}>{instructor.miniBiography}</h6>     
                          </div>
                        </MDBCol>
                </MDBRow>         
                <MDBRow>
                <MDBCol sm="4">
                  <h5><img src="https://img.icons8.com/material-sharp/24/null/thumb-up.png"/><b> Rate your instructor</b></h5>
                  <div style={{marginLeft:"28px"}}>
                   <div style={{cursor:"pointer"}} className="rating" onClick={() => {setModalShow(true)}}>

                   <Stars   value={myRatingInst} />
                   </div>
                   <RateInstructor
                  value={myRatingInst}
                 instructor={instructor._id}
                  review={myReviewInst}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  
                      />
                  <h8 style={{fontSize:"18px"}}><a style={{color:"#fb7464"}} class="opacity_img" onClick={()=>setShowInst(!showInst)}>See what other people think.</a></h8>            
</div>
                 </MDBCol>
                  <MDBCol>
                  {showInst &&    <div>
                    <h5><img width="30px" src="https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/66/null/external-reviews-digital-marketing-smashingstocks-glyph-smashing-stocks.png"/><b> Instructor's Ratings & Reviews</b></h5>
                    <div style={{marginLeft:"28px"}}>
            <span className="avrg-rating">{avrgRatingInst}</span>
            <Rating name="read-only" value={avrgRatingInst} precision={0.1} size="large" readOnly />
            <a onClick={()=>{setShow(!show)}} className="num-of-rating">({numOfRatingInst} ratings)</a>
            

            {show && <div id="allRatings">
                <Rating name="read-only" value={5}  size="large" readOnly /><span>{starsRatingInst[4]}</span> <br />
                <Rating name="read-only" value={4}  size="large" readOnly /><span>{starsRatingInst[3]}</span><br />
                <Rating name="read-only" value={3}  size="large" readOnly /><span>{starsRatingInst[2]}</span><br />
                <Rating name="read-only" value={2}  size="large" readOnly /><span>{starsRatingInst[1]}</span><br />
                <Rating name="read-only" value={1}  size="large" readOnly /><span>{starsRatingInst[0]}</span><br />
            </div>}
            <div style={{height:"260px",overflowY:"auto",overflowX:"hidden",width:"240px",textAlign:"center"}} >
                {instructor.reviews.map(review => (
                     <>
                     <MDBRow>
                       <div className="instructor-review" key={review._id}>
                           <ReviewView style={{width:"700px"}} review={review} />
                        
                       </div>
                       </MDBRow>
                       </>
                  
                ))}
                </div>
                </div>
            </div>}   
                  
                  </MDBCol>
                </MDBRow>
          
          

        </div>
      }
      {selected==="notes" &&
        <div className="notes">
          <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Filter</InputLabel>
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterNotes}
          label="Age"
          onChange={(e)=>{setFilterNotes(e.target.value)}}
          >
          <MenuItem value={'Current lecture'}>Current lecture</MenuItem>
          <MenuItem value={'All lectures'}>All lectures</MenuItem>
        </Select>
        </FormControl>
        </Box>
        {
          filterNotes==="Current lecture"&&<div className='current'>
          <TextField className='write-note'
          id="outlined-textarea"
          label="Tell us your experience"
          placeholder="Placeholder"
          multiline
          fullWidth
          focused
          onChange={(e)=>{setNotesTaken(e.target.value)}}
          value={notesTaken===""?currentCourse.subtitles[openedSubtitle].notes:notesTaken}
        />
        <Button style={{backgroundColor:"#647cd2"}} className='download' variant="contained" onClick={(e)=>{handleNotesTaken(e)}}> Save & Download </Button></div>

        }
        <div className='all'>
        {filterNotes==='All lectures'&& currentCourse.subtitles.filter(c=>c.notes!=="").map((item,index)=>
          <div className='note'>
            <span>{subtitles[index].subtitle}</span>
            <p>{item.notes}</p>
          </div>
        )}
        </div>
        </div>
      }
      {selected==="reviews" &&
        <div className="reviews">
          <RatingsView ratings={ratings} averageRatings={course.avgRating} />
        </div>
      }

    </div>
    
  )
}
