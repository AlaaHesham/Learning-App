
import { useEffect, useState } from "react"

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { MDBRow, MDBCol, MDBContainer, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
import { BiSearchAlt } from 'react-icons/bi'
import { FcPlus } from 'react-icons/fc'

import InstructorCourseComponent from "../../components/InstructorCourseComponent/InstructorCourseComponent"

const Titles = () => {
  const [myCourses, setMyCourses] = useState(null)
  const [input, setInput] = useState("")
  const [searchResults, setSearchResults] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [isInitialRender, setIsInitialRender] = useState(true)

  const [price, setPrice] = useState("")
  const [currency, setCurrency] = useState(null)
  const [adjustedPrice, setAdjustedPrice] = useState(null)
  const [subject, setSubject] = useState("")
  const [isFiltering, setIsFiltering] = useState(false)
  const [filterResults, setFilterResults] = useState(null)
  const [error, setError] = useState(null)
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const fetchMyCourses = async () => {
      const response = await fetch('/instructors/myCourses/viewCourses')
      const json = await response.json()

      if (response.ok) {
        setMyCourses(json)
        setIsInitialRender(false)
      }
      console.log(json)
    }

    const fetchCurrency = async () => {
      const response = await fetch('/login/currency')
      const json = await response.json()


      if (response.ok) {
        setCurrency(json)
      }
    }


    if (isInitialRender) {
      fetchCurrency()
      fetchMyCourses()
    }
  }, [])

  useEffect(() => {

    const getAdjustedPrice = async () => {

      const response = await fetch('https://openexchangerates.org/api/latest.json?app_id=da8698baa20640669fb02c79f6afb3e0')
      const json = await response.json()//returns a json object with an array of all exchange rates with USD as base

      const rate = json.rates[currency]


      if (response.ok) {
        setAdjustedPrice(price / rate)
        console.log("AP " + adjustedPrice)
        console.log("rate " + adjustedPrice)

      }
    }

    getAdjustedPrice()
  }, [price])

  const handleSearch = async (e) => {
    e.preventDefault()
    setIsSearching(true)
    const entry = { input }
    console.log("entry heree ", entry)
    const response = await fetch('/instructors/myCourses/searchCourses', {
      method: 'POST',
      body: JSON.stringify(entry),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()
    if (response.ok) {
      setIsSearching(true)
      setIsFiltering(false)
      setInput('')
      setSearchResults(json)
    }
  }

  const handleFilter = async (e) => {
    e.preventDefault()

    console.log(price)
    const responseC = await fetch('https://openexchangerates.org/api/latest.json?app_id=da8698baa20640669fb02c79f6afb3e0')
    const jsonC = await responseC.json()//returns a json object with an array of all exchange rates with USD as base

    const rate = jsonC.rates[currency]


    if (responseC.ok) {
      setAdjustedPrice(price / rate)
      console.log("AP2 " + adjustedPrice)
      console.log("rate2 " + adjustedPrice)

    }

    const entry = { adjustedPrice, subject }
    console.log(adjustedPrice)
    const response = await fetch('/instructors/myCourses', {
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
      setError(null)
      setIsFiltering(true)
      setIsSearching(false)
      setFilterResults(json)

      setPrice('')
      setAdjustedPrice(null)
      setSubject("")
      console.log('courses filtered!', json)


    }
  }

  return (

    <>


      <div style={{ backgroundColor: "#f59294", width: "22%", height: "auto", alignContent: "center", marginTop: "-19px", marginLeft: "-20px" }}>
        <button className="filterbtn2" style={{ marginTop: "30px", marginLeft: "20px" }} onClick={() => { setIsSearching(false); setIsFiltering(false) }}><img width="15%" style={{ marginRight: "5px" }} src="https://img.icons8.com/fluency-systems-regular/48/null/visible.png" />Remove Filters</button>
        <Form className="d-flex" >
          <Form.Control

            type="search"
            placeholder="Search for courses"
            className="me-2"
            aria-label="Search"
            style={{ width: '200px', borderRadius: '25px', borderColor: 'black', marginTop: "40px", height: "30px", marginLeft: "20px" }}
            value={input}
            onChange={(e) => { setInput(e.target.value) }}
          />

          <BiSearchAlt class="opacity_img" style={{ width: '30px', height: "30px", borderRadius: '25px', marginTop: "40px", marginLeft: "0px" }} onClick={handleSearch}></BiSearchAlt>
        </Form>
        <br></br><br></br>
        <form onSubmit={handleFilter}>
          <div className="filters" style={{ marginLeft: "20px" }}>

            <div >
              <label style={{ fontFamily: "serif", marginBottom: "5px", fontSize: "20px" }}> <b>Price</b>  </label>
              <br></br>

              <input
                className="range1"
                type="range"
                min="0"
                max="100000"
                step="5"
                onChange={(e) => setPrice(e.target.value)}
              ></input>
              <span style={{ fontFamily: "serif", color: "rgba(3, 4, 16, 0.77)" }}>{price}</span>


            </div>
            <br></br>
            {/* <button  className="filterbtn2"><img width="15%" src="https://img.icons8.com/ios-glyphs/30/null/empty-filter.png"/>Filter by price</button> */}



          </div>
        </form>
        <form className="filter" onSubmit={handleFilter}>
          <div className="filters" style={{ marginLeft: "20px" }}>
            <br></br>
            <br></br>

            <label style={{ fontFamily: "serif", fontSize: "20px" }}><b>Subject</b></label>
            <br></br>
            <input type="radio" value="cs" checked={subject === 'cs'} onChange={(e) => setSubject(e.target.value)}></input>
            <label style={{ fontFamily: "serif", fontSize: "17px", marginLeft: "5px" }} for="cs">Computer Science</label><br></br>
            <input type="radio" value="eng" checked={subject === 'eng'} onChange={(e) => setSubject(e.target.value)}></input>
            <label for="eng" style={{ fontFamily: "serif", fontSize: "17px", marginLeft: "5px" }}>English</label><br></br>
            <input type="radio" value="math" checked={subject === 'math'} onChange={(e) => setSubject(e.target.value)}></input>
            <label for="math" style={{ fontFamily: "serif", fontSize: "17px", marginLeft: "5px" }}>Mathematics</label>
            <br></br>
            <br></br>
            <button className="filterbtn2"><img width="30%" src="https://img.icons8.com/ios-glyphs/30/null/empty-filter.png" />Filter</button>

           
            <br></br>


            <button outline className='generalbutton mx-2 px-5' color='white' size='lg' onClick={(e) => { window.location.href = "/instructor/createCourse" }} style={{ marginTop: "100px", marginLeft: "-10px" }}>
              + Add a course
            </button>



          </div>
        </form>
      </div>

      <div style={{ marginLeft: "50px", marginTop: "-1000px" }}>

      <div className="All-page"  style={{ height:"145vh"}}>
          <div className="view-course">
            <div className="topbar" style={{ overflowY: "auto", height: "30px", position: "absolute" }}>

              {isSearching && !isFiltering && searchResults && searchResults.map((myCourse) => (
                <InstructorCourseComponent key={myCourse._id} course={myCourse} />

              ))}
              {!isSearching && !isFiltering && myCourses && myCourses.map((myCourse) => (
                <InstructorCourseComponent key={myCourse._id} course={myCourse} />

              ))}

              {isFiltering && !isSearching && filterResults && filterResults.map((myCourse) => (
                <InstructorCourseComponent key={myCourse._id} course={myCourse} />

              ))}
            </div>
          </div>
        </div>
      </div>
    </>


  )

}

export default Titles


{/*<div className="AllCoursesTitles">
          <div className="courses-Titles">
          {coursesTitles && coursesTitles.map((courseTitle) => (
              <CourseTitle key={courseTitle._id} courseTitle={courseTitle}/>
              
            ))}
          </div>
          </div>*/}

{
  /*
   */
}