import { useEffect, useState } from "react"
import LocalCurrency from 'react-local-currency'
import Rate from "../RateCourse/RateCourse"
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import AddDiscount from "../../pages/AddDiscount/AddDiscount";
const AdminCourses = ({ course, select, all, remove }) => {

    const [showAddDiscount, setShowAddDiscount] = useState(false)
    const [showCancel, setShowCancel] = useState(true)
    const [checked, setChecked] = useState(false)

    const id = course["_id"]
    useEffect(() => {
        if (all)
            setChecked(true)
        else
            setChecked(false)
    }, [all])
    const addDiscount = () => {
        setShowAddDiscount(true)
    }
    const cancel = () => {
        setShowAddDiscount(false)

    }
    const handleChange = () => {
        setChecked(!checked)
        if (!checked)
            select("" + id)
        else
            remove(id)
    }
    return (
        <div className="request-container" style={{borderColor:"#e2aeb0        "}}>
            {!showAddDiscount ?
                <>
                    <p><strong>Course Title: </strong>{course.title}</p>
                    <input className="admin-courses-checkbox" type="checkbox" checked={checked} onChange={(e) => handleChange()} value={id}></input>
                </>
                :
                <>
                    {showCancel && <button title="cancel" className="cancel-discount" onClick={cancel}>X</button>}
                    <AddDiscount
                        courseId={id}
                        removeCancel={() => {
                            setShowCancel(false)
                        }} />


                </>
            }
        </div>
    )

}


export default AdminCourses