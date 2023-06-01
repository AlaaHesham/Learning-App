import Report from "../../components/Reports/Reports"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineArrowBack } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const ViewReports = () => {
  const [reports, setReports] = useState(null)
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReports = async () => {
      const response = await fetch('/reports')
      const json = await response.json()

      console.log(json)

      if (response.ok) {
        setReports(json)

      }
    }

    fetchReports()
  }, [])
  return (
    <>
      <div className="all-reports" style={{ marginLeft: "20px" }}>
        <MdOutlineArrowBack className="opacity_img" style={{ width: "50px", height: "50px", color: "#d55b5c" }} onClick={() => navigate(-1)}></MdOutlineArrowBack>

        <div className="reports">
          {reports && reports.map(report => (
            <Report key={report._id} report={report}></Report>
          ))}
        </div>
      </div>

      {reports && reports.length === 0 &&
        <>
          <h2>No reports yet!</h2>
          <img width='70%' height="60%" style={{ marginLeft: '250px' }} src="https://i0.wp.com/dancebusinessweekly.com/wp-content/uploads/2021/04/GettyImages-1253922154-scaled.jpg?resize=1024%2C683&ssl=1"></img>
        </>
      }
    </>
  )

}

export default ViewReports