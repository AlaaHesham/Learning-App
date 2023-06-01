import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import TextField from '@mui/material/TextField';
import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import StarIcon from '@mui/icons-material/Star'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './Rate.scss'


export default function Rate({value,review,course,show,onHide}) {
    
    const [rate, setRate] = useState(0)
    const [myReview,setMyReview]=useState("")
    const handleRating=async(number)=>{
      setRate(number)
        const res=await axios.patch('/courses/addRating',{
            course:course,
            rate:number
        })
        

    }
    const handleReview=async(e)=>{
        e.preventDefault()
        const res=await axios.patch('/courses/addReview',{
            course:course,
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
        <div className='stars'>
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
        <Button onClick={(e)=>{onHide();handleReview(e)}}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}