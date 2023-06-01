import React from 'react'
import {useState,useEffect} from "react"
import { useParams } from "react-router-dom";
import ReviewView from '../../components/ReviewView/ReviewView';
import {CardTitle} from "reactstrap";

const CourseReviews=()=>{

    const [reviews,setReviews]=useState(null)
    const params = useParams();
    const id = params.id

   useEffect(()=>{
        const fetchReviews = async ()=>{
            const response = await fetch ('/courses/'+id+'/reviews')
            const json = await response.json()
    
            console.log(json)
    
            if (response.ok)
                {
                    setReviews(json)
                }
        }
    
        fetchReviews()
    
       },[])



    return (
        <div>
            <CardTitle tag="h1">Reviews Page</CardTitle>
            {reviews && reviews["reviews"].map(review => (
              <ReviewView key={review}  review={review}></ReviewView>
            ))}
        </div>
    )
}


export default CourseReviews