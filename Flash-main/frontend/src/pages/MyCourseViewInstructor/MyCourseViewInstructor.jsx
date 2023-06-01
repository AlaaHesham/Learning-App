
import { useEffect,useState } from "react"
import axios from 'axios'
import { useParams} from 'react-router-dom'
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBContainer,
    MDBCard,
    MDBCardText,
    MDBCol,
    MDBRow,
    MDBCardHeader
  } from 'mdb-react-ui-kit';
  import Video from '../../components/video/Video'
  import {BiEditAlt} from "react-icons/bi"
import {MdOutlineDoneOutline, MdTranslate} from 'react-icons/md';
import "./MyCourseViewInstructor.scss"
import { CDatePicker } from '@coreui/react-pro'
import Overlay from "react-overlay-component";
//import {FcPlus} from 'react-icons/fc'
import {AiOutlineEdit} from 'react-icons/ai'
import RatingsView from "../../components/RatingsView/RatingsView";



const MyCourseViewInstructor =() => {
   
    const {id} = useParams();
    const [justifyActive, setJustifyActive] = useState('Overview');
    const [isLoading, setLoading] = useState(true);
    const [isInitialRender,setIsInitialRender]=useState(true);
    const [course,setCourse]=useState(null)

    const [isEditingPreviewVideo,setIsEditingPreviewVideo]=useState(false)
    const [previewVideo,setPreviewVideo]=useState(null)
    const [noOfTrainees,setNoOfTrainees]=useState(null)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    const [subtitles,setSubtitles]=useState(null)
    const [subtitle,setSubtitle]=useState(null)

    const [isAddingDiscount,setIsAddingDiscount]=useState(false)
    const [discount, setDiscount] = useState(0)
    const [discountStart, setDiscountStart] = useState('')
    const [discountEnd, setDiscountEnd] = useState('')
    const [error3rd, setError3rd] = useState(null)
    const [success3rd, setSuccess3rd] = useState(false)
    const [wrongRange, setWrongRange] = useState(false)

    useEffect(()=>{

        const fetchCourse = async ()=>{
            
            const response = await fetch ('/courses/'+id)
            const json = await response.json()
    
            if (response.ok)
                {
                    setCourse(json)
                    setPreviewVideo(json.previewVideo)
                    setIsInitialRender(false);
                    setLoading(false);
                }
        }

        const fetchSubtitles = async () => {
            const res = await axios.get("/subtitles/course/" + id);
            setSubtitles(res.data);
            //console.log(course.ratings)
          };

        const fetchNoOfTrainees=async()=>{
            const res = await axios.post("/courses/numberOfTrainees",{
                courseId:id
            });
            console.log("hereeeeeeeeeeee")
            console.log(res)
            setNoOfTrainees(res.data.number);
           
        }
        if(isInitialRender)
        {
            fetchCourse();
            fetchSubtitles();
            fetchNoOfTrainees();
        }

    },[success3rd])


    const handleChangePreviewVideo = async () => {
        const entry = { previewVideo }
        const response = await fetch('/courses/' + id + '/addPreviewVideo', {
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

        if (response.ok) {
            setIsEditingPreviewVideo(false)
            setError(null)
            setSuccess(true)
        }
    }

    const handleAddDiscount = async () => {
        if (discount > 100 || discount < 0) {
            setWrongRange(true)
        }
        else if(discountEnd==="" || discountStart==="")
        {
            setError3rd("Please enter all fields")
        }
        else if(discount===0 ){
            setError3rd("Please enter a discount more than 0")
        }
        else {
            const entry = { discount, discountStart,discountEnd }
            const response = await fetch('/courses/' + id + '/addDiscount', {
                method: 'PATCH',
                body: JSON.stringify(entry),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const json = await response.json()
            if (!response.ok) {
                setError(json.error)
                setWrongRange(false)
            }

            if (response.ok) {
                setIsInitialRender(true)
                setDiscount(0)
                setDiscountStart('')
                setDiscountEnd('')
                setError3rd(null)
                setSuccess3rd(true)
                setWrongRange(false)
            }
        }
    }

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  if (isLoading) {
    return <div className="App">Loading...</div>;
  }

console.log("course")
console.log(course.ratings)
    
    return (
        <>
        <MDBTabs justify className='mb-3'>
        <MDBTabsItem >
            {justifyActive==="Overview" &&  <MDBTabsLink style={{background:'white',color:"#212486"}} onClick={() => handleJustifyClick('Overview')} active={justifyActive === 'Overview'}>
            Overview
          </MDBTabsLink> }
          {justifyActive!=="Overview" &&  <MDBTabsLink style={{background:'#212486',color:"white"}} onClick={() => handleJustifyClick('Overview')} active={justifyActive === 'Overview'}>
          Overview
          </MDBTabsLink> }
         
        </MDBTabsItem>
        <MDBTabsItem>
            {justifyActive==="Subtitles" && <MDBTabsLink style={{background:'white',color:"#212486"}}  onClick={() => handleJustifyClick('Subtitles')} active={justifyActive === 'Subtitles'}>
           Subtitles
          </MDBTabsLink>}
          {justifyActive!=="Subtitles" && <MDBTabsLink  style={{background:'#212486',color:"white"}} onClick={() => handleJustifyClick('Subtitles')} active={justifyActive === 'Subtitles'}>
          Subtitles
          </MDBTabsLink>}
        </MDBTabsItem>

        <MDBTabsItem>
            {justifyActive==="Promotion" && <MDBTabsLink style={{background:'white',color:"#212486"}} onClick={() => handleJustifyClick('Promotion')} active={justifyActive === 'Promotion'}>
            Promotions
          </MDBTabsLink>}
          {justifyActive!=="Promotion" && <MDBTabsLink  style={{background:'#212486',color:"white"}} onClick={() => handleJustifyClick('Promotion')} active={justifyActive === 'Promotion'}>
          Promotions
          </MDBTabsLink>}
        </MDBTabsItem>

        <MDBTabsItem>
          {justifyActive==="Ratings & Reviews" && <MDBTabsLink style={{background:'white',color:"#212486"}}  onClick={() => handleJustifyClick('Ratings & Reviews')} active={justifyActive === 'Ratings & Reviews'}>
          Ratings & Reviews
          </MDBTabsLink>}
          {justifyActive!=="Ratings & Reviews" && <MDBTabsLink style={{background:'#212486',color:"white"}}  onClick={() => handleJustifyClick('Ratings & Reviews')} active={justifyActive === 'Ratings & Reviews'}>
          Ratings & Reviews
          </MDBTabsLink>}
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === 'Overview'}>

        <MDBContainer>
            <MDBRow>
                <MDBCol>
                    <MDBCard alignment='center'>
                    <MDBCardHeader>
                    <span style={{ fontWeight: 'bold',fontSize:"25px",textalign: 'center',justifyContent: 'center' }}>Title: 	&nbsp; </span><span style={{fontSize:"20px"}}> {course.title}</span>
                </MDBCardHeader>
                <MDBCardText>
                
            <ul class="list-group list-group-flush rounded-3">

              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <span style={{ fontWeight: 'bold' }}>Subject: </span> {course.subject} <br></br>
              </li>

              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <span style={{ fontWeight: 'bold' }}>Hours: </span> {course.totalHours} <br></br>
              </li>

              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <span style={{ fontWeight: 'bold' }}>Summary: </span> {course.shortSummary} <br></br>
              </li>

              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
                <span style={{ fontWeight: 'bold' }}>Outline: </span> {course.outline} <br></br>
              </li>

              <li class="list-group-item d-flex justify-content-between align-items-center p-3">
              <span style={{ fontWeight: 'bold' }}>Trainees Enrolled: </span> {noOfTrainees} <br></br>
              </li>
              
            </ul>
                </MDBCardText>
                    </MDBCard>
                </MDBCol>
                
                <MDBCol>
                <Video video={previewVideo}/>
                { !isEditingPreviewVideo &&
                    <MDBCardText className="text-muted">{previewVideo}<BiEditAlt class="opacity_img" onClick={(e)=>{setIsEditingPreviewVideo(true);setSuccess(false)}} style={{marginLeft:"10px"}}/></MDBCardText>}
                          
                    { isEditingPreviewVideo &&
                     <p style={{ display: "flex"}}><input type="url"  class="form-control" style={{aligncontent: "flex-start",width:"540px"}} value={previewVideo} onChange={(e)=>{setPreviewVideo(e.target.value)}} /><MdOutlineDoneOutline class="opacity_img" style={{aligncontent: "flex-end",marginTop:"10px"}} onClick={handleChangePreviewVideo} /></p>}
                     {!error && success && <p style={{color:"green"}}>Preview Video added successfully</p>}
                     {error && <p style={{color:"red"}}>{error}</p>}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        </MDBTabsPane>



        <MDBTabsPane show={justifyActive === 'Subtitles'}>
            <MDBContainer>
        <div className="course-content">
            <MDBRow>
                <MDBCol mb="3">
        { subtitles && subtitles.map((item) => 
                
               <div className={subtitle===item ? "subtitle-item open" : "subtitle-item"}>
                <hr />
                <div className="subtitle-title">
                    <span >
                       {item.idWithinCourse} - {item.subtitle}    
                    </span> 
                    <i className="bi-chevron-down toggle-btn"  onClick={()=>{ if(subtitle===item){setSubtitle(null)}else{setSubtitle(item)}  }}></i>
                </div>
            </div>) }
            </MDBCol>
            <MDBCol mb="9"> {subtitle &&
            <div>
                <Video video={subtitle.youtubeLink.link}/>
                <MDBCardText className="text-muted">{subtitle.youtubeLink.description}</MDBCardText>
                <MDBCardText >Hours: {subtitle.hours}</MDBCardText>
                {
                    subtitle.excercises && subtitle.excercises.map((exercise)=>
                        <div>
                        <div className="course-details">
                        <form className="ex"  id="my_form">
                        <text ><strong style={{fontSize:"25px"}}>Question &nbsp; {subtitle.excercises.indexOf(exercise) +1}  :</strong></text><br></br>
                        <label style={{fontWeight: "600"}}>{exercise.question}</label><br></br>
                        <input type="radio" name="r" id="a" value={exercise.choiceA}  disabled={exercise.choiceA!==exercise.answer} checked={exercise.choiceA===exercise.answer} ></input>
                        <label for={exercise.choiceA} >{exercise.choiceA}</label><br></br>
                        <input type="radio" name="r" id="b" value={exercise.choiceB} disabled={exercise.choiceB!==exercise.answer} checked={exercise.choiceB===exercise.answer}></input>
                        <label for={exercise.choiceB}>{exercise.choiceB}</label><br></br>
                        <input type="radio"  name="r" id="c" value={exercise.choiceC} disabled={exercise.choiceC!==exercise.answer} checked={exercise.choiceC===exercise.answer}></input>
                        <label for={exercise.choiceC}>{exercise.choiceC}</label><br></br>
                        <input type="radio"  name="r" id="d" value={exercise.choiceD} disabled={exercise.choiceD!==exercise.answer}  checked={exercise.choiceD===exercise.answer}></input>
                        <label for={exercise.choiceD}>{exercise.choiceD}</label><br></br>
                        </form>
                        </div>
                        </div>
                 ) }
                </div>}
            </MDBCol>
            </MDBRow>
            </div>
            <hr className='last'/>
            </MDBContainer>
        </MDBTabsPane>



        <MDBTabsPane show={justifyActive === 'Promotion'}>
            <MDBContainer>
                <MDBRow>
                    {course.discount===0 && <><h2>There is no recent disounts on this course. </h2>
                    <AiOutlineEdit class="opacity_img" style={{height:"100px",width:"100px",marginLeft:"1200px",transform:"Translate(0px,-22px)"}} onClick={(e)=>{setIsAddingDiscount(true)}} /></>
                                    }

                    {course.discount!==0 && 
                        <>
                        <MDBCardHeader> 
                            <MDBRow style={{marginTop:"25px"}}>
                                <MDBCol md="4">Most Recent Discount</MDBCol>
                                <MDBCol md="4">Start Date</MDBCol>
                                <MDBCol md="4">End Date </MDBCol>
                            </MDBRow>
                        </MDBCardHeader>

                    <MDBRow style={{marginTop:"40px",marginBottom:"70px"}}>
                    <MDBCol md="4"><MDBCardText style={{aligntext:"center"}}> {course.discount} %</MDBCardText></MDBCol>

                    <MDBCol md="4"><CDatePicker disabled locale="en-US" date={course.discountStart}/> </MDBCol>

                    <MDBCol md="4"><CDatePicker disabled locale="en-US" date={course.discountEnd}/></MDBCol>
                    </MDBRow>
                    <AiOutlineEdit class="opacity_img" style={{height:"100px",width:"100px",marginLeft:"1200px",transform:"Translate(0px,-22px)"}} onClick={(e)=>{setIsAddingDiscount(true)}} />
                    </>}
                </MDBRow>


                <Overlay clickDismiss={true} isOpen={isAddingDiscount} closeOverlay={()=>{setIsAddingDiscount(false);setError3rd(null);setSuccess3rd(false)}}>
                <h2>Add a discount</h2>
                <MDBCardText className="text-muted">Adding a new discount will disregard any existing discount.</MDBCardText>
               <br/>
                <div>
                <label>Discount </label>
                <input type='number' onChange={(e) => {setDiscount(e.target.value);setError3rd( null)}} value={discount} min="0" max="100" />
                <label>%</label>
                <br />
                <br />
                <label>Valid From</label>
                <input type='date' onChange={(e) => {setDiscountStart(e.target.value);setError3rd( null)}} value={discountStart} min={new Date().toISOString().split("T")[0]} /><br /><br />
                <label>Valid Until</label>
                <input type='date' onChange={(e) => {setDiscountEnd(e.target.value);setError3rd( null)}} value={discountEnd}  disabled={discountStart === "" ? true: false}
                 min={discountStart ? new Date(discountStart).toISOString().split("T")[0]: ""}/><br /><br />
                 <div >
                <button style={{marginLeft: "300px",marginRight: "0px",backgroundColor:"#212486",color:"white",width:"200px"}} onClick={handleAddDiscount} >Add</button>
                </div>
                {!error3rd && success3rd && <p style={{color:"green"}}>Discount added successfully</p>}
                {wrongRange && <p style={{color: "red"}}>Please enter a discont from 0% to 100%</p>}
                {error3rd && <p style={{color:"red"}}>{error3rd}</p>}
                </div>

                </Overlay>
            </MDBContainer>
        </MDBTabsPane>



        <MDBTabsPane show={justifyActive === 'Ratings & Reviews'}>
            <RatingsView ratings={course.ratings} averageRatings={course.avgRating} />
        </MDBTabsPane>
      </MDBTabsContent>
      </>
    )  
}

export default MyCourseViewInstructor


 