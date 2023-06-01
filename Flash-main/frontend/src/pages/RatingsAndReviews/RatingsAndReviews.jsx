//this is the page to display the instructor's ratings and reviews

import { useState, useEffect } from "react"
import RatingsView from "../../components/RatingsView/RatingsView"
import ReviewView from '../../components/ReviewView/ReviewView';
import { CardTitle } from "reactstrap";
import Rating from '@mui/material/Rating';
import "./RatingsAndReviews.css"
const RatingsAndReviews = () => {

    //const [ratings, setRatings] = useState(null)
    const [reviews, setReviews] = useState([])
    const [starsRating, setStarsRating] = useState([0, 0, 0, 0, 0])
    const [avrgRating, setAvrgRating] = useState(0)
    const [numOfRating, setNumOfRating] = useState(0)
    const [show, setShow] = useState(false)
    useEffect(() => {
        const fetchRatings = async () => {

            const response = await fetch('/instructors/ratings')
            const json = await response.json()

            if (response.ok) {
                //setRatings(json)
                let newAvrgRating = 0
                let newNumOfRating = 0
                let stars = [0, 0, 0, 0, 0]
                for (let i = 0; i < json.ratings.length; i++) {
                    newNumOfRating++
                    newAvrgRating += json.ratings[i].rating
                    stars[json.ratings[i].rating - 1]++
                }
                setNumOfRating(newNumOfRating)
                setAvrgRating(newAvrgRating / newNumOfRating)
                setStarsRating(stars)
            }
        }



        fetchRatings()

    }, [])

    useEffect(() => {
        const fetchReviews = async () => {
            const response = await fetch('/instructors/reviews')
            const json = await response.json()

            if (response.ok) {
                console.log(json)
                setReviews(json)
            }
        }
        fetchReviews()

    }, [])

    const showAllRattings = () => {
        setShow(!show)
    }
    return (
        <div>
            <h2>Ratings</h2>
            <p>Your average rating</p>

            <span className="avrg-rating">{avrgRating}</span>
            <Rating name="read-only" value={avrgRating} precision={0.1} size="large" readOnly />
            <a onClick={showAllRattings} className="num-of-rating">({numOfRating} ratings)</a>

            {show && <div id="allRatings">
                <Rating name="read-only" value={5}  size="large" readOnly /><span>{starsRating[4]}</span> <br />
                <Rating name="read-only" value={4}  size="large" readOnly /><span>{starsRating[3]}</span><br />
                <Rating name="read-only" value={3}  size="large" readOnly /><span>{starsRating[2]}</span><br />
                <Rating name="read-only" value={2}  size="large" readOnly /><span>{starsRating[1]}</span><br />
                <Rating name="read-only" value={1}  size="large" readOnly /><span>{starsRating[0]}</span><br />
            </div>}
            <h2>Reviews</h2>
            <div >
                {reviews.map(review => (
                    <div className="instructor-review" key={review._id}>
                        <ReviewView style={{width:"700px"}} review={review} />
                     
                    </div>
                  
                ))}
               
            </div>
            {/* {ratings && <RatingsView ratings={ratings} ></RatingsView>}
            <CardTitle tag="h1">Reviews Page</CardTitle>
            {reviews && reviews.reviews.map(review => (
                <ReviewView key={review} review={review}></ReviewView>
            ))} */}
        </div>
    )
}

export default RatingsAndReviews