import React from "react";
import Navbar from './components/NavBar/Navbar';
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
import EmailActivate from "./components/EmailActivate/EmailActivate";
import CheckYourEmail from "./components/CheckYourEmail/CheckYourEmail";
import ThankYou from "./components/ThankYou/ThankYou";



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
<Route exact path="/" element= {<ChooseAcc/>} />
<Route path="/login" element= {<Login/>} />
<Route path="/createaccount" element= { <CreateAccount />}/>
<Route path="/userdetails" element= {<UserDetails/>} />
{/*<Route path="/searchhomeaddress" element= {<SearchHomeAddress/>} /> */}
{/*<Route path="/homeaddress" element= {<HomeAddress/>} /> */}
<Route path="/confirmaddress" element= {<ConfirmAddress/>} />
<Route path="/homeaddressmanual" element= {<HomeAddressmanual/>} />
<Route path="/selectprescriber" element= {<SelectPrescriber/>} />
<Route path="/searchprescriber" element= {<SearchPrescriber/>} />
<Route path="/prescriberdetails" element= {<PrescriberDetails/>} />
<Route path="/prescribersystems" element= {<PrescriberSystem/>} />
<Route path="/consent" element= {<Consent/>} />
<Route path="/emailactivate" element= {<EmailActivate/>} />
<Route path="/thankyou" element= {<ThankYou/>} />
<Route path="/CheckYourEmail" element= {<CheckYourEmail/>} />

</Routes>



</Router>
);
}



export default App;