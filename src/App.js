import React from "react";
import Login from "./Login/Login";
import CreateAccount from "./CreateAccount/CreateAccount";
import NotFound from "./NotFound/NotFound";
import ChooseAcc from "./ChooseAcc";

import {
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";


function App() {
  return (

<Router>
    <Routes>
      <Route exact  path="/" element= {<ChooseAcc/>} />
      <Route path="/login" element= {<Login/>} />
      <Route path="/createaccount" element= {  <CreateAccount />}></Route>
      <Route path="*" element= {  <NotFound/>}></Route>
    
    </Routes>
    </Router>
  );
}

export default App;
