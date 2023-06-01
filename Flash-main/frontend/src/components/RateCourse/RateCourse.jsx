import { useEffect,useState } from "react"
import { Rating } from 'react-simple-star-rating'


const Rate = ({courseID})=>{

    const [value, setValue] = useState(null);
    const [ratingMessage,setRatingMessage] =useState(null)

    const handleRating = async (rate) => {
        
        setValue(rate);
        
        const response =await fetch('/courses/'+courseID+'/addRating', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              rate: rate
              //, raterID:"6359b0cb73cc9ff23c41caf7" //when login is added, replace this with session.id
            }),
          })
            .then((res) => res.json())
            .then((res) =>{ return res.message})
            .catch((err) => console.log('error: ', err))

            const saveMessage = async () => {
              const a = await response;
              setRatingMessage(a);
            };

            saveMessage();
            //console.log(ratingMessage)
      }

    return (
        <div>
            {!value &&<Rating onClick={handleRating} />}
            {value &&<p>{ratingMessage}</p>}
        </div>
    )
    
}



export default Rate