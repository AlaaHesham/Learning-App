import * as React from 'react';
import {useState,useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MenuIcon from '@mui/icons-material/Menu';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QuizIcon from '@mui/icons-material/Quiz';
import Rating from '@mui/material/Rating';
import DoneIcon from '@mui/icons-material/Done';
import { Paper, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import Overlay from "react-overlay-component";
import {BiEditAlt, BiLock} from "react-icons/bi"
import {MdAccessTime, MdLockClock, MdOutlineDoneOutline} from 'react-icons/md';
import Cookie from 'js-cookie'
import { useParams } from "react-router-dom";
import './ViewCourse.scss'
import RegisterForCourse from '../components/RegisterforCourse/RegisterforCourse';
import RatingsView from '../components/RatingsView/RatingsView';
import ReviewView from '../components/ReviewView/ReviewView';
import {MdOutlineArrowBack} from "react-icons/md";

const ViewCourse =(props)=>{

  const [type, setType] = useState(null)
  const [currency, setCurrency] = useState(null)
  const [error, setError] = useState(null)
  const [newReview, setNewReview] = useState('')
  const [reviewMessage, setReviewMessage] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [ratings, setRatings] = useState([])
  const [showRegister, setShowRegister] = useState(true)
  const [done, setDone] = useState(false);
  
  const [title,setTitle] = useState("");
  const [subject,setSubject] = useState("");
  const [coursehours,setCoursehours] = useState("");
  const [instFName,setInstFname] = useState("");
  const [instLName,setInstLname] = useState("");
  const [instRatings,setInstRatings]=useState(null);
  const[instReviews,setInstReviews]=useState(null);
  const [avgRating,setAverageRating] = useState("");
  const [adjustedPrice, setAdjustedPrice] = useState(null)
  const [allSubtitles,setAllSubtitles] = useState([]);
  const [subtitleName,setSubtitleName] = useState("");
  const [subtitleHours,setSubtitleHours] = useState("");
  const [subtitleExercise,setSubtitleExercise] = useState("");
  const [miniBiography,setMiniBiography] = useState("");
  const [shortDescription,setShortDescription]=useState("");
  const [courseVideo,setCourseVideo]=useState("");
  const [specificRating,setSpecificRating] = useState("");
  const [raterName,setRaterName] = useState("");
  const [specificReview,setSpecificReview] = useState("");
  const [allRatings,setAllRatings] = useState([]);
  const [TraineeId, setUserId] = useState(null)
  const [isLoading,setIsLoading]=useState(true)

  const [starsRatingInst, setStarsRatingInst] = useState([0, 0, 0, 0, 0])
  const [avrgRatingInst, setAvrgRatingInst] = useState(0)
  const [numOfRatingInst, setNumOfRatingInst] = useState(0)
  const [show, setShow] = useState(false)
  const [showInst,setShowInst]=useState(false)

  const navigate = useNavigate();


  const params = useParams();
  const id = params.id
  var text = [];
  var Data= [];
  var DataRates=[];
  var textRates=[];
  const[coursePrice,setCoursePrice]=useState("");
    
      const fetchCourse = async () => {
        const response = await fetch("/courses/" + id, {
            method: "GET",
        })
        const response3 = await fetch("/subtitles/course/" + id, {
            method: "GET",
        })
        const json = await response.json()       
        const subs = await response3.json()
        const response2 = await fetch("/instructors/" + json.instructor, {
          method: "GET",
        })
        const inst = await response2.json()
        setCoursePrice(json.price);
        for (let i = 0; i < subs.length; i++) {
            setSubtitleName(subs[i].subtitle);
            setSubtitleHours(subs[i].hours);
            setSubtitleExercise(subs[i].excercises.length);
            text.push(subs[i].subtitle);
            text.push(subs[i].hours);
            text.push(subs[i].excercises.length);
            Data.push(text);
            text=[]; 
        }
        setAllSubtitles(Data);
        if (response.ok) {
              setTitle(json.title);
              setSubject(json.subject);
              setAverageRating(json.avgRating);    
              setInstFname(inst.firstName);
              setInstLname(inst.lastName);
              setInstRatings(inst.ratings);
              setInstReviews(inst.reviews);
              setMiniBiography(inst.miniBiography);
              setCoursehours(json.totalHours);
              setShortDescription(json.shortSummary);
              setCourseVideo(json.previewVideo.replace("watch?v=", "embed/"));
              setIsLoading(false)
              setError(null)
          }
      }
      
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

    const requestACourse = async (e) => {
      e.preventDefault()
      let entry = { "title": id };
      const response = await fetch('/corporateTrainees/' + TraineeId  + '/courses', {
          method: 'PATCH',
          body: JSON.stringify(entry),
          headers: {
              'Content-Type': 'application/json'
          }
      })
      const json = await response.json()

      if (!response.ok) {
          setError(json.error)
      }
      else {
          setDone(true);
      }
  }

    useEffect(() => {
      const fetchType = async () => {
          const response = await fetch('/login/type')
          const json = await response.json()

          console.log(json)

          if (response.ok) {
              setType(json)
              if (json == "individualTrainee") {

                  const response = await fetch('/individualTrainees/' + TraineeId )
                  const json2 = await response.json()
                  if (response.ok) {
                      for (let i = 0; i < json2.currentCourses.length; i++) {
                          if (json2.currentCourses[i].title == id) {
                              setShowRegister(false)
                              break
                          }
                      }
                  }

              }
          }

      }
      fetchType()
       }, [])


       useEffect(() => {
        const fetchCurrency = async () => {
            const response = await fetch('/login/currency')
            const json = await response.json()


            if (response.ok) {
                setCurrency(json)
            }
        }

        fetchCurrency()

    }, [])


    useEffect(() => {

      const getAdjustedPrice = async () => {

          const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=da8698baa20640669fb02c79f6afb3e0');
          const json = await response.json()//returns a json object with an array of all exchange rates with USD as base

          const rate = json.rates[currency]


          if (response.ok) {
              setAdjustedPrice(rate * coursePrice)
          }
      }

      getAdjustedPrice()
      })

      const getDiscount = async () => {

        const response = await fetch('/courses/' + id + '/discount')
        const json = await response.json()

        if (response.ok) {
            setDiscount(json.discount)
            console.log(json.discount)
        }
    }

    const fetchRatings = async () => {

        const response = await fetch('/courses/' + id + '/ratings')
        const json = await response.json()

        console.log(json)
        if (response.ok) {
            setRatings(json)
            
        }
        for (let i = 0; i < json.ratings.length; i++) {
          setSpecificRating(json.ratings[i].rating);
          setRaterName(json.ratings[i].raterName);
          setSpecificReview(json.ratings[i].review);
          textRates.push(json.ratings[i].rating);
          textRates.push(json.ratings[i].raterName);
          textRates.push(json.ratings[i].review);
          DataRates.push(textRates);
          textRates=[]; 
        }
        setAllRatings(DataRates);
        DataRates=[];
    }

    useEffect(() => {

        if (isInitialRender) {
            setIsInitialRender(false);
            getDiscount()
            fetchRatings()
            fetchCourse();
            console.log("rend")
        }

    })

  
  useEffect(()=>{
    if(instFName)
    {
      let newAvrgRating = 0
      let newNumOfRating = 0
      let stars = [0, 0, 0, 0, 0]
      for (let i = 0; i < instRatings.length; i++) {
          newNumOfRating++
           newAvrgRating += instRatings[i].rating
          stars[instRatings[i].rating - 1]++
      }
      setNumOfRatingInst(newNumOfRating)
      setAvrgRatingInst(newAvrgRating / newNumOfRating)
      setStarsRatingInst(stars)
    }
  },[instFName])


    if (isLoading) {
      return <div className="App">Loading...</div>
    }
    return (
      <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
      <MDBRow>
        <MDBCol >
      <MdOutlineArrowBack class="opacity_img" style={{width:"50px",height:"50px",color:"#d55b5c"}} onClick={() => navigate(-1)}></MdOutlineArrowBack>
        </MDBCol>
        <MDBCol style={{marginRight:"500px"}}>
                    <h3 style={{textAlign:"center",color:"#d55b5c",fontSize:"40px"}}><strong>{title}</strong></h3>
                    </MDBCol>
                </MDBRow>
        <MDBRow>  
          <MDBCol lg="8">
            <MDBCard className="mb-4" style={{minwidth:"750px",minHeight:"450px",maxWidth:"750px"}}>

              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="6" style={{color:"grey"}}>
                    <h3>About this Course</h3>
                  </MDBCol>
                  <MDBCol sm="6" style={{color:"grey"}}>
                    <h5><MdAccessTime size={"30px"}/> {coursehours} Hours</h5>
                  </MDBCol>
                </MDBRow>   
                <MDBRow>
                  <MDBCol sm="12">
                    <p>
                      {shortDescription} 
                    </p>                 
                 </MDBCol>
                </MDBRow> 

                <MDBRow>
                  <MDBCol sm="4">
                  <h5> <img width="35px"src="https://img.icons8.com/fluency-systems-filled/48/null/training.png"/><b>Instructor</b></h5><br></br> 
                   
                   <h6 style={{marginLeft:"28px",marginTop:"-25px"}}>{instFName}  {instLName}</h6>          
                 </MDBCol>
                
                        <MDBCol >
                        <h5> <img src="https://img.icons8.com/ios-glyphs/30/null/info--v1.png"/><b>About this instructor</b></h5><br></br> 
                          <div style={{marginLeft:"28px"}}>
                          <h6 style={{marginTop:"-25px"}}>{miniBiography}</h6>     
                          <h8 style={{fontSize:"20px"}}>Still doubting whether you should go for it? <a style={{color:"#fb7464"}} class="opacity_img" onClick={()=>setShowInst(!showInst)}>See what other people think.</a></h8>            
                          </div>

                        </MDBCol>
                </MDBRow>         
                <MDBRow>
                  <MDBCol>
                  {showInst &&    <div>
            <h5><img width="30px" src="https://img.icons8.com/external-smashingstocks-glyph-smashing-stocks/66/null/external-reviews-digital-marketing-smashingstocks-glyph-smashing-stocks.png"/><b> Instructor's Ratings & Reviews</b></h5>

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
                {instReviews.map(review => (
                  <>
                  <MDBRow>
                    <div className="instructor-review" key={review._id}>
                        <ReviewView style={{width:"700px"}} review={review} />
                     
                    </div>
                    </MDBRow>
                    </>
                ))}
                </div>
            </div>}   
   
                  </MDBCol>
                </MDBRow>   
                 
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="4"  style={{minwidth:"550px",minHeight:"450px",maxWidth:"550px",maxHeight:"450px"}}>
            <MDBCard className="mb-4" style={{minwidth:"600px",minHeight:"450px",width:"550px",height:"450px",marginLeft:"-120px"}}>
              <MDBCardBody className="text-center">
              <MDBRow style={{minwidth:"550px",minHeight:"200px",maxWidth:"550px",height:"200px",paddingTop:"10px",marginTop:"-20px"}}>                  

                  <div class="ratio ratio-4x3">
                  <iframe src={courseVideo} title="YouTube video" allowfullscreen="true" style={{height:"350px"}}></iframe>
                  </div>
                </MDBRow>
                <MDBRow style={{marginTop:"150px"}}></MDBRow>
                    <MDBRow>
                    
                    <MDBCol >
                  {type !== "corporateTrainee" && discount == 0 ?
                    <h2 style={{color:"grey",fontSize:"20px",marginTop:"40px"}}><img src="https://img.icons8.com/color-glass/48/null/expensive-2.png"/>{adjustedPrice} {currency}</h2> :
                    <p></p>}
                  {type !== "corporateTrainee"   && discount != 0  ?
                    <h3 style={{color:"grey",fontSize:"20px",marginTop:"40px"}}><img src="https://img.icons8.com/color-glass/48/null/expensive-2.png"/>Price: <strike>{adjustedPrice}</strike> {adjustedPrice * (1 - discount)} {currency}</h3> :
                    <p></p>
                  }
                    </MDBCol>
                    <MDBCol>
                    {type == "corporateTrainee" ? 
                    
                      <Button style={{backgroundColor: "#fa7466",color:"#ffffff",marginTop:"40px"}} size="large"  variant="contained"  className='b1' onClick={requestACourse}>Request Now!</Button>
                      :<p></p>
                   }
                    {done && <span style={{ color: "green", marginTop: "10px" }}>Requested!</span>}
                    {error && <span style={{ color: "red", marginTop: "10px" }}>{error}</span>}
                    {type == "individualTrainee" && showRegister &&
                      <RegisterForCourse  id={TraineeId} courseId={id} setter = {()=>{setShowRegister(false)}}/>  
                    }
                <br></br>
                    </MDBCol>
                </MDBRow>
                

              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>


     
  
      <div className="course-content" style={{marginLeft:"90px",marginTop:"-30px"}}>
        <div>        
          <h1 style={{color:"#647cd2"}}>Content</h1>
        </div>
        
        {allSubtitles.map((item)=>     
           <div className="subtitle-item1 open" style={{marginTop:"-20px"}}>
           <hr />
             <div className="subtitle-title1">
               <h9 style={{color:"#647cd2"}}>
                  {item[0]}
               </h9> 
             </div>
             <div className="subtitle-content1">
               <div className="video" >
                 <MdAccessTime size={"30px"}/> {item[1]} hours
               </div>
               <div className="exercise">
                 <QuizIcon/> {item[2]} exercises
               </div>
             </div>
         </div>       
        )       
        }
        <hr className='last'/>
      </div>
      
      <MDBContainer className="py" >
        <MDBRow >
          <MDBRow>
          <MDBCol >
            <MDBCard className="mb-4" >
              <MDBCardBody >
                <MDBRow>
                  <MDBCol>
                    <h3 style={{color:"grey"}}>Ratings and Reviews</h3>
                  </MDBCol> 
                </MDBRow>  
               
                     <MDBRow >
                     <div className='c2'>
                       <MDBCol>                       
                      
                       <div className="reviews" style={{marginLeft:"-250px"}}>
                      <RatingsView ratings={ratings.ratings} averageRatings={avgRating} />
                    </div>
                       </MDBCol>
                     </div>
                     <hr></hr>
                   </MDBRow>   
                  
                       
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          </MDBRow>
        </MDBRow>
      </MDBContainer>
  

    </section>    
    )
}

export default ViewCourse
