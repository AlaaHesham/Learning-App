# Flash Online Learning System

Flash is a complete Online Learning System through which individuals can attend pre-recorded
courses online, solve their questions, and get certificates of completion. 

## Motivation
The main reason behind this project implementation was for the CSEN704 Advanced Computer lab course at the German University In Cairo. The objectives behind this course was to teach semester 7 students: 

- Scrum and Agile methodologies
- Software development and testing
- Backend and frontend technologies
- Simulating a real life experience for a company demanding a fully functioning website.

## Build Status
The project is currently under development. There are three bugs within our code. 
- The first bug is when a trainee pays for a discounted course, they incorrectly pay the full price, instead of the discounted one. 
- The second bug is when a trainee refunds a course, the amount refunded isn't reflected in the wallet of the course'e instructor.
- The third bug is when a refund request is issued to the admin, the trainee's progress displayed to the admin is incorrect.

## Code Style
The code style is not enforced by any formatter. Since this project was implemented by 5 people, the code style differs from file to file according to who wrote them. However, to make the division of files in the working environment consistent, we agreed on some basics. The project is divided into a backend folder and a frontend folder, each of which has its own node_modules files. The backend folder is divided into models, routes, and controllers. It also has its main server file called server.js. The frontend folder was divided into components and pages. It also has its main client file called App.js.

## Screenshots

![App Screenshot](https://i.paste.pics/da87ed1d3b2cdcde55809f5788b428ce.png)
![App Screenshot](https://i.paste.pics/6d1ceb300f627c3fb577fa9fd312016e.png)
![App Screenshot](https://i.paste.pics/f337f083f7ec50fe7b1f260160f66add.png)
![App Screenshot](https://i.paste.pics/3e8d1f54602db62f39bd458f3d851257.png)
![App Screenshot](https://i.paste.pics/b2717eeb0f74bb96d09a03cf3f9a86c0.png)
![App Screenshot](https://i.paste.pics/33fc669100aa806d3a3e20581e8ecf8d.png)
![App Screenshot](https://i.paste.pics/a70f3de6a615975705944769f9d341e2.png)
![App Screenshot](https://i.paste.pics/8b7d7225b287fd401ab4c544fd44a6d0.png)
![App Screenshot](https://i.paste.pics/938c12ad91eed764710b95fa84856237.png)
![App Screenshot](https://i.paste.pics/2254119347297c9e5cf9487ac3362894.png)
![App Screenshot](https://i.paste.pics/e52636fe3e48e498ab846574573bc6f8.png)
![App Screenshot](https://i.paste.pics/59e9306f628a8ebb3d358ad22498f257.png)
![App Screenshot](https://i.paste.pics/7b1d86f12e123bd8fb5a0abe4dc81aa0.png)
![App Screenshot](https://i.paste.pics/7ec28c13a9c4321994f6e703bcc0b86e.png)
![App Screenshot](https://i.paste.pics/ea7e853739c4771d369279365d385bb5.png)
![App Screenshot](https://i.paste.pics/f27a8f70b6afb14d0df046a8e2fc1526.png)
![App Screenshot](https://i.paste.pics/e20fa56088d9002d11f6a279830dd8f9.png)
![App Screenshot](https://i.paste.pics/a6b20cdd065b1bf9e3ef436cf0930ac2.png)

## Tech/Framework used

* [React](https://reactjs.org/) This is a free and open-source front-end JavaScript library for building user interfaces based on UI components.
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [MongoDB](https://www.mongodb.com/) This is a free open source NOSQL document database with scalability and flexibility. Data are stored in flexible JSON-like documents.
* [Mongoose](https://mongoosejs.com/) This provides a straight-forward, schema-based solution to model your application data.
* [PostMan](https://www.postman.com/) This is an API platform for building and using APIs.
* [Material UI](https://mui.com/) This is an open-source React component library that implements Google's Material Design. It includes a comprehensive collection of prebuilt components that are ready for use in production right out of the box.
* [Git](https://git-scm.com/) This is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.
* [VS Code](https://code.visualstudio.com/) This is a code editor redefined and optimized for building and debugging modern web and cloud applications. 


* Client: React

* Server: Node, Express

- mongodb: NoSQL database program which uses JSON-like documents with optional schemas.
## Features

- Learn from expert instructors at leading universities.
- Explore hundreds of free and affordable courses.
- Get on-demand lectures for desktop and mobile—on your schedule.
- Build personal and professional skills with applied learning.
- Users can signup and login to their accounts.
- Public (non-authenticated) users can view all courses on the platform.
- Authenticated users can access all courses as they register for it.
- Coporates can fund unlimited courses for their employees to provide them with remote training. 
- You can work as an instructor providing many people with excellent learning and earning money from the comfort of your home.
- Online payement.
- Reporting System.
- View your your profile.
- Refund Policy.
- Terms and Conditions.
- Have a personal wallet.



## Code Examples
Some code examples include
#### Function to create a course
```javaScript
const addCourse = async (req, res) => {

    const { title, subject, price, avgRating, ratings, instructor, outline, previewVideo,
        discount, discountStart, discountEnd, totalHours, videos, shortSummary, reviews } = req.body

    try {
        const course = await Course.create({
            title, subject, price, avgRating, ratings, instructor, outline, previewVideo,
            discount, discountStart, discountEnd, totalHours, videos, shortSummary, reviews
        })

        res.status(200).json(course)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
    //res.json({mssg: "create a new course"})
}
```

#### Function to get all subtitles of a course
```javaScript
const getSubtitles = async (req, res) => {
    const { id } = req.params
    return res.status(200).json(await Subtitle.find({ course: id }).select())
}
```

#### Function to get all ratings of a course
```javaScript
const getRatings = async (req, res) => {
    const id = req.params.id

    try {
        const ratings = await Course.findById({ "_id": id }).select({ ratings: 1 })
        res.status(200).json(ratings)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
```

#### Function to add a discount to a course
```javaScript
const addDiscount = async (req, res) => {
    const id = req.params.id
    const { discount, discountStart, discountEnd } = req.body

    if (!discount || !discountStart || !discountEnd)
        return res.status(400).json({ error: 'Please enter discount amount and duration' })

    const course = await Course.find({ _id: id }).updateOne({ discount: discount, discountStart: discountStart, discountEnd: discountEnd })

    if (!course)
        return res.status(404).json({ error: error.message })
    return res.status(200).json(course)
}
```

#### Function to change the password of a logged in user
```javaScript
const changePasswordFromProfile=async(req,res)=>{

    const type=req.user.type
    const id=req.user.id
    const oldPassword=req.body.oldPassword

    const salt = await bcrypt.genSalt();
    const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);
    
    try{
    if(type==="instructor")
    {
        const instructor= await Instructor.findById({ _id:id})
        const passwordVerified=await bcrypt.compare(oldPassword, instructor.password);
        if(passwordVerified)
        {
            instructor.password = hashedNewPassword;
            await instructor.save();
            res.status(200).json("Password changed successfully")
        }
        else
            res.status(401).json("Incorrect old password")
    }
    else if(type==="corporateTrainee")
    {
        const corpTrainee= await CorporateTrainee.findById({ _id:id})
        const passwordVerified=await bcrypt.compare(oldPassword, corpTrainee.password);
        if(passwordVerified)
        {
            corpTrainee.password = hashedNewPassword;
            await corpTrainee.save();
            res.status(200).json("Password changed successfully")
        }
        else
            res.status(401).json("Incorrect old password")
    }
    else if(type==="individualTrainee")
    {
        const indTrainee= await IndividualTrainee.findById({ _id:id})
        const passwordVerified=await bcrypt.compare(oldPassword, indTrainee.password);
        if(passwordVerified)
        {
            indTrainee.password = hashedNewPassword;
            await indTrainee.save();
            res.status(200).json("Password changed successfully")
        }
        else
            res.status(401).json("Incorrect old password")
    }
    }
    catch(error)
    {
        res.status(400).json({error: error.message})
    }
}
```

#### Function to add a new subtitle for a course
```javaScript
const addSubtitle = async (req, res) => {

    const { course, id, subtitle, youtubelink, excercises } = req.body
    const hours=0
    try {
        const sub = await Subtitle.create({ course, id, subtitle, hours, youtubelink, excercises ,lecture:''})
        const total = await Course.findById(course).select({ totalHours: 1 })
        total += hours
        await Course.findByIdAndUpdate(course, { totalHours: total })
        console.log('nooooo')
        res.status(200).json(sub)
    } catch (error) {

        res.status(400).json({ error: error.message })
    }
}
```

#### Function to add exercises to a subtitle
```javaScript
const addExcercises = async (req, res) => {
    const { id } = req.params
    const excercises = req.body.excercises
    try {
        for (let index = 0; index < excercises.length; index++) {
            const element = excercises[index];
            if (element.question == "" || element.choiceA == "" || element.choiceB == "" || element.choiceC == "" || element.choiceD == "" || element.answer == "")
                return res.status(400).json({ error: "Please complete all fields" })
            await Subtitle.findOneAndUpdate({ _id: id }, { $push: { excercises: element } })
        }
        const mins=excercises.length*5
        const sub=await Subtitle.findByIdAndUpdate(id,{ $inc: {hours:mins/60.0}},{new: true })
        const course=await Course.findByIdAndUpdate(sub.course,{ $inc: {totalHours:mins/60.0}},{new: true })
        console.log(course)
        res.status(200).json(sub)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}
```

#### Function to update a report's status
```javaScript
const updateReport =  async (req,res)=>{
    var status = req.body.status; 
    var id = req.params.id;
    res.status(200).json(await Report.findByIdAndUpdate({"_id"  : id}, {"status": status}));
};
```

#### Function to add a followup to a report
```javaScript
const addFollowUp = async (req,res)=>{
    const {id} = req.params  
    const question =req.body.question 
    const followUp={"question":question,"answer":""}
    try{
        await Report.findOneAndUpdate({_id: id},{$push:{"followUps":followUp}})
        
        const rep = await Report.findById({_id:id}).select();
        res.status(200).json(rep)
    }catch( error ){
        res.status(400).json({error: error.message})
    }
} 
```

#### Function to search courses of logged in instructor
```javaScript
const searchCourses = async (req, res) => {
    const { input } = req.body    //course title or subject or instructor
    const  id  = req.user.id

    console.log(input)

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid Id" })
    }

    const inst = await Instructor.find({ _id: id })
    if (!inst) {
        return res.status(404).json({ error: "Invalid Id" })
    }

    if (!input) {
        //const courses = await Course.find({instructor: ObjectId(id) })
        return res.status(400).json({ error: 'Please enter a title or a subject' })
    }


    const courseByTitle = await Course.find({ instructor: id, title:{ $regex: input, "$options": "i" } }).select({ _id: 1, title: 1,subject:1,avgRating:1 })
    const courseBySubject = await Course.find({ instructor: id, subject: { $regex: input, "$options": "i" }}).select({ _id: 1, title: 1,subject:1,avgRating:1 })

    var result=courseByTitle
    for(let i=0;i<courseBySubject.length;i++)
    {
        let flag=false
        for(let j=0;j<courseByTitle.length;j++)
        {   
            if(courseBySubject[i]._id.equals(courseByTitle[j]._id))
             {
                 flag=true
             }
         }
         if(!flag)
         {
            result.push(courseBySubject[i])
         }
    }

    return res.status(200).json(result)


}
```
#### Function to edit biography and/or email of an instructor
```javaScript
const editInfo = async (req, res) => {
    const id = req.params.id
    const { email, miniBiography } = req.body
    if (!email && !miniBiography) {
        return res.status(400).json({ error: 'Please enter a new email or mini biography' })
    }
    if (email && email != "" && (!miniBiography || miniBiography == "")) { // edit email only
        const myInst = await Instructor.find({ _id: id }).updateOne({ email: email })
        if (myInst)
            return res.status(200).json(myInst)
    }
    else if (!email || email == "") { //edit bio only
        const myInst = await Instructor.find({ _id: id }).updateOne({ miniBiography: miniBiography })
        if (myInst)
            return res.status(200).json(myInst)
    }
    else {//edit both
        const myInst = await Instructor.find({ _id: id }).updateOne({ miniBiography: miniBiography, email: email })
        if (myInst)
            return res.status(200).json(myInst)
    }
    return res.status(404).json({ error: error.message })

}
```

#### Function to sign up a user to be an individual trainee
```javaScript
const signUp = async (req, res) => {
    const { username, email, password, firstName,lastName,gender} = req.body;

    const individualTraineeUserName= await IndividualTrainee.findOne({ username:username })
    const corporateTraineeUserName= await CorporateTrainee.findOne({ username:username })
    const instructorUserName= await Instructor.findOne({ username:username })
    const administratorUserName= await Administrator.findOne({ username:username })

    const individualTraineeEmail= await IndividualTrainee.findOne({ email:email })
    const corporateTraineeEmail= await CorporateTrainee.findOne({ email:email })
    const instructorEmail= await Instructor.findOne({ email:email })

    if(individualTraineeUserName || corporateTraineeUserName || instructorUserName || administratorUserName)
    {
        return res.status(401).json({ msg: "Username taken" })
    }
    else if(individualTraineeEmail || corporateTraineeEmail || instructorEmail)
    {
        return res.status(401).json({ msg: "Email used before" })
    }
    else
    {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            const indTrainee = await IndividualTrainee.create({ username: username, email: email, password: hashedPassword , firstName:firstName,
            lastName:lastName, crediCardNo:"",gender:gender});
            const token = createToken(indTrainee.username,indTrainee._id,"individualTrainee");
            res.cookie('jwt', token, { httpOnly: true, maxAge: 24*60*60*1000 });
            res.cookie('role','individualTrainee',{ httpOnly: false, maxAge: 24*60*60*1000 })
           return  res.status(200).json({id:indTrainee._id,type:"individualTrainee",msg:"Sign Up success"})
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }
    
}
```
#### Function to log out a user
```javaScript
const logOut=async(req,res)=>{
    res.cookie('jwt', "", { httpOnly: true, maxAge:  1 });

    res.cookie('role', "", { httpOnly: true, maxAge:  1 });
    res.status(200).json({msg:"You are logged out!"})
}
```

#### Function to get the currency according to the selected country of a logged in user
```javaScript
const getCurrency=async(req, res) => {
    const id=req.user.id
    const type=req.user.type
    var country
    
    if(type==="instructor")
    {
         tmp=await Instructor.findOne({_id:id},{"country":1})
         country=tmp.country
         console.log(country)
    }
    else if (type==="individualTrainee")
    {
        tmp=await IndividualTrainee.findOne({_id:id},{"country":1})
         country=tmp.country
         console.log(country)
    }
    else if (type==="corporateTrainee")
    {
        tmp=await CorporateTrainee.findOne({_id:id},{"country":1})
         country=tmp.country
         console.log(country)
    }
    else{
        country="United States"
    }

    var currencySymbol = currency.getParamByParam('countryName', country, 'currency')
    res.status(200).json(currencySymbol)
}
```
#### Function to get currency of a guest user
```javaScript
const getCurrencyGuest=(req, res) => {
    var country
    if(req.session.country)
         country = req.session.country
    else
        country="United States"
    var currencySymbol = currency.getParamByParam('countryName', country, 'currency')
    res.status(200).json(currencySymbol)
}
```


## Installation

* Clone this repository [here](https://github.com/Advanced-Computer-Lab-2022/Flash).
* The main branch is the most stable branch at any given time, ensure you're working from it.
* Open  terminal  & cd backend and run npm install to install all dependencies
* Open new terminal &  cd frontend and run npm install --save --legacy-peer-deps to install all dependencies
* Create a .env file in your project root folder and add your variables 


## API References

#### Get all items

```http
  GET /items
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get item

```http
  GET /items/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch. Returns data from database about item with this ID. |

#### Login

```http
  POST /login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username, password`      | `string` | Logs a user in if he exists |

#### Get Currency

```http
  GET /login/currency
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id, type`      | `string` | Get the currency/country of the logged in user from the database using their id and type |

#### Filter Courses

```http
  POST /courses/filter
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `subject, adjustedPrice, Rating`      | `string` | Return filtered courses with the constraints/parameters given |


#### Get course instructor

```http
  GET /courses/:id/courseInstructor
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id`      | `string` | Return the instructor that teaches the course with the input id |

#### Get number of trainees enrolled in a course

```http
  POST /courses/numberOfTrainees
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `courseId`      | `string` | Given the courseId, return the number of trainees enrolled in that course |

#### Get the three courses with the largest number of enrolled trainees (either individual or corporate) on the platform

```http
  GET /courses/popularCourses
```

#### Search for a course based on its title, subject, or instructor name

```http
  POST /courses/search
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `input`      | `string` | Given input search key, return all courses that their title, or subject, or instructor first/last name match the input |

#### Add/Edit a rating for a course

```http
  PATCH /courses/addRating
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id, newRating, raterID`      | `string` | Given the id of the course, the newRating added, and the raterID, if this trainee rated the course before, edit his/her rating to the newRating. If this trainee didn't rate the course before, add a new rating  |

#### Add/Edit a review for a course

```http
  PATCH /courses/addReview
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id, newReview, raterID`      | `string` | Given the id of the course, the newReview added, and the raterID, if this trainee reviewed the course before, edit his/her review to the newReview. If this trainee didn't review the course before, add a new review  |

#### Admin add corporate trainee

```http
  POST /administrators/addCorporateTrainee
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username, password, email, firstName, lastName, gender, corporate`      | `string` | Creates a new corporate trainee and provides them with a username and password |

####  Set the attribute of first login for corporate trainee to false

```http
  GET /corporateTrainees/firstLoginDone
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId`  | `string` | During the first login, a corporate trainee must change their password, then this request sets the attribute that indicates it's the first login to false |

####  Get all course requests for the logged in corporate Trainee

```http
  GET /corporateTrainees/courseRequests
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId`  | `string` | Gets all the ids of the courses requested by this corporate trainee |

####  A corporate trainee requests a course

```http
  PATCH /corporateTrainees/:id/courses
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id , courseID`  | `string` | Given the id of the corporate trainee and the courseId, add this course to this trainee's requested courses |


#### Admin accepts refund

```http
  PATCH /administrators/:id/acceptRefund
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id, userId, courseId`      | `string` | Accept a refund request given the request id, user id, course id if and only if their progress in the course doesnt exceed 50% |

#### Admin rejects refund

```http
  PATCH /administrators/:id/rejectRefund
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id, userId, courseId`      | `string` | Reject a refund request given the request id, user id, course id |

#### Individual trainee adds their credit card details to register for a course

```http
  PATCH /individualTrainees/addCreditCard/:id
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id,creditCardNo, cvv`      | `string` | Add credit card details to the user's data in the database using their id|

#### A logged in user changes his/her password

```http
  PATCH /user/changePassword
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id,oldPassword, newPassword`      | `string` | Given the user's id, oldPassword, and newPassword, change the user's password to be newPassword if and only if the oldPassword matches the current user's password|

#### A user that's not logged in receives an email to change his/her password

```http
  POST /user/write-email
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email`      | `string` | Given an email, send a link to that email to change a forgotten password for the account associated with this email |


#### A logged in user downloads a certificate for a completed course

```http
  POST /user/download-certificate
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username, course, userId`      | `string` | Given username, course id, userId, download a certficate of completion of this course dedicated to the user with the specific username and userId |



## Tests
To test any backend requests, you can use postman in the form of localhost:7000/[nameofcontroller]/[route].
Postman can be used to automate many types of tests including unit tests, functional tests, integration tests, etc, where we enter the end-point URL, it sends the request to the server and receives the response back. 
Choose the type of the request from a dropdown menu. If this request requires data in the request body, go to body in postman, then select raw, then select your preffered format for the data (we used JSON), then send the request and wait for the response in postman. A couple of examples to guide:
- GET localhost:7000/courses 
   * Response body (json pretty)
    [
    {
        "_id": "63b0109870f41e79cfaf6a5d",
        "title": "Probability and Statistics",
        "subject": "math",
        "price": 290,
        "avgRating": 4,
        "instructor": "635d44924fbfa28095871a3a",
        "outline": "very important course",
        "totalHours": 4,
        "ratings": [
            {
                "raterID": "63a6c1f985c4dec4a1e5f0cf",
                "raterName": "tired",
                "rating": 4,
                "review": "",
                "_id": "63b1d767ca1a62969beed04f"
            }
        ],
        "reviews": [],
        "createdAt": "2022-12-31T10:36:08.791Z",
        "updatedAt": "2023-01-04T08:06:40.705Z",
        "__v": 0,
        "discountEnd": "2023-01-06T00:00:00.000Z"
    }, ...]

- GET http://localhost:7000/reports 
   * Response body (json pretty)[
    {
        "_id": "6395cf6317078a1549bd02c0",
        "text": "new issue",
        "type": "technical",
        "status": "unresolved",
        "reporter": "635d44924fbfa28095871a3a",
        "followUps": [
            {
                "question": "did u solve my issue",
                "answer": "shut up",
                "_id": "6395d0c560287ea526acdd21"
            },
            {
                "question": "did u solve my issue",
                "answer": "ok",
                "_id": "6395d0f460287ea526acdd24"
            },
            {
                "question": "hello?",
                "answer": "what",
                "_id": "63960104a7ddd0f22ae8f01c"
            },
            {
                "question": "?",
                "answer": "!",
                "_id": "6396156ae8251655f6d3ef6e"
            },
            {
                "question": "?",
                "answer": "",
                "_id": "63961594e8251655f6d3ef78"
            },
            {
                "question": "test again?",
                "answer": "test last",
                "_id": "63961626e8251655f6d3efcc"
            }
        ],
        "createdAt": "2022-12-11T12:38:59.223Z",
        "updatedAt": "2022-12-23T09:47:35.217Z",
        "__v": 0
    }, ...]

- GET http://localhost:7000/individualTrainees/:id
   * Success Case with id 63af37066a6f1457779dca06
     * Response body (json pretty){
    "_id": "63af37066a6f1457779dca06",
    "username": "ayaaya",
    "password": "$2b$10$uGkLua0vIvxOR3Qt217eHOJMnm8yU3.LPIQvqZMpkhJvJe28kuAcO",
    "email": "ayamahmoud@guc",
    "firstName": "Aya",
    "lastName": "Mahmoud",
    "gender": "female",
    "wallet": 0,
    "country": "United States",
    "currentCourses": [],
    "createdAt": "2022-12-30T19:07:50.554Z",
    "updatedAt": "2022-12-30T19:07:50.554Z",
    "__v": 0
    }  

   * Failure Case - non existing id passed in URL
     * Response body (json pretty):
          null

- GET http://localhost:7000/reports/:id/followUp
   * Success Case with id 63b1c50dbc3f384b97b1e84e
     * Response body (json pretty)[
    {
        "_id": "63b1c50dbc3f384b97b1e84e",
        "followUps": [
            {
                "question": "This is a follow up by tired.",
                "answer": "This is an answer to tired's follow up",
                "_id": "63b1c547bc3f384b97b1ea36"
            },
            {
                "question": "follow",
                "answer": "",
                "_id": "63b533491be2b1a11245f336"
            }
        ],
        "createdAt": "2023-01-01T17:38:21.840Z",
        "updatedAt": "2023-01-04T08:05:29.646Z",
        "__v": 0
    }
  ]
   * Failure Case with none existing report id 
     * Response body (json pretty):
         []
    

- POST localhost:7000/login 

  * Sucess Case 
     * Request body (json raw){
        "username":"ayaaya",
        "password":"trainee123"
    }
     * Response body (json pretty){
        "id": "63af37066a6f1457779dca06",
        "type": "individualTrainee",
        "msg": "Login success"
    }

   * Failure Case 
     * Request body (json raw){
        "username":"ayaaya",
        "password":"wrongpass"
    }
     * Response body (json pretty){
        "msg": "Invalid credential"
    }

- GET http://localhost:7000/login/currency
   * Sucess Case
      * Response body (json pretty):
         "USD"

   * Failure Case
      * Response body (json pretty){
      "message": "You are not logged in."
      }

- POST localhost:7000/courses/filter 
   * Test Case 1
     * Request body (json raw){
        "subject":"cs",
        "adjustedPrice":"200",
        "Rating":"0"
    }
     * Response body (json pretty)[
    {
        "_id": "63b0329f060b0df5f1133b51",
        "title": "Data structures and algorithims",
        "subject": "cs",
        "price": 200,
        "avgRating": 0,
        "instructor": "63a5b23c96e2a30e030728c5",
        "outline": "A very imported Computer science course",
        "previewVideo": "https://www.youtube.com/watch?v=Tzl0ELY_TiM",
        "discount": 50,
        "totalHours": 22,
        "shortSummary": "Teacher one of the most important concepts in the computer science industry",
        "ratings": [],
        "reviews": [],
        "createdAt": "2022-12-31T13:01:19.440Z",
        "updatedAt": "2023-01-04T08:06:41.240Z",
        "__v": 0,
        "discountEnd": "2023-01-06T00:00:00.000Z",
        "discountStart": "2023-01-04T00:00:00.000Z"
    },
    {
        "_id": "63b03b5d6a545e720db93510",
        "title": "Advanced Computer Lab",
        "subject": "cs",
        "price": 99,
        "avgRating": 0,
        "instructor": "635d44924fbfa28095871a3a",
        "outline": "A course with a heavy project simulating real life experience",
        "previewVideo": "https://www.youtube.com/watch?v=3VHCxuxtuL8",
        "discount": 50,
        "totalHours": 2,
        "shortSummary": "A course with a heavy project simulating real life experience",
        "ratings": [],
        "reviews": [],
        "createdAt": "2022-12-31T13:38:37.828Z",
        "updatedAt": "2023-01-04T08:06:41.763Z",
        "__v": 0,
        "discountEnd": "2023-01-06T00:00:00.000Z",
        "discountStart": "2023-01-04T00:00:00.000Z"
    }
  ]

  * Test Case 2
     * Request body (json raw){
          "subject":"math"
      }
      * Response body (json pretty)[
    {
        "_id": "63b0109870f41e79cfaf6a5d",
        "title": "Probability and Statistics",
        "subject": "math",
        "price": 290,
        "avgRating": 4,
        "instructor": "635d44924fbfa28095871a3a",
        "outline": "very important course",
        "totalHours": 4,
        "ratings": [
            {
                "raterID": "63a6c1f985c4dec4a1e5f0cf",
                "raterName": "tired",
                "rating": 4,
                "review": "",
                "_id": "63b1d767ca1a62969beed04f"
            }
        ],
        "reviews": [],
        "createdAt": "2022-12-31T10:36:08.791Z",
        "updatedAt": "2023-01-04T08:06:40.705Z",
        "__v": 0
    },
    {
        "_id": "63b03bf37e20c48d3ab64024",
        "title": "Math 5",
        "subject": "math",
        "price": 8,
        "avgRating": 0,
        "instructor": "635d44924fbfa28095871a3a",
        "outline": "math",
        "totalHours": 7,
        "ratings": [],
        "reviews": [],
        "createdAt": "2022-12-31T13:41:07.256Z",
        "updatedAt": "2023-01-04T08:06:42.324Z",
        "__v": 0
    }
  ]

- GET localhost:7000/courses/:id/courseInstructor 
  * Test Case 1 id is 63b0109870f41e79cfaf6a5d
     * Response body (json pretty){
    "_id": "635d44924fbfa28095871a3a",
    "username": "ahmedh123",
    "password": "$2b$10$j/rBcJrNJTVBN83L4WC.DuEniymiyYSlK8goXd.y1uA4HIfnvT4ri",
    "email": "aya2112@gmail.com",
    "firstName": "Ahmed",
    "lastName": "Hassan",
    "ratings": [
        {
            "raterID": "638494cb57ec80a3e845035f",
            "rating": 5,
            "_id": "638c6c2144796d52736da9db"
        },
        {
            "raterID": "63a5b19396e2a30e030728bc",
            "rating": 3,
            "_id": "638c6d9544796d52736daabd"
        },
        {
            "raterID": "6393970b32ad039bb6153819",
            "rating": 5,
            "_id": "6396d0725c934fe1f26a68a3"
        },
        {
            "raterID": "63a6c1f985c4dec4a1e5f0cf",
            "rating": 4,
            "_id": "63b11c827d3518b1f4617bb2"
        }
    ],
    "miniBiography": "Graduated from German university in Cairo, 2002.",
    "gender": "male",
    "reviews": [
        {
            "reviewerID": "6359b0cb73cc9ff23c41caf7",
            "review": "ghghghg",
            "_id": "638c67bc74bfe35ccafca9bf"
        },
        {
            "reviewerID": "6359b0cb73cc9ff23c41caf7",
            "review": "testing",
            "_id": "6396d0765c934fe1f26a68a5"
        },
        {
            "reviewerID": "6393970b32ad039bb6153819",
            "review": "testtt",
            "_id": "6396d95cdf5762ffea19060b"
        },
        {
            "reviewerID": "63a6c1f985c4dec4a1e5f0cf",
            "review": "",
            "_id": "63b11c837d3518b1f4617bbe"
        },
        {
            "reviewerID": "63a6c1f985c4dec4a1e5f0cf",
            "review": "",
            "_id": "63b11c837d3518b1f4617bbf"
        },
        {
            "reviewerID": "63a6c1f985c4dec4a1e5f0cf",
            "review": "",
            "_id": "63b11c837d3518b1f4617bc0"
        }
    ],
    "wallet": 11121.385,
    "contract": "Our platform collects 30% of the course's revenue",
    "createdAt": "2022-10-26T22:10:16.588Z",
    "updatedAt": "2023-01-05T10:18:59.672Z",
    "__v": 0,
    "acceptedContract": true,
    "country": "Comoros"
  }

   * Test Case 2 id is 63b0329f060b0df5f1133b51
      * Response body (json pretty){
    "_id": "63a5b23c96e2a30e030728c5",
    "username": "instructor1",
    "password": "$2b$10$vKkMliozJu1tyNt1s/qgWehmfouAsUtRjLN/mpvTq.7K.sq/s.NEm",
    "email": "i@gmail.com",
    "firstName": "instructor",
    "lastName": "instructorrr",
    "miniBiography": "I like being an instructor",
    "gender": "male",
    "wallet": 2657.76,
    "contract": "hello world",
    "acceptedContract": true,
    "country": "United States",
    "ratings": [
        {
            "raterID": "63a5b19396e2a30e030728bc",
            "rating": 5,
            "_id": "63a7610586aba31f33cb7204"
        },
        {
            "raterID": "63a6c1f985c4dec4a1e5f0cf",
            "rating": 3,
            "_id": "63aedf3eba2f7cbe43b12574"
        }
    ],
    "reviews": [
        {
            "reviewerID": "63a6c1f985c4dec4a1e5f0cf",
            "review": "",
            "_id": "63aea604b0e4447ac449257d"
        },
        {
            "reviewerID": "63a5b7cb5888cec4625af9ff",
            "review": "Thank you",
            "_id": "63a761c221ff4d74ddf820b9"
        }
    ],
    "createdAt": "2022-12-23T13:50:52.348Z",
    "updatedAt": "2023-01-04T08:07:56.037Z",
    "__v": 0
  }

- POST localhost:7000/courses/numberOfTrainees 
  * Test Case 1
    * Request body (json raw){
        "courseId":"63b03bf37e20c48d3ab64024"
    }
    * Response body (json pretty){
    "number": 2
    }

  * Test Case 2
    * Request body (json raw){
        "courseId":"63b0109870f41e79cfaf6a5d"
    }
    * Response body (json pretty){
    "number": 5
    } 
- GET localhost:7000/courses/popularCourses 
   * Response body (json pretty)[
    {
        "_id": "63b0109870f41e79cfaf6a5d",
        "title": "Probability and Statistics",
        "subject": "math",
        "price": 290,
        "avgRating": 4,
        "instructor": "635d44924fbfa28095871a3a",
        "outline": "very important course",
        "previewVideo": "https://www.youtube.com/watch?v=SkidyDQuupA",
        "discount": 50,
        "totalHours": 4,
        "shortSummary": "important course for machine learning",
        "ratings": [
            {
                "raterID": "63a6c1f985c4dec4a1e5f0cf",
                "raterName": "tired",
                "rating": 4,
                "review": "",
                "_id": "63b1d767ca1a62969beed04f"
            }
        ],
        "reviews": [],
        "createdAt": "2022-12-31T10:36:08.791Z",
        "updatedAt": "2023-01-04T08:06:40.705Z",
        "__v": 0,
        "discountEnd": "2023-01-06T00:00:00.000Z",
        "discountStart": "2023-01-04T00:00:00.000Z"
    },
    {
        "_id": "63b52db91be2b1a11245ec2e",
        "title": "ACL",
        "subject": "cs",
        "price": 1000,
        "avgRating": 4.5,
        "instructor": "63b52d471be2b1a11245ebab",
        "outline": "ACL",
        "previewVideo": "https://www.youtube.com/watch?v=MnUd31TvBoU",
        "discount": 50,
        "totalHours": 0.3666666666666667,
        "shortSummary": "ACL",
        "ratings": [
            {
                "raterID": "63b529b01be2b1a11245e453",
                "raterName": "hadwa.hassan",
                "rating": 5,
                "review": "very good",
                "_id": "63b531491be2b1a11245edf0"
            },
            {
                "raterID": "63a6c1f985c4dec4a1e5f0cf",
                "raterName": "tired",
                "rating": 4,
                "review": "",
                "_id": "63b56be6ca1a62969beee195"
            }
        ],
        "reviews": [],
        "createdAt": "2023-01-04T07:41:45.401Z",
        "updatedAt": "2023-01-04T12:07:05.303Z",
        "__v": 0,
        "discountEnd": "2023-01-06T00:00:00.000Z",
        "discountStart": "2023-01-04T00:00:00.000Z"
    },
    {
        "_id": "63b03bf37e20c48d3ab64024",
        "title": "Math 5",
        "subject": "math",
        "price": 8,
        "avgRating": 0,
        "instructor": "635d44924fbfa28095871a3a",
        "outline": "math",
        "previewVideo": "https://www.youtube.com/watch?v=3VHCxuxtuL8",
        "discount": 50,
        "totalHours": 7,
        "shortSummary": "math",
        "ratings": [],
        "reviews": [],
        "createdAt": "2022-12-31T13:41:07.256Z",
        "updatedAt": "2023-01-04T08:06:42.324Z",
        "__v": 0,
        "discountEnd": "2023-01-06T00:00:00.000Z",
        "discountStart": "2023-01-04T00:00:00.000Z"
    }
  ]

- POST localhost:7000/courses/search 
  * Test Case 1
    * Request body (json raw){
      "input":"computer"
    }
    * Response body (json pretty)[
    {
        "_id": "63b03b5d6a545e720db93510",
        "title": "Advanced Computer Lab",
        "subject": "cs",
        "price": 99,
        "avgRating": 0,
        "instructor": "635d44924fbfa28095871a3a",
        "outline": "A course with a heavy project simulating real life experience",
        "totalHours": 2,
        "ratings": [],
        "reviews": [],
        "createdAt": "2022-12-31T13:38:37.828Z",
        "updatedAt": "2023-01-04T08:06:41.763Z",
        "__v": 0
    }
  ]

  * Test Case 2
    * Request body (json raw){
      "input":"math"
    }
    * Response body (json pretty)[
    {
        "_id": "63b03bf37e20c48d3ab64024",
        "title": "Math 5",
        "subject": "math",
        "price": 8,
        "avgRating": 0,
        "instructor": "635d44924fbfa28095871a3a",
        "outline": "math",
        "totalHours": 7,
        "ratings": [],
        "reviews": [],
        "createdAt": "2022-12-31T13:41:07.256Z",
        "updatedAt": "2023-01-04T08:06:42.324Z",
        "__v": 0
    },
    {
        "_id": "63b0109870f41e79cfaf6a5d",
        "title": "Probability and Statistics",
        "subject": "math",
        "price": 290,
        "avgRating": 4,
        "instructor": "635d44924fbfa28095871a3a",
        "outline": "very important course",
        "totalHours": 4,
        "ratings": [
            {
                "raterID": "63a6c1f985c4dec4a1e5f0cf",
                "raterName": "tired",
                "rating": 4,
                "review": "",
                "_id": "63b1d767ca1a62969beed04f"
            }
        ],
        "reviews": [],
        "createdAt": "2022-12-31T10:36:08.791Z",
        "updatedAt": "2023-01-04T08:06:40.705Z",
        "__v": 0
    }
  ]

- PATCH localhost:7000/courses/addRating 
  * Test Case 1
     * Request body (json raw){
       "course":"63b03bf37e20c48d3ab64024",
       "rate":3
      }
     * Response body (json pretty):
       "rate added"
  * Test Case 2 with non-existing course id
       * Request body (json raw){
        "course":"63b03bf37e20c48d3ab64022",
        "rate":4
        }
       * Response body (json pretty)
        {}

- PATCH localhost:7000/courses/addReview 
  * Test Case 1
     * Request body (json raw){
       "course":"63b03bf37e20c48d3ab64024",
       "review": "a very good course"
      }
     * Response body (json pretty):
      "review added"
  * Test Case 2 with non-existing course id
       * Request body (json raw){
        "course":"63b03bf37e20c48d3ab64022",
        "review":"a very good course"
        }
       * Response body (json pretty)
        {}

-   POST localhost:7000/administrators/addCorporateTrainee
    * Test case 1
        * Request body (json raw)
        {
         "username":"trainee23",
         "password":"ctrainee123",
         "email":"aya222@gmail.com",
         "firstName":"Aya",
         "lastName":"Mahmoud",
         "gender":"female",
         "corporate":"WAM"
        }
        * Response body (json pretty)
        {
        "username": "trainee23",
        "password": "$2b$10$fPeyFwDebCQiyXU364GQgeg2n903lat.YPYKAUqFAq0AuDMFY1O9a",
        "email": "aya222@gmail.com",
        "firstName": "Aya",
        "lastName": "Mahmoud",
        "gender": "female",
        "wallet": 0,
        "isFirstLogin": true,
        "corporate": "639fb1a750fc1106353f81c9",
        "country": "United States",
        "_id": "63b87f4677d6bb9a25d8b860",
        "currentCourses": [],
        "courseRequests": [],
        "createdAt": "2023-01-06T20:06:30.955Z",
        "updatedAt": "2023-01-06T20:06:30.955Z",
        "__v": 0
        }
    * Test case 2 with missing data
        * Request body (json raw){
             "username":"trainee23",
             "password":"ctrainee123",
             "email":"aya@gmail.com",
             "firstName":"Aya",
             "lastName":"Mahmoud",
             "gender":"female"
        }
        * Response body (json pretty)
        {
         "error": "please complete info"
        }
    * Test case 3 with a corporate that doesn't exist in the database
        * Request body (json raw)
        {
        "username":"trainee23",
        "password":"ctrainee123",
        "email":"aya222@gmail.com",
        "firstName":"Aya",
        "lastName":"Mahmoud",
        "gender":"female",
        "corporate":"guc"
        }
        * Response body (json pretty)
        {
        "error": "Cannot read properties of null (reading '_id')"
        }
    * Test case 4 with an email that already exists in the database
        * Request body (json raw)
        {
        "username":"trainee234",
        "password":"ctrainee123",
        "email":"aya@gmail.com",
        "firstName":"Aya",
        "lastName":"Mahmoud",
        "gender":"female",
        "corporate":"WAM"
        }
        * Response body (json pretty)
        {
        "error": "This email is already associated with an account"
        }
    * Test case 5 with a username that already exists in the database
        * Request body (json raw)
        {
        "username":"tired",
        "password":"ctrainee123",
        "email":"aya@gmail.com",
        "firstName":"Aya",
        "lastName":"Mahmoud",
        "gender":"female",
        "corporate":"WAM"
        }
        * Response body (json pretty)
        {
        "error": "username already exists"
        }

- GET localhost:7000/corporateTrainees/firstLoginDone
    * Test case 1 when the logged in user is a corporate trainee
        * Request body (json raw) {}
        * Response body (json pretty)
        {
    "_id": "63b87f4677d6bb9a25d8b860",
    "username": "trainee23",
    "password": "$2b$10$fPeyFwDebCQiyXU364GQgeg2n903lat.YPYKAUqFAq0AuDMFY1O9a",
    "email": "aya222@gmail.com",
    "firstName": "Aya",
    "lastName": "Mahmoud",
    "gender": "female",
    "wallet": 0,
    "isFirstLogin": false,
    "corporate": "639fb1a750fc1106353f81c9",
    "country": "United States",
    "currentCourses": [
        {
            "myRating": {
                "rating": 0,
                "review": ""
            },
            "title": "63b0109870f41e79cfaf6a5d",
            "progress": 0,
            "percentage": 0,
            "certificate": "",
            "done": false,
            "subtitles": [
                {
                    "subtitleID": "63b0109970f41e79cfaf6a5f",
                    "video": false,
                    "lecture": false,
                    "exercise": false,
                    "notes": "",
                    "_id": "63b87f4777d6bb9a25d8b864"
                },
                {
                    "subtitleID": "63b0109970f41e79cfaf6a60",
                    "video": false,
                    "lecture": false,
                    "exercise": false,
                    "notes": "",
                    "_id": "63b87f4777d6bb9a25d8b865"
                }
            ],
            "_id": "63b87f4777d6bb9a25d8b863"
        }
    ],
    "courseRequests": [],
    "createdAt": "2023-01-06T20:06:30.955Z",
    "updatedAt": "2023-01-06T20:17:35.836Z",
    "__v": 0
}
    * Test case 2 when the logged in user is not a corporate trainee
        * Request body (json raw) {}
        * Response body (json pretty)
        null

- GET localhost:7000/corporateTrainees/courseRequests 
    * Test case 1 where logged in user is a corporate trainee
        * Request body (json raw){}
        * Response body (json pretty)
        {
    "_id": "63b87f4677d6bb9a25d8b860",
    "courseRequests": [
        {
            "title": "63b52db91be2b1a11245ec2e",
            "status": "pending",
            "_id": "63b882a477d6bb9a25d8b9f6"
        }
    ]
}

   * Test case 2 where logged in user is not a corporate trainee
       * Request body (json raw){}
       * Response body (json pretty)
       null

- PATCH localhost:7000/corporateTrainees/:id/courses
    * Test case 1 with id 63b87f4677d6bb9a25d8b860 and a course that hasn't been requested before by this trainee
        * Request body (json raw)
        {
        "courseId":"63b03bf37e20c48d3ab64024"
        }
        * Response body (json pretty)
        {
    "_id": "63b87f4677d6bb9a25d8b860",
    "username": "trainee23",
    "password": "$2b$10$fPeyFwDebCQiyXU364GQgeg2n903lat.YPYKAUqFAq0AuDMFY1O9a",
    "email": "aya222@gmail.com",
    "firstName": "Aya",
    "lastName": "Mahmoud",
    "gender": "female",
    "wallet": 0,
    "isFirstLogin": false,
    "corporate": "639fb1a750fc1106353f81c9",
    "country": "United States",
    "currentCourses": [
        {
            "myRating": {
                "rating": 0,
                "review": ""
            },
            "title": "63b0109870f41e79cfaf6a5d",
            "progress": 0,
            "percentage": 0,
            "certificate": "",
            "done": false,
            "subtitles": [
                {
                    "subtitleID": "63b0109970f41e79cfaf6a5f",
                    "video": false,
                    "lecture": false,
                    "exercise": false,
                    "notes": "",
                    "_id": "63b87f4777d6bb9a25d8b864"
                },
                {
                    "subtitleID": "63b0109970f41e79cfaf6a60",
                    "video": false,
                    "lecture": false,
                    "exercise": false,
                    "notes": "",
                    "_id": "63b87f4777d6bb9a25d8b865"
                }
            ],
            "_id": "63b87f4777d6bb9a25d8b863"
        }
    ],
    "courseRequests": [
        {
            "title": "63b52db91be2b1a11245ec2e",
            "status": "pending",
            "_id": "63b882a477d6bb9a25d8b9f6"
        },
        {
            "status": "pending",
            "_id": "63b8842877d6bb9a25d8ba14"
        }
    ],
    "createdAt": "2023-01-06T20:06:30.955Z",
    "updatedAt": "2023-01-06T20:27:20.613Z",
    "__v": 0
}
   * Test case 2 with id 63b87f4677d6bb9a25d8b860 and a course that has been requested before by this trainee
       * Request body (raw json)
       {
        "courseId":"63b52db91be2b1a11245ec2e"
       }
       * Response body (json pretty)
       {
        "error": "you have already requested this course"
        }

- PATCH localhost:7000/administrators/:id/acceptRefund
    * Test case 1 with id of admin 6359afa073cc9ff23c41caad
        * Request body (raw json)
        {
        "-id":"63b885cb77d6bb9a25d8bc0e",
        "userId":"63af37066a6f1457779dca06",
        "courseId":"63b0109870f41e79cfaf6a5d"
        }
        * Response body (json pretty)
        "done"
    * Test case 2 with id of admin 6359afa073cc9ff23c41caad but the userId is of a user that is not a corporate trainee
         * Request body (raw json)
        {
        "_id":"63b885cb77d6bb9a25d8bc0e",
        "userId":"63a99ae2ff93081a524fe4fa",
        "courseId":"63b0109870f41e79cfaf6a5d"
        }
        * Response body (json pretty)
        {
        "error": "Cannot read properties of undefined (reading 'toObject')"
        }

- PATCH localhost:7000/administrators/:id/rejectRefund
    * Test case 1 with id of admin 6359afa073cc9ff23c41caad
        * Request body (raw json)
        {
        "_id":"63b8898077d6bb9a25d8bd7a",
        }
        * Response body (json pretty)
        "done"

- PATCH /individualTrainees/addCreditCard/:id
    * Test case 1 with id of individual trainee 63af37066a6f1457779dca06
        * Request body (json raw)
       {
        "creditCardNo":"4242424242424242",
        "cvv":"123"
        }
        * Response body (json pretty)
        {
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
   * Test case 2 with id of individual trainee 63af37066a6f1457779dca06 but not all fields are entered
       * Request body (json raw)
       {
    "creditCardNo":"4242424242424242"
        }
       * Response body (json pretty )
       {
        "error": "please enter all information"
        }
    * Test case 3 with a non-existing individual trainee id of 63b8898077d6bb9a25d8bd7a
        * Request body (json raw)
       {
        "creditCardNo":"4242424242424242",
        "cvv":"123"
        }
        * Response body (json pretty)
     {
    "acknowledged": true,
    "modifiedCount": 0,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 0
}

- PATCH localhost:7000/user/changePassword
    * Test case 1 
        * Request body (json raw)
        {
    "oldPassword":"trainee123",
    "newPassword":"ayaaya"
       }
     * Response body (json pretty)
     "Password changed successfully"

* Test case 2 with incorrect old password
    * Request body (json raw)
        {
    "oldPassword":"trainee",
    "newPassword":"ayaaya"
}

   * Response body (json pretty)
    "Incorrect old password"

- POST localhost:7000/user/write-email
    * Test case 1
        * Request body (json raw)
        {
            "email":"ayaabdelghaffar211@gmail.com"
        }
        * Response body (json pretty)
        password reset link sent to your email account
    * Test case 2 with a non-existing email
        * Request body (json raw)
        {
        "email":"testing@gmail.com"
        }
        * Response body (json pretty)
        email doesn't exist

- POST localhost:7000/user/download-certificate
    * Test case 1
    ![AppScreenshot](https://i.paste.pics/5b70cd19d89bbc0f85b83dc02a13c852.png)

For frontend testing, one way was to go to the page in a browser, right click, choose inspect, go to console and check for any warnings or errors applied in a specific part of a page where it's not clearly shown in the VS Code terminal.


## How to use
* Load entire folder in VS code
* Open the first terminal, run cd backend then npm i then npm run dev.
* Open the second terminal, run cd frontend then npm i then npm start.

The project should run on your local server. If it didnt load in the browser automatically, type the URL "http://localhost:3000/"

## Contribute
Your contribution to the project in any of the following areas would be highly appreciated.
- A channel of communication between the trainees enrolled in a course and the instructor for that course.
- Customized course recommendations for each trainee based on some questions they answer.
- A channel of communication between trainees enrolled in the same course so that they can help each other.
- Divide courses into levels: beginner, intermediate, advanced.
- Testing the website further by signing up and adding realistic test data.

## Credits

Node.js

https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU

https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_uZs4vJMIhcinABSTUH2bY

React introduction:

https://www.youtube.com/playlist?list=PLZlA0Gpn_vH_NT5zPVp18nGe_W9LqBDQK

JWT authentication:

https://dev.to/salarc123/mern-stack-authentication-tutorial-part-1-the-backend-1c57


## License 

* Apache License 2.0 for the Stripe CLI, YouTube API
* MIT License for mongoose, express, react, axios, nodemon, react-router-dom, and more
* Copyright (c) 2010 LearnBoost <dev@learnboost.com> for mongoose

## Authors

- [@Sara Tarek](https://github.com/saratarekg)

- [@Aya Abdelghaffar](https://github.com/AyaAbdelghaffar211)

- [@Doaa Shafie](https://github.com/doaa-shafie)

- [@Alaa Hesham](https://github.com/AlaaHesham)

- [@Mohamed Saed](https://github.com/mohamedsaeed189)

## Feedback 
If you have any feedback, please contact us at aya.abdelghaffar@student.guc.edu.eg OR sara.genina@student.guc.edu.eg




