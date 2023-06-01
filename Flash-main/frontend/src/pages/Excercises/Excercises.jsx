import { useEffect, useState, useContext } from "react"
import { Route, Link, Routes, useParams } from 'react-router-dom'

import Exercise from '../../components/Exercises/Exercises'

var exSize;
const Excercises = ({ id }) => {


  const [subtitles, setSubtitles] = useState(null)
  const [done, setDone] = useState(false)

  useEffect(() => {

    const fetchExcercises = async () => {


      const response = await fetch('/subtitles/' + id + '/excercises')
      const json = await response.json()

      console.log(json)

      if (response.ok) {
        setSubtitles(json)


      }

      else {
        console.log("error")
      }

    }

    fetchExcercises()
  }, [id])


  useEffect(() => {
    if (subtitles != null) {

      setDone(true)
      exSize = subtitles[0].excercises.length;

    }
  }, [subtitles])

  return (
    <div className="allexcercises">
      <h2 style={{ color: "#1aac83" }}>Exercises</h2>

      {done &&
        <div className="excercises">

          {subtitles[0].excercises && subtitles[0].excercises.map(excercises => (
            <Exercise key={excercises._id} excercise={excercises}></Exercise>
          ))}
        </div>}

    </div>
  )

}



export { Excercises, exSize }