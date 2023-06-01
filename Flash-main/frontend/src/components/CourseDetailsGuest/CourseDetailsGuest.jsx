import { useEffect, useState } from "react"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useParams } from "react-router-dom";
import RatingsView from "../RatingsView/RatingsView";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const CourseDetailsGuest = ({ course }) => {

    const [currency, setCurrency] = useState(null)
    const [adjustedPrice, setAdjustedPrice] = useState(null)
    const [error, setError] = useState(null)
    const [discount, setDiscount] = useState(0);
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [ratings, setRatings] = useState(null)

    const params = useParams();
    const id = params.id

    const handleClick = async (e) => {
        window.location.href = "/"+course._id+"/viewCourseGuest";
     }


    /*const handleClick = async (e) => {
        e.preventDefault()
        const response = await fetch("/courses/" + course._id + "/guest", {
            method: "GET",
        })
        const response2 = await fetch("/instructors/" + course.instructor + "/guest", {
            method: "GET",
        })
        const response3 = await fetch("/subtitles/course/" + course._id + "/guest", {
            method: "GET",
        })
        const json = await response.json()
        const inst = await response2.json()
        const subs = await response3.json()
        let text = ""
        for (let i = 0; i < subs.length; i++) {
            text += subs[i].subtitle + '\n' + "sub hours: " + subs[i].hours + '\n' + "sub excercises: " + subs[i].excercises.length + " questions" + '\n'
        }
        if (response.ok) {
            const data = "title: " + json.title + '\n' + "subject: " + json.subject + '\n' +
                "rating: " + json.avgRating + '\n' + "price: " + adjustedPrice + '\n' + "subtitles: " + '\n' +
                text + "Instructor: " + inst.firstName + "  " + inst.lastName + '\n' +
                "Course Hours: " + json.totalHours
            window.alert(data)
            setError(null)
        }
    }*/

    useEffect(() => {
        const fetchCurrency = async () => {
            const response = await fetch('/login/currencyGuest')
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
    })

    const getDiscount = async () => {

        const response = await fetch('/courses/' + course._id + '/discount/guest')
        const json = await response.json()

        if (response.ok) {
            setDiscount(json.discount)
            console.log(json.discount)
        }
    }

    const fetchRatings = async () => {

        const response = await fetch('/courses/' + course._id + '/ratings/guest')
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
        }

    })

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
                {discount == 0 ?
                <h7><strong>Price: </strong>{adjustedPrice} {currency}</h7> :<h7></h7>
                }
                { discount != 0 ?
                <h7><strong>Price: </strong><strike>{adjustedPrice}</strike> &nbsp;  &nbsp; {adjustedPrice * (1 - discount)} {currency}</h7> :
                <h7></h7>
                }
                </Typography>
            </CardContent>
            <CardActions className='cA'>
                <Button style={{backgroundColor: "#212486"}} size="small"  variant="contained"  className='b1' CourseId={course._id} TraineeId={id}  onClick={handleClick}>view</Button>
             </CardActions>
        </Card>     
    </div>
    )

}

export default CourseDetailsGuest


/*
 <div>
            <div className="course-details" >
                <h4><strong>Title: </strong>{course.title}</h4>
                <p><strong>Total hours: </strong>{course.totalHours}</p>
                <p id='ratings'><strong>Ratings: </strong>{course.avgRating}</p>
                {discount == 0 ?
                    <p><strong>Price: </strong>{adjustedPrice} {currency}</p> :
                    <p></p>}

                {discount != 0 ?
                    <p><strong>Price: </strong><strike>{adjustedPrice}</strike> &nbsp;  &nbsp; {adjustedPrice * (1 - discount)} {currency}</p> :
                    <p></p>}


                <p><button onClick={handleClick}> view</button><br></br></p>:<p></p>
                <Popup trigger={<button> View Ratings for Course </button>}
                    position="right center">
                    <RatingsView ratings={ratings} ></RatingsView>
                </Popup>
            </div>
        </div>
*/