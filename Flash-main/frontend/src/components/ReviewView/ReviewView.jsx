import React, { useEffect, useState } from 'react'
import {
  Card,
  CardSubtitle,
  CardText,
  CardBody,
  CardImg,
} from "reactstrap";

const ReviewView = (props) => {
  const [profilePic, setprofilePic] = useState(null)
  const [firstName, setfirstName] = useState(null)
  const [lastName, setlastName] = useState(null)
  console.log(props.review)
  useEffect(() => {
    const fetchRatings = async () => {

      const response = await fetch('/individualTrainees/' + props.review.reviewerID)
      const json = await response.json()

      if (response.ok && json) {
        console.log(json)
        setfirstName(json.firstName)
        setlastName(json.lastName)
      }
      if (!response.ok || json == null) {
        const response2 = await fetch('/corporateTrainees/' + props.review.reviewerID)
        const json2 = await response2.json()
        if (response2.ok) {
          setfirstName(json2.firstName)
          setlastName(json2.lastName)
        }
      }
    }



    fetchRatings()

  }, [])
  return (
    <Card className='myCard' style={{maxHeight:"200px"}}>
      <CardBody>

        <div className="reviews-top">
          <div className="user-details">
            <CardImg
              width="120%"
              height="20%"
              className="avatar"
              src={
                profilePic ||
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
              }
              alt="user avatar"
            />

            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {firstName} {lastName || "John Doe"}
            </CardSubtitle>
          </div>
          <div className="reviews-body">
            <CardText>
              {props.review.review ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut reiciendis delectus dignissimos, nisi pariatur fuga officiis itaque fugiat! Quibusdam accusantium quae beatae vel.Quas possimus reprehenderit sequi quia nesciunt sunt!"}
            </CardText>
          </div>
        </div>
      </CardBody>
    </Card>
  )

}

export default ReviewView