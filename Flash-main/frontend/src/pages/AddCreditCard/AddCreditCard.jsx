import { useState } from "react"
import { useParams } from "react-router-dom";
const AddCreditCard = () => {
    const [creditCardNo, setCreditCardNo] = useState('')
    const [cvv, setCvv] = useState('')
    const [error, setError] = useState(null)
    const [submitted, setSubmitted] = useState(false)

    const params = useParams()
    const id = params.id

    const addCC = async () => {
        const entry = { creditCardNo, cvv }
        const response = await fetch('/individualTrainees/addCreditCard/' + id, {
            method: 'PATCH',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        console.log(response)
        if (!response.ok) {
            setError(json.error)
        }

        if (response.ok) {
            setCreditCardNo('')
            setCvv('')
            setError(null)
            setSubmitted(true)

        }
    }
    return (
        <div >
             <h3>Add your credit card</h3>
            <label>Credit Card Number</label>
           <input type='text' onChange={(e) => setCreditCardNo(e.target.value)} value={creditCardNo} />
            <br />
            <label>Enter cvv </label>
            <input type='text' onChange={(e) => setCvv(e.target.value)} value={cvv} ></input>
            <button onClick={addCC}>Add</button>
            {error && <p>{error}</p>}
            {submitted && <p>Credit card added successfully!</p>}

        </div>
    )
}

export default AddCreditCard