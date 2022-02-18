import React from "react";
import Navbar from './NavBar/Navbar';
import Login from "./Login/Login";
import CreateAccount from "./CreateAccount/CreateAccount";
import NotFound from "./NotFound/NotFound";
import ChooseAcc from "./ChooseAcc";
import UserDetails from "./UserDetails/UserDetails";
import HomeAddress from "./HomeAddress/HomeAddress";
import ConfirmAddress from "./ConfirmAddress/ConfirmAddress";
import SearchHomeAddress from "./SearchHomeAddress/SearchHomeAddress";
import HomeAddressManual from "./HomeAddressManual/HomeAddressmanual";
import SelectPrescriber from "./SelectPrescriber/SelectPrescriber";
import SearchPrescriber from "./SearchPrescriber/SearchPrescriber";
import PrescriberDetails from "./PrescriberDetails/PrescriberDetails";
import PrescriberSystem from "./PrescriberSystem/PrescriberSystem";
import Consent from "./Consent/Consent";
import EmailActivate from "./EmailActivate/EmailActivate";
import CheckYourEmail from "./CheckYourEmail/CheckYourEmail";
import ThankYou from "./ThankYou/ThankYou";

import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";



function App() {
  return (
   
<Router>
  <Navbar/>
    <Routes>
      <Route exact  path="/" element= {<ChooseAcc/>} />
      <Route path="/login" element= {<Login/>} />
      <Route path="/createaccount" element= {  <CreateAccount />}/>
      <Route path="/userdetails" element= {<UserDetails/>} />
      <Route path="/searchhomeaddress" element= {<SearchHomeAddress/>} />
      <Route path="/homeaddress" element= {<HomeAddress/>} />
      <Route path="/confirmaddress" element= {<ConfirmAddress/>} />
      <Route path="/homeaddressmanual" element= {<HomeAddressManual/>} />
      <Route path="/selectprescriber" element= {<SelectPrescriber/>} />
      <Route path="/searchprescriber" element= {<SearchPrescriber/>} />
      <Route path="/prescriberdetails" element= {<PrescriberDetails/>} />
      <Route path="/prescribersystems" element= {<PrescriberSystem/>} />
      <Route path="/consent" element= {<Consent/>} />
      <Route path="/emailactivate" element= {<EmailActivate/>} />
      <Route path="/thankyou" element= {<ThankYou/>} />
      <Route path="/CheckYourEmail" element= {<CheckYourEmail/>} />
      <Route path="*" element= {  <NotFound/>}></Route>
    </Routes>

    </Router>
  );
}

export default App;
