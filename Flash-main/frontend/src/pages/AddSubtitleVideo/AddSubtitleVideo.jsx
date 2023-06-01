import { useState } from "react"
import { useParams } from "react-router-dom";
const AddSubtitleVideo = () => {
    const [link, setLink] = useState('')
    const [description, setDescription] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const params = useParams();
    const id = params.id

    const Added = async () => {
        const entry = { link, description }
        const response = await fetch('/subtitles/' + id + '/addVideo', {
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
            setLink('')
            setDescription('')
            setError(null)
            setSuccess(true)
        }
    }

    return (
        <div className="create-course-tr">
            <label className="label1"> Video Youtube Link </label><br />
            <input type='text' onChange={(e) => setLink(e.target.value)} value={link} /><br />

            <label className="label1">Short Description of the Video </label><br />
            <input type='text' onChange={(e) => setDescription(e.target.value)} value={description} /><br />

            <button onClick={Added}>Add</button>
            {!error && success && <p>Preview Video added successfully</p>}
            {error && <p>{error}</p>}
        </div>
    )
}

export default AddSubtitleVideo