import { useEffect,useState } from "react"



const Subtitle = ({subtitle})=>{
    const [isInstructor,setIsInstructor] = useState(null)
    const viewEx = ()=>{
        window.location.href="/excercises/"+subtitle._id 

    }
    const addVideo=()=>{
        window.location.href="/viewSubtitles/"+subtitle._id 
    }

    const addExcercise=()=>{
        window.location.href="/instructor/excercises/"+subtitle._id 
    }

    useEffect(()=>{
        const fetchType = async ()=>{
            const response = await fetch ('/login/type')
            const json = await response.json()
    
            console.log(json)
    
            if (json == "instructor")
                {
                    setIsInstructor(true)
                }
            else{
                setIsInstructor(false)

            }
        }
    
        fetchType()
    
       },[])
    return (
        <div className="course-details">
            <h4><strong>Subtitle: </strong>{subtitle.subtitle}</h4>
            <p><strong> hours: </strong>{subtitle.hours}</p>

           
           



           {!isInstructor&& <button className="btn" onClick={viewEx}> Go to excercises</button>}
            {isInstructor&&<button className="btn" onClick={addVideo}>Add a Video</button>}
            <br></br>
            {isInstructor&&<button className="btn" onClick={addExcercise}>Add an Excercise</button>}

            <br></br>
        </div>
    )
   
}

export default Subtitle
