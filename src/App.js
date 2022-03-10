import React from "react";
import Navbar from "./components/NavBar/Navbar";
import Login from "./components/login/login";
import Hcplogin from "./components/login/hcplogin";
import ChooseAcc from "./components/ChooseAcc/ChooseAcc";

import CreateAccount from "./components/CreateAccount/CreateAccount";
import CreateAccountPatient from "./components/CreateAccount/CreateAccountPatient";

// import NotFound from "./NotFound/NotFound";
import UserDetails from "./components/UserDetails/UserDetails";
import HcpUserDetails from "./components/UserDetails/hcpUserDetails";

import SearchHomeAddress from "./components/SearchHomeAddress/SearchHomeAddress";
import SearchHomeAddressPatient from "./components/SearchHomeAddress/SearchHomeAddressPatient";

import HomeAddressmanual from "./components/HomeAddressManual/HomeAddressmanual";
import HomeAddressmanualPatient from "./components/HomeAddressManual/HomeAddressmanualPatient";

import ConfirmAddress from "./components/ConfirmAddress/ConfirmAddress";
import ConfirmAddressPatient from "./components/ConfirmAddress/ConfirmAddressPatient";

import SelectPrescriber from "./components/SelectPrescriber/SelectPrescriber";

import PrescriberDetails from "./components/PrescriberDetails/PrescriberDetails";

import SearchPrescriber from "./components/SearchPrescriber/SearchPrescriber";

import PrescriberSystem from "./components/PrescriberSystem/PrescriberSystem";

import Consent from "./components/Consent/Consent";

import EmailActivate from "./components/EmailActivate/EmailActivatehcp";
import EmailActivatePatient from "./components/EmailActivate/EmailActivate";

import CheckYourEmail from "./components/CheckYourEmail/CheckYourEmail";
import HcpCheckYourEmail from "./components/CheckYourEmail/hcpCheckYourEmail";
import ThankYou from "./components/ThankYou/ThankYou";
import Resetpassword from "./components/Resetpassword/Resetpassword";
import EmailResetPwd from "./components/EmailResetPwd/EmailResetPwd";
import HcpEmailResetPwd from "./components/EmailResetPwd/hcpEmailResetPwd";
import ResetpasswordSuccess from "./components/ResetpasswordSuccess/ResetpasswordSuccess";
import Signin from "./components/loginapi/loginapi";
import AddressEngland from "./components/AddressEngland/Addressengland";
import WeAreSorry from "./components/WeAreSorry/WeAreSorry";
import KeepUpdate from "./components/KeepUpdate/KeepUpdate";
import KeepUpdate2 from "./components/KeepUpdate2/KeepUpdate2";
import Dashboard from "./components/Dashboard/Dashboard";

// import HomeAddress from "./components/HomeAddress/HomeAddress";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Emailsuccess from "./components/Emailsuccess/Emailsuccess";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Common routes */}
        {/* <Route exact path="/" element={<Homepage />} /> */}
        <Route exact path="/" element={<ChooseAcc />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path ="/dashboard" element={<Dashboard/>}/>
        <Route exact path="/chooseaccount" element={<ChooseAcc />} />
        {/* <Route path="/emailresetpwd" element={<EmailResetPwd />} /> */}
        {/* <Route path="/CheckYourEmail" element={<CheckYourEmail />} /> */}
        <Route path="/Resetpassword" element={<Resetpassword />} />
        <Route
          path="/Resetpasswordsuccess"
          element={<ResetpasswordSuccess />}
        />
        <Route path="/addressengland" element={<AddressEngland />} />
        <Route path="/wearesorry" element={<WeAreSorry />} />
        <Route path="/keepupdate" element={<KeepUpdate />} />
        <Route path="/keepupdate2" element={<KeepUpdate2 />} />
        <Route path="/thankyou" element={<ThankYou />} />

        <Route path="/access/complete/:rnd/:token" element={<Signin />} />

        {/* routes for HCP-Signup  */}
        <Route path="/hcp/createaccount" element={<CreateAccount />} />
         <Route path="/hcp/hcplogin" element={<Hcplogin />} />
         <Route path="/hcp/hcpemailresetpwd" element={<HcpEmailResetPwd />} />
         <Route path="/hcp/hcpCheckYourEmail" element={<HcpCheckYourEmail />} />
        <Route path="/hcp/userdetails" element={<HcpUserDetails />} />
        <Route path="/hcp/searchhomeaddress" element={<SearchHomeAddress />} />
        <Route path="/hcp/homeaddressmanual" element={<HomeAddressmanual />} />
        <Route path="/hcp/confirmaddress" element={<ConfirmAddress />} />
        <Route path="/hcp/selectprescriber" element={<SelectPrescriber />} />
        <Route path="/hcp/searchprescriber" element={<SearchPrescriber />} />

        <Route path="/hcp/prescribersystems" element={<PrescriberSystem />} />
        <Route path="/hcp/consent" element={<Consent />} />
        <Route path="/hcp/emailactivate" element={<EmailActivate />} />
        <Route path="/hcp/thankyou" element={<ThankYou />} />
        <Route path="/hcp/emailactivate" element={<EmailActivate />} />

        {/*<Route path="/homeaddress" element= {<HomeAddress/>} /> */}

        {/* Routes for patient */}
        <Route
          path="/patient/createaccount"
          element={<CreateAccountPatient />}
        />
         <Route path="/patient/login" element={<Login />} /> 
         <Route path="/patient/emailresetpwd" element={<EmailResetPwd />} />
        <Route path="/patient/userdetails" element={<UserDetails />} />
        <Route path="/patient/CheckYourEmail" element={<CheckYourEmail />} />
        <Route
          path="/patient/searchhomeaddress"
          element={<SearchHomeAddressPatient />}
        />
        <Route
          path="/patient/homeaddressmanual"
          element={<HomeAddressmanualPatient />}
        />
        <Route
          path="/patient/confirmaddress"
          element={<ConfirmAddressPatient />}
        />
        <Route
          path="/patient/selectprescriber"
          element={<SelectPrescriber />}
        />
        <Route
          path="/patient/prescriberdetails"
          element={<PrescriberDetails />}
        />
        <Route
          path="/patient/prescribersystem"
          element={<PrescriberSystem />}
        />
        <Route path="/patient/consent" element={<Consent />} />

        <Route
          path="/patient/emailactivate"
          element={<EmailActivatePatient />}
        />
        <Route path="/patient/emailsuccess" element={<Emailsuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
