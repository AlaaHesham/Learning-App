require('dotenv').config()
const { requireAuth } = require('./Middleware/authMiddleware');

const cors=require('cors')
const express = require('express')
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser');
var session = require('express-session');
const multer = require("multer");
const path = require("path");
const administratorsRoutes = require ('./routes/administrators')
const corporateTraineesRoutes = require ('./routes/corporateTrainees')
const coursesRoutes = require ('./routes/courses')
const examsRoutes = require ('./routes/exams')
const subtitlesRoutes = require ('./routes/subtitles')
const individualTraineesRoutes = require ('./routes/individualTrainees')
const instructorsRoutes = require ('./routes/instructors')
const reportsRoutes = require ('./routes/reports')
const loginRoutes = require ('./routes/login')
const userRoutes = require ('./routes/user')
const corporateRoutes = require ('./routes/corporates')

//express app
const app = express()

//middleware
app.use(express.json())
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use("/lectures", express.static(path.join(__dirname, "/lectures")));


app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "lectures");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

//routes
app.use('/administrators',administratorsRoutes)
app.use('/corporateTrainees',corporateTraineesRoutes)
app.use('/courses',coursesRoutes)
app.use('/exams',examsRoutes)
app.use('/subtitles',subtitlesRoutes)
app.use('/individualTrainees',individualTraineesRoutes)
app.use('/instructors',instructorsRoutes)
app.use('/reports',reportsRoutes)
app.use('/login',loginRoutes)
app.use('/user',userRoutes)
app.use('/corporates',corporateRoutes)

//connect to db and accessing same one everytime
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for requests
        app.listen(process.env.PORT,()=>{
        console.log('connected to db & listening on port ',process.env.PORT)
        })

    })
    .catch((error)=>{
        console.log(error)
    })

    app.get('/', function(req, res){  //home page just testing sessions and telling user visited how many times
        if(req.session.page_views){
           req.session.page_views++;
           res.send("You visited this page " + req.session.page_views + " times");
        } else {
           req.session.page_views = 1;
           res.send("Welcome to this page for the first time!");
        }
     });

     
//npm install express
//npm install nodemon -g
//npm install dotenv
//npm install mongoose
//npm run dev -> to run with nodemon
//npm i cookie-parser 
//npm i express-session

