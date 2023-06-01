import React from 'react'
import { useState } from "react"
import ExcerciseAdding from "../../components/ExcerciseAdding/ExcerciseAdding"
import { useParams } from "react-router-dom";
import axios from "axios";

const InstructorAddExcercise = () => {

  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false)
  const [excercises, setExcercises] = useState([]);
  const params = useParams();
  const id = params.id

  const initiateExcercise = () => {
    return {
      question: '',
      choiceA: '',
      choiceB: '',
      choiceC: '',
      choiceD: '',
      answer: '',
    }
  }

  const add_input = (e) => {
    e.preventDefault()
    setExcercises([...excercises, initiateExcercise()])

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const entry = { excercises }
    const response = await fetch('/subtitles/' + id + '/addExcercises', {
      method: 'PATCH',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()
    if (!response.ok) {
      setError(json.error)
    }

    if (response.ok) {
      setExcercises([])
      setError(null)
      setSubmitted(true)
    }
  }


  return (
    <div className="Adding-excercise">
      <label className='label2'>Excercises</label>
      <button className='btn btn-primary' onClick={add_input}>+ Excercise</button><br />
      {
        excercises.map(excercise => {
          return (
            <div key={excercise}>
              <ExcerciseAdding
                questionChanged={newQuestion => {
                  excercise.question = newQuestion
                  let newExcercises = [...excercises];
                  setExcercises(newExcercises)
                }}
                choiceAChanged={newChoiceA => {
                  excercise.choiceA = newChoiceA
                  let newExcercises = [...excercises];
                  setExcercises(newExcercises)
                }}
                choiceBChanged={newChoiceB => {
                  excercise.choiceB = newChoiceB
                  let newExcercises = [...excercises];
                  setExcercises(newExcercises)
                }}
                choiceCChanged={newChoiceC => {
                  excercise.choiceC = newChoiceC
                  let newExcercises = [...excercises];
                  setExcercises(newExcercises)
                }}
                choiceDChanged={newChoiceD => {
                  excercise.choiceD = newChoiceD
                  let newExcercises = [...excercises];
                  setExcercises(newExcercises)
                }}
                answerChanged={newAnswer => {
                  excercise.answer = newAnswer
                  let newExcercises = [...excercises];
                  setExcercises(newExcercises)
                }}
                excercise={excercise}
              />
              <br />
            </div>
          )
        })
      }

      <button onClick={handleSubmit}>add</button>
      <div>
        {!error && submitted && <p>Excercises added successfully</p>}
        {error && <p>{error}</p>}
      </div>
    </div>
  )

}

export default InstructorAddExcercise