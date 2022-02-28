import React from "react";
import Navbar from "./components/NavBar/Navbar";
import Login from "./components/login/login";
import CreateAccount from "./components/CreateAccount/CreateAccount";
// import NotFound from "./NotFound/NotFound";
import ChooseAcc from "./components/ChooseAcc/ChooseAcc";
import UserDetails from "./components/UserDetails/UserDetails";
import HomeAddress from "./components/HomeAddress/HomeAddress";
import ConfirmAddress from "./components/ConfirmAddress/ConfirmAddress";
import SearchHomeAddress from "./components/SearchHomeAddress/SearchHomeAddress";
import HomeAddressmanual from "./components/HomeAddressManual/HomeAddressmanual";
import SelectPrescriber from "./components/SelectPrescriber/SelectPrescriber";
import SearchPrescriber from "./components/SearchPrescriber/SearchPrescriber";
import PrescriberDetails from "./components/PrescriberDetails/PrescriberDetails";
import PrescriberSystem from "./components/PrescriberSystem/PrescriberSystem";
import Consent from "./components/Consent/Consent";

import EmailActivate from "./components/EmailActivate/EmailActivatehcp";
import EmailActivatePatient from "./components/EmailActivate/EmailActivate";

import CheckYourEmail from "./components/CheckYourEmail/CheckYourEmail";
import ThankYou from "./components/ThankYou/ThankYou";
import Resetpassword from "./components/Resetpassword/Resetpassword";
import EmailResetPwd from "./components/EmailResetPwd/EmailResetPwd";
import ResetpasswordSuccess from "./components/ResetpasswordSuccess/ResetpasswordSuccess";
import Signin from "./components/loginapi/loginapi";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/access/complete/:rnd/:token" element={<Signin />} />
        <Route exact path="/" element={<ChooseAcc />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/userdetails" element={<UserDetails />} />
        {/*<Route path="/searchhomeaddress" element= {<SearchHomeAddress/>} /> */}
        {/*<Route path="/homeaddress" element= {<HomeAddress/>} /> */}
        <Route path="/confirmaddress" element={<ConfirmAddress />} />
        <Route path="/homeaddressmanual" element={<HomeAddressmanual />} />
        <Route path="/selectprescriber" element={<SelectPrescriber />} />
        <Route path="/searchprescriber" element={<SearchPrescriber />} />
        <Route path="/prescriberdetails" element={<PrescriberDetails />} />
        <Route path="/prescribersystems" element={<PrescriberSystem />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/emailactivate" element={<EmailActivate />} />
        <Route path="/thankyou" element={<ThankYou />} />
        <Route path="/CheckYourEmail" element={<CheckYourEmail />} />
        <Route path="/Resetpassword" element={<Resetpassword />} />
        <Route path="/emailresetpwd" element={<EmailResetPwd />} />
        <Route
          path="/Resetpasswordsuccess"
          element={<ResetpasswordSuccess />}
        />
        <Route path="/access/complete/:rnd/:token" element={<Signin />} />

        {/* routes for HCP-Signup  */}
        <Route path="/hcp/createaccount" element={<CreateAccount />} />
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
        <Route path="/patient/userdetails" element={<UserDetails />} />
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
