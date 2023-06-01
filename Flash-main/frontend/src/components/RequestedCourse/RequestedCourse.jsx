import { useEffect, useState } from "react"

const RequestedCourse = ({ course }) => {
    const [corporateTraineeData, setCorporateTraineeData] = useState("");
    const [coursesGet, setCoursesGet] = useState([]);
    const [done, setDone] = useState(null);
    console.log("course is :")
    console.log(course[1][0])
    useState(() => {
        const getCorporate = async () => {
            const response = await fetch("/corporateTrainees/" + course[0], {
                method: "GET",
            })
            const json = await response.json();
            setCorporateTraineeData(json);
        }
        getCorporate();
    })

    const getCourseName = async () => {
        for (let i = 0; i < course[1].length; i++) {
            const currentCourse = course[1][i]
            console.log("i is:" + i)
            console.log(currentCourse)
            const response1 = await fetch("/courses/" + currentCourse.title)
            const json1 = await response1.json();
            console.log(json1);
            setCoursesGet(coursesGet => [json1, ...coursesGet]);
        }
    }
    useState(() => {
        getCourseName();
    })

    const acceptCourse = async (id) => {
        let entry = { "title": id, "status": "accepted" };
        const response = await fetch('/corporateTrainees/' + course[0] + '/acceptingCourses', {
            method: 'PATCH',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        setDone(true);
    }

    const rejectCourse = async (id) => {
        let entry = { "title": id, "status": "rejected" };
        const response = await fetch('/corporateTrainees/' + course[0] + '/acceptingCourses', {
            method: 'PATCH',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        setDone(true);
    }

    return (
        <div>
            <p><b>Name:</b> {corporateTraineeData.username}</p>
            <div>{coursesGet && coursesGet.map((c) => {
                return (
                    <div key={c} >
                        <b>Course Title:</b> {c.title}  <br></br>
                        <div hidden={done}>
                            <button className="generalbutton" style={{ backgroundColor: "green", marginLeft: "75%" }} onClick={() => acceptCourse(c._id)}>accept</button>
                            <button className="generalbutton" style={{ backgroundColor: "red", marginLeft: "10px" }} onClick={() => rejectCourse(c._id)} >reject</button> <br></br>
                        </div>

                        <p>{done && <span style={{ color: "green", marginTop: "10px" }}> Response saved.</span>}</p>
                    </div>
                )
            })}</div>
        </div>

    )

}


export default RequestedCourse;