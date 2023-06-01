import { MDBCard, MDBCardBody, MDBCardLink, MDBCardHeader, MDBCol, MDBRow, MDBCardImage } from "mdb-react-ui-kit";
import { useEffect, useState } from "react"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import RatingsView from "../RatingsView/RatingsView";
import { AiFillStar } from "react-icons/ai"
import "./InstructorCourseComponent.scss"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


const InstructorCourseComponent = ({ course }) => {

    const [currency, setCurrency] = useState(null)
    const [adjustedPrice, setAdjustedPrice] = useState(null)
    const [discount, setDiscount] = useState(0);
    const [isInitialRender, setIsInitialRender] = useState(true)
    const id = course["_id"]
    console.log(course)

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

            const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=da8698baa20640669fb02c79f6afb3e0')
            const json = await response.json()//returns a json object with an array of all exchange rates with USD as base

            const rate = json.rates[currency]


            if (response.ok) {
                setAdjustedPrice(rate * course.price)
            }
        }

        getAdjustedPrice()
    }, [currency])

    const getDiscount = async () => {

        const response = await fetch('/courses/' + course._id + '/discount')
        const json = await response.json()

        if (response.ok) {
            setDiscount(json.discount)
            console.log(json.discount)
        }
    }


    useEffect(() => {

        if (isInitialRender) {
            setIsInitialRender(false);
            getDiscount()
        }

    })



    const displayReviews = () => {
        window.location.href = "/courses/" + id + "/reviews"
    }

    return (
        <div className="left" >
        <Card sx={{}}className='card'>
            {course.subject==="cs" && 
            <CardMedia
            sx={{ objectFit: "contain"}}
            component="img"
            alt="green iguana"
            width="300"
            height="100"
            image="https://cdn.iconscout.com/icon/premium/png-256-thumb/computer-science-1847495-1567216.png"
            variant="contained"
            className='cardMedia'
        />
        }
        {course.subject==="math" && 
            <CardMedia
            sx={{ objectFit: "contain"}}
            component="img"
            alt="green iguana"
            width="300"
            height="100"
            image="https://i.pinimg.com/originals/8e/80/2a/8e802a0b020d2a38f427ac80a70d23b0.png"
            variant="contained"
            className='cardMedia'
        />
        }

    {course.subject==="eng" && 
            <CardMedia
            sx={{ objectFit: "contain"}}
            component="img"
            alt="green iguana"
            width="300"
            height="100"
            image="https://img.freepik.com/free-vector/english-book-illustration-design_23-2149509019.jpg"
            variant="contained"
            className='cardMedia'
        />
        }
            
            <CardContent className='cardContent'>
                <Typography gutterBottom variant="h5" component="div" className='t1'>
                   <a href={"myCourses/" + id} > <strong>{course.title} </strong></a>
                </Typography>
                <Typography style={{color:"#808080"}} gutterBottom variant="h5" component="div" className='t1'>
                   <strong>{course.subject} </strong>
                </Typography>
                <Typography variant="h7" className='t2' style={{marginTop:"-40px"}}>
                { discount == 0 ?
                <h7><strong>Price: </strong>{adjustedPrice} {currency}</h7> :<h7></h7>
                }
                {discount != 0 ?
                <h7><strong>Price: </strong><strike>{adjustedPrice}</strike> &nbsp;  &nbsp; {adjustedPrice * (1 - discount)} {currency}</h7> :
                <h7></h7>
                }
                </Typography>
            </CardContent>
        </Card>     
    </div>
    )
}

export default InstructorCourseComponent

/* <div className="course-Title">
            <p><strong>Course Title:</strong>{course.title}</p>
            <Popup trigger={<button> View Ratings for Course </button>} 
            position="right center">
            <RatingsView ratings={ratings} ></RatingsView>
            </Popup>

            <button onClick={displayReviews}> View Reviews for Course </button>
            <button onClick={addDiscount}>Add a Discount</button>
            <button onClick={addPreviewVideo}>Add a Preview Video</button>
            <button onClick={viewSubtitles}>View Subtitles</button>
        </div> */

/*
const [ratings,setRatings]=useState(null)
 useEffect(()=>{
        const fetchRatings = async ()=>{
            
            const response = await fetch ('/courses/'+id+'/ratings')
            const json = await response.json()
    
            console.log(json)
    
            if (response.ok)
                {
                    setRatings(json)
                }


        }
    
        //fetchRatings()
    
       },[])
 */

       /*
       MDBCard>
                <MDBCardBody>
                    <MDBRow>
                        <MDBCol md="1">
                            {course.subject === "eng" && <img src="https://img.freepik.com/free-vector/english-book-illustration-design_23-2149509019.jpg" alt='...' width="50px" height="50px" style={{ width: '50px', height: '50px' }} />}
                            {course.subject === "cs" && <img src='https://cdn.iconscout.com/icon/premium/png-256-thumb/computer-science-1847495-1567216.png' alt='...' width="50px" height="50px" style={{ width: '50px', height: '50px' }} />}
                            {course.subject === "math" && <img src='https://i.pinimg.com/originals/8e/80/2a/8e802a0b020d2a38f427ac80a70d23b0.png' alt='...' width="50px" height="50px" style={{ width: '50px', height: '50px' }} />}
                        </MDBCol>
                        <MDBCol md="11">
                            <MDBCardHeader>
                                <span style={{ fontWeight: 'bold' }}>Title:  </span>
                                <a href={"myCourses/" + id} >{course.title}</a>
                                <br></br>

                                <span style={{ fontWeight: 'bold' }}>Subject: </span>
                                {course.subject}
                                <br></br>

                                <span style={{ fontWeight: 'bold' }}>Price: </span>
                                <strike>{adjustedPrice}</strike> &nbsp;  &nbsp; {adjustedPrice * (1 - discount)} {currency}
                            </MDBCardHeader>
                        </MDBCol>
                    </MDBRow>
                </MDBCardBody>
            </MDBCard>
        */