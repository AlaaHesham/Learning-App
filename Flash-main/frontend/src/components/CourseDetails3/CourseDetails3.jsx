import { useEffect, useState } from "react"
import LocalCurrency from 'react-local-currency'
import Rate from "../RateCourse/RateCourse"
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useParams } from "react-router-dom";
import RatingsView from "../RatingsView/RatingsView";
import RegisterForCourse from "../RegisterforCourse/RegisterforCourse"
import './CourseDetails3.scss'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Cookie from 'js-cookie'

const CourseDetails3 = ({ course }) => {

    const [role, setRole] = useState(null)
    const [currency, setCurrency] = useState(null)
    const [adjustedPrice, setAdjustedPrice] = useState(null)
    const [error, setError] = useState(null)
    const [newReview, setNewReview] = useState('')
    const [reviewMessage, setReviewMessage] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [ratings, setRatings] = useState(null)
    const [showView, setShowView] = useState(true)
    const [done, setDone] = useState(false);
    const [id, setUserId] = useState(null)

    console.log(showView);

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

   

    const goToSubtitles = () => {
        window.location.href = "/subtitles/" + course._id
    }

    const handleClick = async (e) => {
        window.location.href = "/"+course._id+"/viewCourse";
     }

     const handleClick2 = async (e) => {
        window.location.href = "/course/"+course._id;
     } 
        
        const fetchType = async () => {
          setRole(Cookie.get('role'))
          if (role === "individualTrainee") {
                const response = await fetch('/individualTrainees/' + id)
                const json2 = await response.json()
                if (response.ok) {
                     for (let i = 0; i < json2.currentCourses.length; i++) {
                        if (json2.currentCourses[i].title == course._id) {
                            setShowView(false)
                             break
                        }
                     }
                }

        }
        }

       
    

   
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
                setAdjustedPrice(rate * course.price)
            }
        }

        getAdjustedPrice()
    })

    const getDiscount = async () => {

        const response = await fetch('/courses/' + course._id + '/discount')
        const json = await response.json()

        if (response.ok) {
            setDiscount(json.discount)
            console.log(json.discount)
        }
    }

    const fetchRatings = async () => {

        const response = await fetch('/courses/' + course._id + '/ratings')
        const json = await response.json()

        console.log(json)

        if (response.ok) {
            setRatings(json)
        }


    }

    useEffect(() => {

        if (isInitialRender) {
            setIsInitialRender(false);
            getDiscount()
            fetchRatings()
            fetchType()
        }

    })

    const handleNewReview = (event) => {
        setNewReview(event.target.value)
    }

    const addCourseReview = async () => {
        if (newReview == null || newReview === "") {
            setReviewMessage('Please enter a review');
        }
        else {
            fetch('/courses/' + course._id + '/addReview', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    review: newReview
                    //, reviewerID:"6359b0cb73cc9ff23c41caf7" handled
                }),
            })
                .then((res) => res.json(),
                    setNewReview(''),
                    setReviewMessage("Review added successfully"))
                .catch((err) => console.log('error: ', err))
        }
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
                            <strong>{course.title} </strong>
                        </Typography>
                        <Typography variant="h7" className='t2'>
                        <h7><strong>Total hours: </strong>{course.totalHours}</h7>
                        <h7 id='ratings'><strong>Ratings: </strong>{course.avgRating}</h7>
                        {role !== "corporateTrainee" && discount == 0 ?
                        <h7><strong>Price: </strong>{adjustedPrice} {currency}</h7> :<h7></h7>
                        }
                        {role !== "corporateTrainee" && discount != 0 ?
                        <h7><strong>Price: </strong><strike>{adjustedPrice}</strike> &nbsp;  &nbsp; {adjustedPrice * (1 - discount)} {currency}</h7> :
                        <h7></h7>
                        }
                        </Typography>
                    </CardContent>
                    <CardActions className='cA'>

                        {showView? 
                            <Button style={{backgroundColor: "#212486"}} size="small"  variant="contained"  className='b1' CourseId={course._id} TraineeId={id}  onClick={handleClick}>View</Button>
                            :
                            <Button style={{backgroundColor: "#fa7466"}} size="small"  variant="contained"  className='b1' CourseId={course._id} TraineeId={id}  onClick={handleClick2}>Open</Button>     
                        }    
                    </CardActions>
                </Card>     
            </div>
           
    )

}

export default CourseDetails3