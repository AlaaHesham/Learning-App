import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './RateInstructor.scss'


export default function RateInstructor({value,review,instructor,show,onHide}) {
    
    const [rate, setRate] = useState(0)
    const [myReview,setMyReview]=useState("")
    const handleRating=async(number)=>{
      setRate(number)
        const res=await axios.patch('/instructors/'+instructor+'/addRating',{
            rate:number
        })
        

    }
    const handleReview=async(e)=>{
        e.preventDefault()
        const res=await axios.patch('/instructors/'+instructor+'/addReview',{
            review:myReview
        })
        console.log(res)
    }
  return (
    <Modal className='modal'
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className='title'>
          Your Review
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='stars' style={{cursor:"pointer"}}>
        {
            (rate===0&&value===0)&&<div className='star'>
                <StarBorderIcon className='icon' onClick={()=>{handleRating(1)}} /> 
                <StarBorderIcon className='icon' onClick={()=>{handleRating(2)}}/>
                <StarBorderIcon className='icon'onClick={()=>{handleRating(3)}}/> 
                <StarBorderIcon className='icon'onClick={()=>{handleRating(4)}}/>
                <StarBorderIcon className='icon' onClick={()=>{handleRating(5)}}/>
            </div>
        }
        {
            ((rate===0&&value===1)||rate===1)&& <div className='star'>
                <StarIcon className='icon' onClick={()=>{handleRating(1)}}/> 
                <StarBorderIcon className='icon'onClick={()=>{handleRating(2)}}/>
                <StarBorderIcon className='icon' onClick={()=>{handleRating(3)}}/>
                <StarBorderIcon className='icon' onClick={()=>{handleRating(4)}}/>
                <StarBorderIcon className='icon' onClick={()=>{handleRating(5)}}/>
            </div>
        }
        {
            ((rate===0&&value===2)||rate===2)&& <div className='star'>
                <StarIcon className='icon' onClick={()=>{handleRating(1)}}/> 
                <StarIcon className='icon' onClick={()=>{handleRating(2)}}/> 
                <StarBorderIcon className='icon' onClick={()=>{handleRating(3)}}/> 
                <StarBorderIcon className='icon' onClick={()=>{handleRating(4)}}/>
                <StarBorderIcon className='icon'  onClick={()=>{handleRating(5)}}/>
            </div>
        }
        {
            ((rate===0&&value===3)||rate===3)&& <div className='star'>
                <StarIcon className='icon'  onClick={()=>{handleRating(1)}}/> 
                <StarIcon className='icon'  onClick={()=>{handleRating(2)}}/> 
                <StarIcon className='icon'  onClick={()=>{handleRating(3)}}/>
                <StarBorderIcon className='icon'  onClick={()=>{handleRating(4)}}/>
                <StarBorderIcon className='icon'  onClick={()=>{handleRating(5)}}/>
            </div>
        }
        {
           ((rate===0&&value===4)||rate===4)&& <div className='star'>
                <StarIcon className='icon'  onClick={()=>{handleRating(1)}}/> 
                <StarIcon className='icon'  onClick={()=>{handleRating(2)}}/> 
                <StarIcon className='icon'  onClick={()=>{handleRating(3)}} /> 
                <StarIcon className='icon'  onClick={()=>{handleRating(4)}}/> 
                <StarBorderIcon className='icon'  onClick={()=>{handleRating(5)}}/>
            </div>
        }
        {
            ((rate===0&&value===5)||rate===5)&& <div className='star'>
                <StarIcon  className='icon'  onClick={()=>{handleRating(1)}}/>
                <StarIcon className='icon'  onClick={()=>{handleRating(2)}}/> 
                <StarIcon className='icon'  onClick={()=>{handleRating(3)}}/> 
                <StarIcon className='icon'  onClick={()=>{handleRating(4)}}/>
                <StarIcon className='icon'  onClick={()=>{handleRating(5)}}/>
            </div>
        }
        </div>
        <TextField className='review'
          id="outlined-textarea"
          label="Tell us your experience"
          placeholder="Placeholder"
          multiline
          fullWidth
          onChange={(e)=>{setMyReview(e.target.value)}}
          value={myReview===""?review:myReview}
        />
      
      </Modal.Body>
      <Modal.Footer>
        <Button style={{backgroundColor:"#212486"}} onClick={(e)=>{onHide();handleReview(e)}}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}













/*import { useEffect,useState } from "react"
import { Rating } from 'react-simple-star-rating'


const RateInstructor = ({courseID})=>{

    const [value, setValue] = useState(null);
    const [instructor, setInstructor] = useState(null)
    const [ratingMessage,setRatingMessage]=useState(null)

    useEffect(()=>{
      const fetchInstructor= async ()=>{
          const response = await fetch ('/courses/'+courseID+"/courseInstructor")
          const json = await response.json()
         
          if (response.ok)
              {
                  setInstructor(json)
              }
      }
  
      fetchInstructor()
  
     },[])

    const handleRating = async (rate) => {
        
        setValue(rate);
        
        const response = await fetch('/instructors/'+instructor["instructor"]+'/addRating', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rate: rate
              //,raterID:"6359b0cb73cc9ff23c41caf7" //when login is added, replace this with session.id
            }),
          })
            .then((res) => res.json())
            .then((res) =>{ return res.message})
            .catch((err) => console.log('error: ', err))

            const saveMessage = async () => {
              const a = await response;
              setRatingMessage(a);
              console.log(a)
            };

            saveMessage();
      }

    return (
        <div>
            {!value &&<Rating onClick={handleRating} />}
            {value &&<p>{ratingMessage}</p>}
        </div>
    )
    
}



export default RateInstructor*/