import { async } from "babel-runtime/regenerator"
import { useEffect, useState } from "react"
import { useAsyncValue } from "react-router-dom"

import CourseDetails3 from "../../components/CourseDetails3/CourseDetails3"
import Cookie from 'js-cookie'



const SearchCourses = () => {
  let searchWord;
  const [error, setError] = useState(null)
  const [courses, setCourses] = useState(null)
  const [courses1, setCourses1] = useState(null)
  const [pressed, setPressed] = useState(false);

  const [subject, setSubject] = useState('')
  const [rating, setRating] = useState('')
  const [price, setPrice] = useState('')
  const [priceInput, setPriceInput] = useState('')
  const [USPrice, setUSPrice] = useState(null)
  const [currency, setCurrency] = useState(null)
  const [adjustedPrice, setAdjustedPrice] = useState(null)

  const [role, setRole] = useState(null)
  const [isLoading1, setIsLoading1] = useState(true)
  const [isLoading2, setIsLoading2] = useState(true)
  const [isInitialRender, setIsInitialRender] = useState(true)


  const params = new URLSearchParams(window.location.search);
  const searchItem = params.get('search');
  searchWord = searchItem;

  useEffect(() => {
    Submit();
  })

  const Submit = async () => {

    const input = { "input": searchWord }
    const response = await fetch('/courses/search', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    else{
        setError(null)
        setCourses(json)
      }
    }

  useEffect(() => {
    const fetchCurrency = async () => {
      const response = await fetch('/login/currency')
      const json = await response.json()


      if (response.ok) {
        setCurrency(json)
        setIsLoading1(false)
      }
    }

    if (isInitialRender) {
      fetchCurrency()
      setRole(Cookie.get('role'))
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
  },[price])

  const handleSubmit1 = async (e) => {
    e.preventDefault()
    const responseC = await fetch('https://openexchangerates.org/api/latest.json?app_id=da8698baa20640669fb02c79f6afb3e0')
    const jsonC = await responseC.json()//returns a json object with an array of all exchange rates with USD as base

    const rate = jsonC.rates[currency]


    if (responseC.ok) {
      setAdjustedPrice(price / rate)
      console.log("AP2 " + adjustedPrice)
      console.log("rate2 " + adjustedPrice)

    }
    const entry = { adjustedPrice }


    const response = await fetch("/courses/price", {
      method: "POST",
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
      setCourses1(json)

      setPrice('')
      console.log('courses filtered!', json)


    }
    setPressed(true);
  }




  const handleSubmit = async (e) => {
    e.preventDefault()

    const entry = { subject, rating, adjustedPrice }

    const response = await fetch("/courses/filter", {
      method: "POST",
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
      setCourses1(json)
      setSubject('')
      setRating('')
      setPrice('')
      setAdjustedPrice(null)
      console.log('courses filtered!', json)


    }
    setPressed(true);

  }


  return (
    <div className="All-page"  style={{ height:"145vh"}}>
    <div className="view-course">
        {
          pressed == false ?
            <div className="topbar" style={{ overflowY: "auto", height: "30px", position: "absolute" }}>
              {courses && courses.map(course => (


                <CourseDetails3 key={course._id} course={course}></CourseDetails3>
              ))}
            </div>

            : <div className="topbar" style={{ overflowY: "auto", height: "30px", position: "absolute" }}>
              {courses1 && courses1.map(course1 => (
                <CourseDetails3 key={course1._id} course={course1}></CourseDetails3>
              ))}
            </div>
        }

        <div style={{ backgroundColor: "#f59294", height: "150vh", width: "20%", alignContent: "center", marginTop: "-70px", marginLeft: "-320px", position: "absolute" }}>
          <br></br><br></br>
          {role !== "corporateTrainee" &&
            <form onSubmit={handleSubmit1}>
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
                {/* <button  className="filterbtn2"><img width="15%" src="https://img.icons8.com/ios-glyphs/30/null/empty-filter.png"/>Filter by price</button> */}




              </div>
            </form>}
          <form className="filter" onSubmit={handleSubmit}>
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

              <label style={{ fontFamily: "serif", marginBottom: "5px", fontSize: "20px" }}> <b>Ratings</b>  </label>
              <br></br>
              <input type="radio" value="5" onChange={(e) => setRating(e.target.value)} checked={rating === "5"} ></input>
              <label for="5"><img width="11%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img width="11%" style={{ marginLeft: "-2px" }} src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img width="11%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img width="11%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img width="11%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /></label><br></br>
              <input type="radio" value="4" checked={rating === "4"} onChange={(e) => setRating(e.target.value)}></input>
              <label for="4" style={{ fontFamily: "serif", fontSize: "15px" }}><img width="10%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img width="10%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img width="10%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img width="10%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img style={{ marginLeft: "-3px" }} width="10%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO1YXU8TQRQdQZH4CYImvLhJd2Z2bcCIYCAqLRRMfCMhRohS/4r/hz+xD7W7O5NFjeHJF3/KNXeKpRW6H3Vmu2v2JCfpy8ycc+9s595LSIUKFYwBvtKHSFJWgOC7SFJGgHAXIGSfFCO+SMoGCHmrbyDkLVImgF9/cCH+nF6JsgChs3PJQOjskNJGPzyncBdI0QGBsz3SQGBvkyIDPGsOQt4eaQDZWZknRQX4tBkrXl0j1iBFBES1+4nR7/2ltqHzuHhZgC5rJIvvc4uUM/rsIgvfrLnJiPWsWejWHkFEbZB0Vd17yQ4yRL9HXOPjWrqq9sI9PWtWj8iz+oyqZU6fWCDdZQjpJgj+FiQ7yiw0K4XzEUK+r8z59nMQLofIXYIvzt1k4RgNyQ+NixyXkh+ixtEGTsj0cBFWMPpsD4BMx2cByNTVtcyEKfguBjjdN/CZTIFM8SjlRt5KLX4gE9cg4K8nLl6wBgY0k/ghEz5/NUEDW6hhLPFDRgK2kbv4rvNSi/i+Cclf5GeAbmoV3zchnHXj4iO2oV34sAn2zJwBd82o+DErz5R3nuXXJxh5I3zazM8AFlvarw/fz0d8r15qGzDQzvzaah+b/Ct/5NDwg2Q1YwY6rGbeADYZpgzImFpfmwGj/YJjfvwIQdr+l75T7SASf6dZE7ADs+K95vVkEdj2ucuDnZNqktCIz98nro/WbpgzEPHFkQcL+kF9Hyf1mdgAoLm44UBkcAwPpza9IuLHqnr8lX4kAj/pTWXWxwnEX/v5NjVnYLAalfxYdWxn9Ttj7xct3VJluhql/Mmks65X9eCBAX3TixLWQvSetn2/P72tsoivsWR7uva9fBAeYnA8Dp2VeTzD1P4VKvyP+A3QRAAgoiMDMgAAAABJRU5ErkJggg==" />&up</label><br></br>
              <input type="radio" value="3" checked={rating === "3"} onChange={(e) => setRating(e.target.value)}></input>
              <label for="3" style={{ fontFamily: "serif", fontSize: "15px" }}><img width="10%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img width="10%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img width="10%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img style={{ marginLeft: "-3px" }} width="10%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO1YXU8TQRQdQZH4CYImvLhJd2Z2bcCIYCAqLRRMfCMhRohS/4r/hz+xD7W7O5NFjeHJF3/KNXeKpRW6H3Vmu2v2JCfpy8ycc+9s595LSIUKFYwBvtKHSFJWgOC7SFJGgHAXIGSfFCO+SMoGCHmrbyDkLVImgF9/cCH+nF6JsgChs3PJQOjskNJGPzyncBdI0QGBsz3SQGBvkyIDPGsOQt4eaQDZWZknRQX4tBkrXl0j1iBFBES1+4nR7/2ltqHzuHhZgC5rJIvvc4uUM/rsIgvfrLnJiPWsWejWHkFEbZB0Vd17yQ4yRL9HXOPjWrqq9sI9PWtWj8iz+oyqZU6fWCDdZQjpJgj+FiQ7yiw0K4XzEUK+r8z59nMQLofIXYIvzt1k4RgNyQ+NixyXkh+ixtEGTsj0cBFWMPpsD4BMx2cByNTVtcyEKfguBjjdN/CZTIFM8SjlRt5KLX4gE9cg4K8nLl6wBgY0k/ghEz5/NUEDW6hhLPFDRgK2kbv4rvNSi/i+Cclf5GeAbmoV3zchnHXj4iO2oV34sAn2zJwBd82o+DErz5R3nuXXJxh5I3zazM8AFlvarw/fz0d8r15qGzDQzvzaah+b/Ct/5NDwg2Q1YwY6rGbeADYZpgzImFpfmwGj/YJjfvwIQdr+l75T7SASf6dZE7ADs+K95vVkEdj2ucuDnZNqktCIz98nro/WbpgzEPHFkQcL+kF9Hyf1mdgAoLm44UBkcAwPpza9IuLHqnr8lX4kAj/pTWXWxwnEX/v5NjVnYLAalfxYdWxn9Ttj7xct3VJluhql/Mmks65X9eCBAX3TixLWQvSetn2/P72tsoivsWR7uva9fBAeYnA8Dp2VeTzD1P4VKvyP+A3QRAAgoiMDMgAAAABJRU5ErkJggg==" /><img style={{ marginLeft: "-3px" }} width="10%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO1YXU8TQRQdQZH4CYImvLhJd2Z2bcCIYCAqLRRMfCMhRohS/4r/hz+xD7W7O5NFjeHJF3/KNXeKpRW6H3Vmu2v2JCfpy8ycc+9s595LSIUKFYwBvtKHSFJWgOC7SFJGgHAXIGSfFCO+SMoGCHmrbyDkLVImgF9/cCH+nF6JsgChs3PJQOjskNJGPzyncBdI0QGBsz3SQGBvkyIDPGsOQt4eaQDZWZknRQX4tBkrXl0j1iBFBES1+4nR7/2ltqHzuHhZgC5rJIvvc4uUM/rsIgvfrLnJiPWsWejWHkFEbZB0Vd17yQ4yRL9HXOPjWrqq9sI9PWtWj8iz+oyqZU6fWCDdZQjpJgj+FiQ7yiw0K4XzEUK+r8z59nMQLofIXYIvzt1k4RgNyQ+NixyXkh+ixtEGTsj0cBFWMPpsD4BMx2cByNTVtcyEKfguBjjdN/CZTIFM8SjlRt5KLX4gE9cg4K8nLl6wBgY0k/ghEz5/NUEDW6hhLPFDRgK2kbv4rvNSi/i+Cclf5GeAbmoV3zchnHXj4iO2oV34sAn2zJwBd82o+DErz5R3nuXXJxh5I3zazM8AFlvarw/fz0d8r15qGzDQzvzaah+b/Ct/5NDwg2Q1YwY6rGbeADYZpgzImFpfmwGj/YJjfvwIQdr+l75T7SASf6dZE7ADs+K95vVkEdj2ucuDnZNqktCIz98nro/WbpgzEPHFkQcL+kF9Hyf1mdgAoLm44UBkcAwPpza9IuLHqnr8lX4kAj/pTWXWxwnEX/v5NjVnYLAalfxYdWxn9Ttj7xct3VJluhql/Mmks65X9eCBAX3TixLWQvSetn2/P72tsoivsWR7uva9fBAeYnA8Dp2VeTzD1P4VKvyP+A3QRAAgoiMDMgAAAABJRU5ErkJggg==" />&up</label><br></br>
              <input type="radio" value="2" checked={rating === "2"} onChange={(e) => setRating(e.target.value)}></input>
              <label for="2" style={{ fontFamily: "serif", fontSize: "15px" }}><img width="10%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /> <img width="10%" style={{ marginLeft: "-5px" }} src="https://img.icons8.com/color/48/null/filled-star--v1.png" /><img style={{ marginLeft: "-3px" }} width="10%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO1YXU8TQRQdQZH4CYImvLhJd2Z2bcCIYCAqLRRMfCMhRohS/4r/hz+xD7W7O5NFjeHJF3/KNXeKpRW6H3Vmu2v2JCfpy8ycc+9s595LSIUKFYwBvtKHSFJWgOC7SFJGgHAXIGSfFCO+SMoGCHmrbyDkLVImgF9/cCH+nF6JsgChs3PJQOjskNJGPzyncBdI0QGBsz3SQGBvkyIDPGsOQt4eaQDZWZknRQX4tBkrXl0j1iBFBES1+4nR7/2ltqHzuHhZgC5rJIvvc4uUM/rsIgvfrLnJiPWsWejWHkFEbZB0Vd17yQ4yRL9HXOPjWrqq9sI9PWtWj8iz+oyqZU6fWCDdZQjpJgj+FiQ7yiw0K4XzEUK+r8z59nMQLofIXYIvzt1k4RgNyQ+NixyXkh+ixtEGTsj0cBFWMPpsD4BMx2cByNTVtcyEKfguBjjdN/CZTIFM8SjlRt5KLX4gE9cg4K8nLl6wBgY0k/ghEz5/NUEDW6hhLPFDRgK2kbv4rvNSi/i+Cclf5GeAbmoV3zchnHXj4iO2oV34sAn2zJwBd82o+DErz5R3nuXXJxh5I3zazM8AFlvarw/fz0d8r15qGzDQzvzaah+b/Ct/5NDwg2Q1YwY6rGbeADYZpgzImFpfmwGj/YJjfvwIQdr+l75T7SASf6dZE7ADs+K95vVkEdj2ucuDnZNqktCIz98nro/WbpgzEPHFkQcL+kF9Hyf1mdgAoLm44UBkcAwPpza9IuLHqnr8lX4kAj/pTWXWxwnEX/v5NjVnYLAalfxYdWxn9Ttj7xct3VJluhql/Mmks65X9eCBAX3TixLWQvSetn2/P72tsoivsWR7uva9fBAeYnA8Dp2VeTzD1P4VKvyP+A3QRAAgoiMDMgAAAABJRU5ErkJggg=="></img><img style={{ marginLeft: "-3px" }} width="10%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO1YXU8TQRQdQZH4CYImvLhJd2Z2bcCIYCAqLRRMfCMhRohS/4r/hz+xD7W7O5NFjeHJF3/KNXeKpRW6H3Vmu2v2JCfpy8ycc+9s595LSIUKFYwBvtKHSFJWgOC7SFJGgHAXIGSfFCO+SMoGCHmrbyDkLVImgF9/cCH+nF6JsgChs3PJQOjskNJGPzyncBdI0QGBsz3SQGBvkyIDPGsOQt4eaQDZWZknRQX4tBkrXl0j1iBFBES1+4nR7/2ltqHzuHhZgC5rJIvvc4uUM/rsIgvfrLnJiPWsWejWHkFEbZB0Vd17yQ4yRL9HXOPjWrqq9sI9PWtWj8iz+oyqZU6fWCDdZQjpJgj+FiQ7yiw0K4XzEUK+r8z59nMQLofIXYIvzt1k4RgNyQ+NixyXkh+ixtEGTsj0cBFWMPpsD4BMx2cByNTVtcyEKfguBjjdN/CZTIFM8SjlRt5KLX4gE9cg4K8nLl6wBgY0k/ghEz5/NUEDW6hhLPFDRgK2kbv4rvNSi/i+Cclf5GeAbmoV3zchnHXj4iO2oV34sAn2zJwBd82o+DErz5R3nuXXJxh5I3zazM8AFlvarw/fz0d8r15qGzDQzvzaah+b/Ct/5NDwg2Q1YwY6rGbeADYZpgzImFpfmwGj/YJjfvwIQdr+l75T7SASf6dZE7ADs+K95vVkEdj2ucuDnZNqktCIz98nro/WbpgzEPHFkQcL+kF9Hyf1mdgAoLm44UBkcAwPpza9IuLHqnr8lX4kAj/pTWXWxwnEX/v5NjVnYLAalfxYdWxn9Ttj7xct3VJluhql/Mmks65X9eCBAX3TixLWQvSetn2/P72tsoivsWR7uva9fBAeYnA8Dp2VeTzD1P4VKvyP+A3QRAAgoiMDMgAAAABJRU5ErkJggg=="></img><img style={{ marginLeft: "-3px" }} width="10%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO1YXU8TQRQdQZH4CYImvLhJd2Z2bcCIYCAqLRRMfCMhRohS/4r/hz+xD7W7O5NFjeHJF3/KNXeKpRW6H3Vmu2v2JCfpy8ycc+9s595LSIUKFYwBvtKHSFJWgOC7SFJGgHAXIGSfFCO+SMoGCHmrbyDkLVImgF9/cCH+nF6JsgChs3PJQOjskNJGPzyncBdI0QGBsz3SQGBvkyIDPGsOQt4eaQDZWZknRQX4tBkrXl0j1iBFBES1+4nR7/2ltqHzuHhZgC5rJIvvc4uUM/rsIgvfrLnJiPWsWejWHkFEbZB0Vd17yQ4yRL9HXOPjWrqq9sI9PWtWj8iz+oyqZU6fWCDdZQjpJgj+FiQ7yiw0K4XzEUK+r8z59nMQLofIXYIvzt1k4RgNyQ+NixyXkh+ixtEGTsj0cBFWMPpsD4BMx2cByNTVtcyEKfguBjjdN/CZTIFM8SjlRt5KLX4gE9cg4K8nLl6wBgY0k/ghEz5/NUEDW6hhLPFDRgK2kbv4rvNSi/i+Cclf5GeAbmoV3zchnHXj4iO2oV34sAn2zJwBd82o+DErz5R3nuXXJxh5I3zazM8AFlvarw/fz0d8r15qGzDQzvzaah+b/Ct/5NDwg2Q1YwY6rGbeADYZpgzImFpfmwGj/YJjfvwIQdr+l75T7SASf6dZE7ADs+K95vVkEdj2ucuDnZNqktCIz98nro/WbpgzEPHFkQcL+kF9Hyf1mdgAoLm44UBkcAwPpza9IuLHqnr8lX4kAj/pTWXWxwnEX/v5NjVnYLAalfxYdWxn9Ttj7xct3VJluhql/Mmks65X9eCBAX3TixLWQvSetn2/P72tsoivsWR7uva9fBAeYnA8Dp2VeTzD1P4VKvyP+A3QRAAgoiMDMgAAAABJRU5ErkJggg=="></img>& up</label><br></br>
              <input type="radio" value="1" checked={rating === "1"} onChange={(e) => setRating(e.target.value)} ></input>
              <label for="1" style={{ fontFamily: "serif", fontSize: "15px" }}><img width="10%" src="https://img.icons8.com/color/48/null/filled-star--v1.png" /> <img style={{ marginLeft: "-5px" }} width="10%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO1YXU8TQRQdQZH4CYImvLhJd2Z2bcCIYCAqLRRMfCMhRohS/4r/hz+xD7W7O5NFjeHJF3/KNXeKpRW6H3Vmu2v2JCfpy8ycc+9s595LSIUKFYwBvtKHSFJWgOC7SFJGgHAXIGSfFCO+SMoGCHmrbyDkLVImgF9/cCH+nF6JsgChs3PJQOjskNJGPzyncBdI0QGBsz3SQGBvkyIDPGsOQt4eaQDZWZknRQX4tBkrXl0j1iBFBES1+4nR7/2ltqHzuHhZgC5rJIvvc4uUM/rsIgvfrLnJiPWsWejWHkFEbZB0Vd17yQ4yRL9HXOPjWrqq9sI9PWtWj8iz+oyqZU6fWCDdZQjpJgj+FiQ7yiw0K4XzEUK+r8z59nMQLofIXYIvzt1k4RgNyQ+NixyXkh+ixtEGTsj0cBFWMPpsD4BMx2cByNTVtcyEKfguBjjdN/CZTIFM8SjlRt5KLX4gE9cg4K8nLl6wBgY0k/ghEz5/NUEDW6hhLPFDRgK2kbv4rvNSi/i+Cclf5GeAbmoV3zchnHXj4iO2oV34sAn2zJwBd82o+DErz5R3nuXXJxh5I3zazM8AFlvarw/fz0d8r15qGzDQzvzaah+b/Ct/5NDwg2Q1YwY6rGbeADYZpgzImFpfmwGj/YJjfvwIQdr+l75T7SASf6dZE7ADs+K95vVkEdj2ucuDnZNqktCIz98nro/WbpgzEPHFkQcL+kF9Hyf1mdgAoLm44UBkcAwPpza9IuLHqnr8lX4kAj/pTWXWxwnEX/v5NjVnYLAalfxYdWxn9Ttj7xct3VJluhql/Mmks65X9eCBAX3TixLWQvSetn2/P72tsoivsWR7uva9fBAeYnA8Dp2VeTzD1P4VKvyP+A3QRAAgoiMDMgAAAABJRU5ErkJggg=="></img><img style={{ marginLeft: "-3px" }} width="10%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO1YXU8TQRQdQZH4CYImvLhJd2Z2bcCIYCAqLRRMfCMhRohS/4r/hz+xD7W7O5NFjeHJF3/KNXeKpRW6H3Vmu2v2JCfpy8ycc+9s595LSIUKFYwBvtKHSFJWgOC7SFJGgHAXIGSfFCO+SMoGCHmrbyDkLVImgF9/cCH+nF6JsgChs3PJQOjskNJGPzyncBdI0QGBsz3SQGBvkyIDPGsOQt4eaQDZWZknRQX4tBkrXl0j1iBFBES1+4nR7/2ltqHzuHhZgC5rJIvvc4uUM/rsIgvfrLnJiPWsWejWHkFEbZB0Vd17yQ4yRL9HXOPjWrqq9sI9PWtWj8iz+oyqZU6fWCDdZQjpJgj+FiQ7yiw0K4XzEUK+r8z59nMQLofIXYIvzt1k4RgNyQ+NixyXkh+ixtEGTsj0cBFWMPpsD4BMx2cByNTVtcyEKfguBjjdN/CZTIFM8SjlRt5KLX4gE9cg4K8nLl6wBgY0k/ghEz5/NUEDW6hhLPFDRgK2kbv4rvNSi/i+Cclf5GeAbmoV3zchnHXj4iO2oV34sAn2zJwBd82o+DErz5R3nuXXJxh5I3zazM8AFlvarw/fz0d8r15qGzDQzvzaah+b/Ct/5NDwg2Q1YwY6rGbeADYZpgzImFpfmwGj/YJjfvwIQdr+l75T7SASf6dZE7ADs+K95vVkEdj2ucuDnZNqktCIz98nro/WbpgzEPHFkQcL+kF9Hyf1mdgAoLm44UBkcAwPpza9IuLHqnr8lX4kAj/pTWXWxwnEX/v5NjVnYLAalfxYdWxn9Ttj7xct3VJluhql/Mmks65X9eCBAX3TixLWQvSetn2/P72tsoivsWR7uva9fBAeYnA8Dp2VeTzD1P4VKvyP+A3QRAAgoiMDMgAAAABJRU5ErkJggg=="></img><img style={{ marginLeft: "-3px" }} width="10%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO1YXU8TQRQdQZH4CYImvLhJd2Z2bcCIYCAqLRRMfCMhRohS/4r/hz+xD7W7O5NFjeHJF3/KNXeKpRW6H3Vmu2v2JCfpy8ycc+9s595LSIUKFYwBvtKHSFJWgOC7SFJGgHAXIGSfFCO+SMoGCHmrbyDkLVImgF9/cCH+nF6JsgChs3PJQOjskNJGPzyncBdI0QGBsz3SQGBvkyIDPGsOQt4eaQDZWZknRQX4tBkrXl0j1iBFBES1+4nR7/2ltqHzuHhZgC5rJIvvc4uUM/rsIgvfrLnJiPWsWejWHkFEbZB0Vd17yQ4yRL9HXOPjWrqq9sI9PWtWj8iz+oyqZU6fWCDdZQjpJgj+FiQ7yiw0K4XzEUK+r8z59nMQLofIXYIvzt1k4RgNyQ+NixyXkh+ixtEGTsj0cBFWMPpsD4BMx2cByNTVtcyEKfguBjjdN/CZTIFM8SjlRt5KLX4gE9cg4K8nLl6wBgY0k/ghEz5/NUEDW6hhLPFDRgK2kbv4rvNSi/i+Cclf5GeAbmoV3zchnHXj4iO2oV34sAn2zJwBd82o+DErz5R3nuXXJxh5I3zazM8AFlvarw/fz0d8r15qGzDQzvzaah+b/Ct/5NDwg2Q1YwY6rGbeADYZpgzImFpfmwGj/YJjfvwIQdr+l75T7SASf6dZE7ADs+K95vVkEdj2ucuDnZNqktCIz98nro/WbpgzEPHFkQcL+kF9Hyf1mdgAoLm44UBkcAwPpza9IuLHqnr8lX4kAj/pTWXWxwnEX/v5NjVnYLAalfxYdWxn9Ttj7xct3VJluhql/Mmks65X9eCBAX3TixLWQvSetn2/P72tsoivsWR7uva9fBAeYnA8Dp2VeTzD1P4VKvyP+A3QRAAgoiMDMgAAAABJRU5ErkJggg=="></img><img style={{ marginLeft: "-3px" }} width="10%" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClUlEQVR4nO1YXU8TQRQdQZH4CYImvLhJd2Z2bcCIYCAqLRRMfCMhRohS/4r/hz+xD7W7O5NFjeHJF3/KNXeKpRW6H3Vmu2v2JCfpy8ycc+9s595LSIUKFYwBvtKHSFJWgOC7SFJGgHAXIGSfFCO+SMoGCHmrbyDkLVImgF9/cCH+nF6JsgChs3PJQOjskNJGPzyncBdI0QGBsz3SQGBvkyIDPGsOQt4eaQDZWZknRQX4tBkrXl0j1iBFBES1+4nR7/2ltqHzuHhZgC5rJIvvc4uUM/rsIgvfrLnJiPWsWejWHkFEbZB0Vd17yQ4yRL9HXOPjWrqq9sI9PWtWj8iz+oyqZU6fWCDdZQjpJgj+FiQ7yiw0K4XzEUK+r8z59nMQLofIXYIvzt1k4RgNyQ+NixyXkh+ixtEGTsj0cBFWMPpsD4BMx2cByNTVtcyEKfguBjjdN/CZTIFM8SjlRt5KLX4gE9cg4K8nLl6wBgY0k/ghEz5/NUEDW6hhLPFDRgK2kbv4rvNSi/i+Cclf5GeAbmoV3zchnHXj4iO2oV34sAn2zJwBd82o+DErz5R3nuXXJxh5I3zazM8AFlvarw/fz0d8r15qGzDQzvzaah+b/Ct/5NDwg2Q1YwY6rGbeADYZpgzImFpfmwGj/YJjfvwIQdr+l75T7SASf6dZE7ADs+K95vVkEdj2ucuDnZNqktCIz98nro/WbpgzEPHFkQcL+kF9Hyf1mdgAoLm44UBkcAwPpza9IuLHqnr8lX4kAj/pTWXWxwnEX/v5NjVnYLAalfxYdWxn9Ttj7xct3VJluhql/Mmks65X9eCBAX3TixLWQvSetn2/P72tsoivsWR7uva9fBAeYnA8Dp2VeTzD1P4VKvyP+A3QRAAgoiMDMgAAAABJRU5ErkJggg=="></img>& up</label><br></br>

              <br></br>


              <button className="filterbtn2"><img width="30%" src="https://img.icons8.com/ios-glyphs/30/null/empty-filter.png" />Filter</button>


            </div>
          </form>
        </div>
      </div>
    </div>

  )

}


export default SearchCourses