import { useEffect,useState} from "react"
import {Route, Link, Routes, useParams} from 'react-router-dom'


import Subtitle from '../../components/Subtitle/Subtitle'
import RateInstructor from "../../components/RateInstructor/RateInstructor"


const Subtitles =() => {
    //console.log(params)
    const {id} = useParams();

    const [subtitles , setSubtitles] = useState(null)
    const [newReview,setNewReview] = useState('')
    const [reviewMessage, setReviewMessage] = useState('');
    const [instructor, setInstructor] = useState(null)
    const [type,setType] = useState(null)

    useEffect(()=>{
        
        const fetchSubtitles = async ()=>{
           

            const response = await fetch ('/courses/'+id+'/subtitles/getSubtitles')
            const json = await response.json()

            console.log(json)

            if (response.ok)
            {
                setSubtitles(json)
            }
          }

          fetchSubtitles()

          const fetchInstructor= async ()=>{
            const response = await fetch ('/courses/'+id+"/courseInstructor")
            const json = await response.json()
           
            if (response.ok)
                {
                    setInstructor(json)
                }
              }

            fetchInstructor()

           
              const fetchType = async ()=>{
                  const response = await fetch ('/login/type')
                  const json = await response.json()
          
                  console.log(json)
          
                  if (response.ok)
                      {
                          setType(json)
                      }
                  
              }
          
              fetchType()
    },[id])

    const handleNewReview=(event)=>{
      setNewReview(event.target.value)
 }

 const addInstructorReview=async()=>{
  if(newReview == null || newReview==="")
  {
      setReviewMessage('Please enter a review');
   }
 else{
  
  fetch('/instructors/'+instructor["instructor"]+'/addReview', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        review: newReview
        //,reviewerID:"6359b0cb73cc9ff23c41caf7" //when login is added, replace this with session.id
      }),
    })
      .then((res) => res.json(),
       setNewReview(''),
       setReviewMessage("Review added successfully"))
      .catch((err) => console.log('error: ', err))
 }
 }
    

    return (
        <div className="allsubtitles" style={{display: "flex", flexDirection: "row"}}>
          
          <div className="subtitles" style={{flex:1}}>

            {subtitles && subtitles.map(subtitles => (
              <Subtitle key={subtitles._id} subtitle={subtitles}></Subtitle>
            ))}
          </div>

          {type!=="instructor" &&
          <div style={{width: 250, alignItems: "center"}}>
            <h4 >Help Your instructor improve!</h4>
          <RateInstructor  courseID={id}></RateInstructor>
          <input placeholder='Enter your review'  onChange={handleNewReview} value={newReview}></input>
          <button onClick={addInstructorReview}>Add Review</button>
            {reviewMessage?
            <p className="error"> {reviewMessage} </p>:<p></p>
            }
          </div>}

        </div>
      )
    
}

export default Subtitles