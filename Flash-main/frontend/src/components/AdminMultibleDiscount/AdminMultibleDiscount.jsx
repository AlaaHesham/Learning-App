import { useState } from "react"
import { useParams } from "react-router-dom";
const AdminMultibleDiscount = (props) => {
    const [discount, setDiscount] = useState(0)
    const [discountStart, setDiscountStart] = useState('')
    const [discountEnd, setDiscountEnd] = useState('')
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [wrongRange, setWrongRange] = useState(false)
    // const params = useParams();
    // const id = params.id

    const Added = async () => {
        if (discount > 100 || discount < 0) {
            setWrongRange(true)
        }
        else {
            const entry = { discount, discountStart, discountEnd }
            for (let i = 0; i < props.courseIds.length; i++) {
                const response = await fetch('/courses/' + props.courseIds[i] + '/addDiscount', {
                    method: 'PATCH',
                    body: JSON.stringify(entry),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const json = await response.json()
                if (!response.ok) {
                    setError(json.error)
                    setWrongRange(false)
                    break;
                }

                if (i == props.courseIds.length - 1 && response.ok) {
                    setDiscount(0)
                    setDiscountStart('')
                    setDiscountEnd('')
                    setError(null)
                    setSuccess(true)
                    setWrongRange(false)
                    props.removeCancel()
                    props.done()
                }
            }

        }
    }
    return (
        <div className="add-discount">

            {!success ?
                <>
                    <div className="admin-form-divChild">
                        <label>Discount </label>
                        <input id="admin-discount-amount" type='number' onChange={(e) => setDiscount(e.target.value)} value={discount} min="0" max="100" />
                        <span>%</span>
                    </div>

                    {wrongRange && <p className="create-course-error">Please enter a discont from 0% to 100%</p>}
                    <div className="admin-form-divChild">
                        <label>Valid From</label>
                        <input type='date' onChange={(e) => setDiscountStart(e.target.value)} value={discountStart} min={new Date().toISOString().split("T")[0]} /><br />
                    </div>
                    <div className="admin-form-divChild">
                        <label>Valid Until</label>
                        <input type='date' onChange={(e) => setDiscountEnd(e.target.value)} value={discountEnd} disabled={discountStart === "" ? true : false}
                            min={discountStart ? new Date(discountStart).toISOString().split("T")[0] : ""} /><br />
                    </div>
                    <button className="add-discount-btn" onClick={Added}>Add</button>
                    {error && <p className="create-course-error">{error}</p>}

                </>
                :
                <>{!error && success && <p className="discount-success">Discount added successfully!</p>}</>

            }

        </div>
    )
}

export default AdminMultibleDiscount