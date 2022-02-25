import {BrowserRouter,Routes, Route} from 'react-router-dom' ;
import Signup from "../../pages/Signup/Signup";
import Userregform from "../../pages/Userregform/Userregform";
import EMailActivate from '../../pages/EmailAuth/EmailActivate';
import MyProfile from '../../pages/MyProfile/MyProfile';
import ResetPassword from '../../pages/MyProfile/ResetPassword';
import ForgotPasswordEmail from '../../pages/ForgotPassword/ForgotPasswordEmail';
import Checkemail from "../../pages/ForgotPassword/Checkemail";
import ChangePassword from "../../pages/ForgotPassword/ChangePassword";
import Navbar from '../Navbar/Navbar';

function DefaultContainer (){

return (
    <>
          <Navbar/>
        <Route path="/Signup" element={<Signup/>} />
        <Route path="/Userregform" element={<Userregform/>} />
        <Route path="/EmailActivate" element={<EMailActivate/>} />
        <Route path="/MyProfile" element={<MyProfile/>} />
        <Route path="/ResetPassword" element={<ResetPassword/>} />
        <Route path="/ForgotPasswordEmail" element={<ForgotPasswordEmail/>} />
        <Route path="/Checkemail" element={<Checkemail/>} />
        <Route path="/ChangePassword" element={<ChangePassword/>} />

</>
 )
}

export default DefaultContainer