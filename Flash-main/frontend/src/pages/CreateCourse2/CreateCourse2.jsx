import { useState, useEffect } from "react"
import axios from 'axios'
import { useParams } from "react-router-dom"
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ExcerciseAdding from "../../components/ExcerciseAdding/ExcerciseAdding"

const CreateCourse2 = () => {
    const [subtitles, setSubtitles] = useState([])
    const [index, setIndex] = useState(0)
    const [excercises, setExcercises] = useState([]);
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [lecture,setLecture]=useState()
    const [error, setError] = useState(null)
    const [error2, setError2] = useState(null)
    const [error3, setError3] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [uploadFeedback,setUploadFeedback]=useState(null)

    const params = useParams()
    const id = params.id
    useEffect(() => {
        const fetchSubtitles = async () => {
            const response = await fetch('/courses/' + id + '/subtitles/getSubtitles')
            const json = await response.json()

            //console.log(json.id)

            if (response.ok) {
                setSubtitles(json)
            }
        }

        fetchSubtitles()
    }, [])

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
        setUploadFeedback(null)

        
        const entry = { excercises }
        const entry2 = { link, description }

        const response = await fetch('/subtitles/' + subtitles[index]._id + '/addExcercises', {
            method: 'PATCH',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        const response2 = await fetch('/subtitles/' + subtitles[index]._id + '/addVideo', {
            method: 'PATCH',
            body: JSON.stringify(entry2),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json2 = await response2.json()

        if (lecture) {
            const data = new FormData();
            const filename = Date.now() + lecture.name;
            data.append("name", filename);
            data.append("file", lecture);
            try {
              await axios.post("/upload", data);
            } catch (err) {
                setError3(err)
            }
            try {
                await axios.patch('/subtitles/' + subtitles[index]._id + '/addLecture',{
                    lecture:filename
                })
            } catch (err) {
                  setError3(err)
            }
        }
        
        if (!response.ok) {
            setError(json.error)
        }
        if (!response2.ok) {
            setError2(json2.error)
        }
        if (response.ok && response2.ok&&error3===null) {

            setLink('')
            setDescription('')
            setLecture(null)
            setExcercises([])
            setError(null)
            setError2(null)
            setError3(null)
            setSubmitted(true)
            setIndex(index + 1)
        }
    }
    

    return (
        <div style={{minHeight:"140vh"}}>

        <div className="create-course">
            {
                index < subtitles.length ?
                    subtitles[index] &&
                    <div>
                        <div className="subtitle-title-container">
                            <label className="subtitle-title">Subtitle:</label>
                            <label className="data"> {subtitles[index].subtitle}</label>
                        </div>
                        <label className='label2'>Content</label>

                        <div className="create-course-tr">
                            <label className="label1"> Subtitle Video Link </label><br />
                            <input type='text' placeholder="Enter a Youtube link" onChange={(e) => setLink(e.target.value)} value={link} /><br />

                            <label className="label1">Video Description </label><br />
                            <textarea type='text' placeholder="Enter a short description of the video" onChange={(e) => setDescription(e.target.value)} value={description} /><br />
                        </div>
                        {error2 && <p className="create-course-error">{error2}</p>}
                        <label className='label2'>Lectures</label>
                        <div className="create-course-tr">
                            <label htmlFor="fileInput">
                              Upload lecture documents <UploadFileIcon class="opacity_img" style={{width:"30px",height:"30px"}}/> optional field
                            </label>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: "none" }}
                                onChange={(e) => {setLecture(e.target.files[0]);setError(null);setUploadFeedback("Uploaded successfully")}}
                            />
                            {uploadFeedback && <p style={{color:"green"}}>{uploadFeedback}</p>}
                        </div>
                        <div className="Adding-excercise">
                            <label className='label2'>Excercises</label>
                            <button style={{backgroundColor:"#ec6556",fontSize:"18px",marginLeft:"400px"}} className='btn btn-primary' onClick={add_input}>+ Excercise</button><br />
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
                                                removeExercise={() =>
                                                    setExcercises(excercises.filter(ex => ex !== excercise))
                                                }
                                            />
                                            <br />
                                        </div>
                                    )
                                })
                            }
                            <div className="submit">
                            <button className="generalbutton" style={{width:"80px",marginRight:"20px"}} onClick={handleSubmit}>Next</button>
                            </div>
                            <div>
                                {/* {!error && submitted && <p>Excercises added successfully</p>} */}
                                {error && <p className="create-course-error">{error}</p>}
                            </div>
                        </div>
                    </div>
                    :
                    <p className="create-course-done"> Course created successfully! <br></br> <a style={{color:"#d55b5c                    "}} href="/instructor/myCourses">Go back to my courses </a></p>
                  
            }
        </div>
        </div>

    )
}

export default CreateCourse2