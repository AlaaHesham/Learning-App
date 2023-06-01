
import { BrowserRouter, Routes, Route } from 'react-router-dom'


//pages and components

import Navbar1 from './components/Navbar/Navbar'
import SideNav from './components/SideNav/SideNav'

//import Navbar from './components/Navbar'

import AllCourses from './pages/AllCourses/AllCourses'
import AllCoursesGuest from './pages/AllCoursesGuest/AllCoursesGuest'
//import SelectCountry from './pages/SelectCountry/SelectCountry'
//import SelectCountryGuest from './pages/SelectCountryGuest/SelectCountryGuest'
import Login from './pages/Login/Login'
import Instructor from './pages/Instructor/Instructor'
import IndividualTrainee from './pages/IndividualTrainee/IndividualTrainee'
import CorporateTrainee from './pages/CorporateTrainee/CorporateTrainee'
import Guest from './pages/Guest/Guest'
//import SearchMyCourses from './pages/SearchMyCourses/SearchMyCourses'
import CreateCourse from './pages/CreateCourse/CreateCourse'
import AddCorporateTrainee from './pages/AddCorporateTrianee/AddCorporateTrianee'
import Administrator from './pages/Administrator/Administrator'
import AddAdmin from './pages/AddAdmin/AddAdmin'
import AddInstructor from './pages/AddInstructor/AddInstructor'
//import Filter from './pages/FilterCourses/FilterCourses'
//import FilterGuest from './pages/FilterCoursesGuest/FilterCoursesGuest'
//import FilterP from './pages/FilterCoursesP/FilterCoursesP'
//import FilterPGuest from './pages/FilterCoursesPGuest/FilterCoursesPGuest'
import Subtitles from './pages/Subtitles/Subtitles'
import { Excercises } from './pages/Excercises/Excercises'
import InstructorAddExcercise from './pages/InstructorAddExcercise/InstructorAddExcercise'
import CourseReviews from './pages/CourseReviews/CourseReviews'
import RatingsAndReviews from './pages/RatingsAndReviews/RatingsAndReviews'

import AddDiscount from './pages/AddDiscount/AddDiscount'

import ViewSubtitles from './pages/ViewSubtitles/ViewSubtitles'
import AddSubtitleVideo from './pages/AddSubtitleVideo/AddSubtitleVideo'

import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import ViewReports from './pages/ViewReports/ViewReports'
import ViewMyReportsI from './pages/ViewMyReportsI/ViewMyReportsI'
import ViewMyReportsIT from './pages/ViewMyReportsIT/ViewMyReportsIT'
import ViewMyReportsC from './pages/ViewMyReportsC/ViewMyReportsC'
import AddReportI from './pages/AddReportI/AddReportI'
import AddReportIT from './pages/AddReportIT/AddReportIT'
import AddReportC from './pages/AddReportC/AddReportC'
import ReportFollowUps from './pages/ReportFollowUps/ReportFollowUps'
import AddFollowUp from './pages/AddFollowUp/AddFollowUp'
import MyLearnings from './pages/MyLearnings/MyLearnings'


import AdminHome from './pages/AdminHome/AdminHome'
import ViewWallet from './pages/ViewWallet/ViewWallet'

//import /*placeholder*/ from './pages/Administrator'

//import Filter from './pages/FilterCourses'
import AllMyCoursesInstructor from './pages/AllMyCoursesInstructor/AllMyCoursesInstructor'
import MyCourseViewInstructor from './pages/MyCourseViewInstructor/MyCourseViewInstructor'
import SearchCourses from './pages/SearchCourses/SearchCourses'
import SearchCoursesGuest from './pages/SearchCoursesGuest/SearchCoursesGuest'
import SingleCourse from './pages/singleCourse/SingleCourse'
import SignUp from './pages/SignUp/SignUp'
import AdminRefund from './pages/AdminRefund/AdminRefund'
import AdminAcceptCourses from './pages/AdminAcceptCourses/AdminAcceptCourses'
import AdminAddDiscount from './pages/AdminAddDiscount/AdminAddDiscount'
//import PopularCourses from './pages/PopularCourses/PopularCourses'
import ForgetPassword from './pages/forgetPassword/ForgetPassword'
import ChangePassword from './pages/changePassword/ChangePassword'
import Profile from './pages/Profile/Profile'

import AccessDenied from './pages/AccessDenied'

import Cookie from 'js-cookie'
import CreateCourse2 from './pages/CreateCourse2/CreateCourse2'
import ViewCourse from './pages/ViewCourse'
import ViewCourseGuest from './pages/ViewCourseGuest/ViewCourseGuest'

import CourseRequestsCTrainee from "./pages/CourseRequestsCTrainee/CourseRequestsCTrainee"


function App() {

  let role = Cookie.get('role')
  console.log(role)
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar1 />



        <div className='pages'>

          <Routes>

            {/*for everyone */}
            <Route path="/" element={<Home />} />


            {/*if not logged in --> guest */}
            {role === undefined ?
              (
                <Route>
                  <Route path="/guest/courses" element={<AllCoursesGuest />} />
                  <Route path="/guest" element={<Guest />} />
                  <Route path="/courses/search/guest" element={<SearchCoursesGuest />} />
                  <Route path='/:id/ViewCourseGuest' element={<ViewCourseGuest/>}  />
                  <Route path="/login" element={<Login />} />
                 <Route path="/signup" element={<SignUp />} />
                <Route path='reset-password/:id' element={<ChangePassword />} />
                 <Route path='user/write-email' element={<ForgetPassword />} />
                </Route>)
              :
              (<Route path="/" element={<Home />} />)
            }


            {/*any logged in user*/}
            {
              role !== undefined ?
                (
                  <Route>
                    <Route path="/courses/:id" element={<AllCourses />} />
                    <Route path="/course/:id" element={<SingleCourse />} />
                    <Route path="/subtitles/:id" element={<Subtitles />} />
                    <Route path="/excercises/:id" element={<Excercises />} />

                    <Route path="/courses/search" element={<SearchCourses />} />
                    <Route path="/courses/:id/reviews" element={<CourseReviews />} />
                    <Route path='/courses/:id/viewSubtitles' element={<ViewSubtitles />} />
                    <Route path='/wallet/:id' element={<ViewWallet />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/reports/:id/followUps' element={<ReportFollowUps />} /> {/*why is this here?*/}

                  </Route>)
                :
                (<Route path="/" element={<Home />} />)
            }

            {/*instructor only*/}
            {
              role === "instructor" ?
                (
                  <Route>
                    <Route path="/instructor/:id" element={<Instructor />} />
                    <Route path="/instructor/myCourses" element={<AllMyCoursesInstructor />} />
                    <Route path="/instructor/myCourses/:id" element={<MyCourseViewInstructor />} />

                    <Route path='/instructor/createCourse' element={<CreateCourse />} />
                    <Route path="/instructor/excercises" element={<InstructorAddExcercise />} />

                    <Route path="/instructor/excercises/:id" element={<InstructorAddExcercise />} />

                    <Route path="/instructor/ratingsAndReviews" element={<RatingsAndReviews />} />
                    <Route path="/instructor/MyReports" element={<ViewMyReportsI />} />
                    <Route path="/instructor/AddReport" element={<AddReportI />} />

                    <Route path='/viewSubtitles/:id' element={<AddSubtitleVideo />} />
                    <Route path='/reports/:id/AddfollowUp' element={<AddFollowUp />} />
                    <Route path='/instructor/createCourse/:id' element={<CreateCourse2 />} />
                    <Route path='/:id/ViewCourse' element={<ViewCourse/>}  />
                  </Route>)
                :
                (<Route path="/" element={<Home />} />)
            }


            {/*individual trainee only*/}
            {
              role === "individualTrainee" ?
                (
                  <Route>
                     <Route path="/instructor/ratingsAndReviews" element={<RatingsAndReviews />} />
                    <Route path="/individualTrainee/:id" element={<IndividualTrainee />} />
                    <Route path="/individualTrainee/MyReports" element={<ViewMyReportsIT />} />
                    <Route path="/individualTrainee/AddReport" element={<AddReportIT />} />
                    <Route path='individualTrainee/myCourses/:id' element={<MyLearnings />} />
                    <Route path='/reports/:id/AddfollowUp' element={<AddFollowUp />} />
                    <Route path='/:id/ViewCourse' element={<ViewCourse/>}  />
                  </Route>)
                :
                (<Route path="/" element={<Home />} />)
            }



            {/*corporate trainee only*/}
            {
              role === "corporateTrainee" ?
                (
                  <Route>
                     <Route path="/instructor/ratingsAndReviews" element={<RatingsAndReviews />} />
                    <Route path="/corporateTrainee/:id" element={<CorporateTrainee />} />
                    <Route path="/CorporateTrainee/MyReports" element={<ViewMyReportsC />} />
                    <Route path="/CorporateTrainee/AddReport" element={<AddReportC />} />
                    <Route path='corporateTrainee/myCourses/:id' element={<MyLearnings />} />
                    <Route path='/reports/:id/AddfollowUp' element={<AddFollowUp />} />
                    <Route path='/:id/ViewCourse' element={<ViewCourse/>}  />
                    <Route path= "/corporateTrainee/courseRequests" element={<CourseRequestsCTrainee/>} />
                  </Route>)
                :
                (<Route path="/" element={<Home />} />)
            }


            {/*admin only*/}
            {
              role === "administrator" ?
                (
                  <Route>
                    <Route path="/administrator/:id" element={<AdminHome />} />
                    <Route path="/adminstrator/addAdmin" element={<AddAdmin />} />
                    <Route path="/adminstrator/addInstructor" element={<AddInstructor />} />
                    <Route path="/adminstrator/addCorporateTrianee" element={<AddCorporateTrainee />} />
                    <Route path=':id/refund' element={<AdminRefund />} />
                    <Route path='adminstrator/adminAcceptCourses' element={<AdminAcceptCourses />} />
                    <Route path='adminstrator/AdminAddDiscount' element={<AdminAddDiscount />} />
                    <Route path='/reports' element={<ViewReports />} />
                    <Route path='/reports/:id/followUps' element={<ReportFollowUps />} />
                    <Route path='/courses/:id/addDiscount' element={<AddDiscount />} />
                    <Route path='/:id/ViewCourse' element={<ViewCourse/>}  />
                  </Route>)
                :
                (<Route path="/" element={<Home />} />)
            }


            <Route path="*" element={<AccessDenied />} />


          </Routes>
        </div>
        <Footer />


      </BrowserRouter>

    </div>
  );
}

//npm i react-local-currency --legacy-peer-deps
//npm i babel-runtime
//npm i react-simple-star-rating
//npm install @material-ui/icons --legacy-peer-deps
//npm install reactstrap bootstrap
//npm install @syncfusion/ej2-react-inputs
//npm install --save react-overlay-component
// npm i react-collapsed --legacy-peer-deps
// npm i jspdf --save
//npm i @material-ui/core --legacy-peer-deps
//npm i @material-ui/icons --legacy-peer-deps
// npm i @coreui/react-pro

export default App;
