import { TableRow } from "@mui/material"
import { useState, useEffect } from "react"
import SubtitlesCreator from "../../components/SubtitlesCreator/SubtitlesCreator"
import "./CreateCourse.css"
const CreateCourse = () => {
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState('')
    const [price, setPrice] = useState('')
    const [outline, setOutline] = useState('')
    //const [totalHours, setTotalHours] = useState('')
    const [shortSummary, setShortSummary] = useState('')
    const [error, setError] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [previewVideo, setPreviewVideo] = useState('')
    const [subtitles, setSubtitles] = useState([{
        subtitle: '',
    }])
    const [userId, setUserId] = useState(null)
    const [totalHours,setTotalHours]=useState(0)


    useEffect(() => {
        const fetchID = async () => {
            const response = await fetch('/login/userId')
            const json = await response.json()

            //console.log(json.id)

            if (response.ok) {
                setUserId(json.id)
            }
        }

        fetchID()
    }, [])

    const initiateSubtitle = () => {
        return {
            subtitle: '',
        }
    }

    const add_input = (e) => {
        e.preventDefault()
        setSubtitles([...subtitles, initiateSubtitle()])
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        const entry = { title, subject, price, subtitles, outline, shortSummary, previewVideo }
        const response = await fetch('/instructors/' + userId + '/myCourses/addCourse', {
            method: 'POST',
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
            setTitle('')
            setPrice('')
            setShortSummary('')
            setSubject('')
            setOutline('')
            setTotalHours('')
            setError(null)
            setSubmitted(true)
            setSubtitles([])
            setSubtitles([initiateSubtitle()])
            window.location.href = "/instructor/createCourse/" + json._id

        }
    }

    return (
        <div style={{minHeight:"140vh"}}>
        <div className="create-course" style={{marginLeft:"190px"}}>
            <label className="label2">Course Details</label>
            <div className="create-course-tr">
                <label className="label1" >Title</label>
                <input type='text' placeholder="Enter course title" onChange={(e) => setTitle(e.target.value)} value={title} /><br />
            </div>
            <div className="create-course-tr">
                <label className="label1">Subject</label>
                <select className="subjects-dropDownList" onChange={(e) => setSubject(e.target.value)} name="subjects">
                    <option hidden value="">Select a subject</option>
                    <option value="cs">CS</option>
                    <option value="math">Math</option>
                    <option value="eng">English</option>
                </select>
                {/* <input type='text' placeholder="Enter course subject" onChange={(e) => setSubject(e.target.value)} value={subject} /><br /> */}
            </div>
            <div className="create-course-tr">
                <label className="label1">Price</label>
                <input type='number' onChange={(e) => setPrice(e.target.value)} value={price} />
                <label className="label1">USD</label><br />
            </div>

            <div className="create-course-tr">
                <label className="label1">Outline</label> <br />
                <textarea type='text' placeholder="Enter the outline of your course" onChange={(e) => setOutline(e.target.value)} value={outline} /><br />
            </div>
           {/* <div className="create-course-tr">
                <label className="label1">Total Hours</label>
                <input type='number' onChange={(e) => setTotalHours(e.target.value)} value={totalHours} /><br />
    </div>*/}
            <div className="create-course-tr">
                <label className="label1">Short Summary</label> <br />
                <textarea placeholder="Enter a short summary about your course" onChange={(e) => setShortSummary(e.target.value)} value={shortSummary} /><br />
            </div>
            <div className="create-course-tr">
                <label className="label1">Preview Video Link </label><br />
                <input type='url' placeholder="Enter a Youtube link" onChange={(e) => setPreviewVideo(e.target.value)} value={previewVideo} /><br />
            </div>
            <label className="label2">Subtitles Details</label>
            <button style={{backgroundColor:"#ec6556",fontSize:"18px",marginLeft:"400px"}} className="btn btn-primary" title="Add one more field for a subtitle" onClick={add_input}>+ Subtitle</button> <br />

            {
                subtitles.map(subtitle => {
                    return (
                        <div key={subtitle}>
                            <div >
                                <SubtitlesCreator
                                    subtitleNameChanged={newName => {
                                        subtitle.subtitle = newName
                                        let newSubtitles = [...subtitles];
                                        setSubtitles(newSubtitles)
                                    }}
                                    removeSubtitle={() =>
                                        setSubtitles(subtitles.filter(sub => sub !== subtitle))
                                    }
                                    subtitle={subtitle}
                                />
                                <br />
                            </div>
                        </div>
                    )
                })
            }

            <div className="submit">
                <button className="generalbutton" style={{width:"80px",marginRight:"20px"}} onClick={handleSubmit}>Next</button>

            </div>
            <div>
                {!error && submitted && <img src="https://cdn.dribbble.com/users/2057851/screenshots/5825822/illustration-success.png"/>}
                {error && <p className="create-course-error">{error}</p>}
            </div>

        </div>
        </div>
    )
}

export default CreateCourse