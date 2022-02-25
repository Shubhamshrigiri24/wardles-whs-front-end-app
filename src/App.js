import './App.css';
import Signin from "./pages/Signin/Signin";
import SigninHq from "./pages/Signin/SigninHq";
import SigninSales from "./pages/Signin/Signinsales";
import Signup from "./pages/Signup/Signup";
import Yourdetails from './pages/Userdetails/Yourdetails';
import Pharmacydetails from './pages/Userdetails/Pharmacydetails';
import EMailActivate from './pages/EmailAuth/EmailActivate';
import MyProfile from './pages/MyProfile/MyProfile';
import ResetPassword from './pages/MyProfile/ResetPassword';
import ForgotPasswordEmail from './pages/ForgotPassword/ForgotPasswordEmail';
import Checkemail from "./pages/ForgotPassword/Checkemail";
import ChangePassword from "./pages/ForgotPassword/ChangePassword";
import Notfound from './pages/NotFound/Notfound';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import EditUsers from './pages/ManageUsers/EditUSer';
import Adduser from './pages/ManageUsers/Adduser';
import Resetsuccess from './pages/ForgotPassword/Resetsuccess';
// import Navbar from './Components/Navbar/Navbar';
// import SigninContainer from './Components/Routes/SigninContainer';
// import DefaultContainer from './Components/Routes/DefaultContainer';

import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";





function App() {

  return (
   
    <Router>
      {/* <Navbar/> */}
    <Routes>
    <Route exact path="/" element= {<Signin/>} />
      <Route path="/signin" element= {<Signin/>} />
      <Route path="/signinhq" element= {<SigninHq/>} />
      <Route path="/signinsales" element= {<SigninSales/>} />
      <Route path="/signup" element= {<Signup/>} />
      <Route path="/emailactivate" element= {<EMailActivate/>} />
      <Route path="/yourdetails" element= {<Yourdetails/>} />
      <Route path="/pharmacydetails" element= {<Pharmacydetails/>} />
      <Route path="/myprofile" element= {<MyProfile/>} />
      <Route path="/resetpassword" element= {<ResetPassword/>} />
      <Route path="/forgotpasswordemail" element= {<ForgotPasswordEmail/>} />
      <Route path="/checkmail" element= {<Checkemail/>} />
      <Route path="/changepassword" element= {<ChangePassword/>} />
      <Route path="/resetsuccess" element= {<Resetsuccess/>} />
      <Route path="/manageusers" element= {<ManageUsers/>} />
      <Route path="/editusers" element= {<EditUsers/>} />
      <Route path="/adduser" element= {<Adduser/>} />
      <Route path="*" element= {  <Notfound/>}></Route>
    </Routes>

    </Router>
  );
}

export default App;


