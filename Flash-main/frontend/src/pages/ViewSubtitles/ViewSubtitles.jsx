//not used. use subtitles.js instead
import Subtitle from "../../components/Subtitle/Subtitle"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ViewSubtitles = ()=>{
    const [subtitles,setSubtitles]= useState(null)
    const params = useParams();
    const courseid = params.id

    useEffect(()=>{
        const fetchSubtitles = async ()=>{
            const response = await fetch ('/subtitles/course/'+courseid)
            const json = await response.json()

            console.log(json)

            if (response.ok)
            {
                setSubtitles(json)
            }
          }

          fetchSubtitles()
    },[])
    return(
        <div className="all-subtitles">
             <div className="subtitle">
            {subtitles && subtitles.map(subtitle => (
              <Subtitle key={subtitle._id}  subtitle={subtitle}></Subtitle>
            ))}
          </div>
        </div>
    )

}

export default ViewSubtitles