// import React from "react";

// import {
//   Route,
//   BrowserRouter as Router,
//   Routes,
//   Navigate,
// } from "react-router-dom";

// import Login from "./Login/Login";
// import Register from "./CreateAccount/CreateAccount";

// import NotFound from "./NotFound/NotFound";
// import UserDetails from "./UserDetails/UserDetails";
// import ChooseAccount from "./ChooseAcc";

// // const authGuard = (Component) => () => {
// //   return localStorage.getItem("token") ? (
// //     <Component />
// //   ) : (
// //     <Navigate to="/login" />
// //   );
// // };
// const Routing = (props) => (
// <Router>
//     <Routes>
//     <Route path="/chooseaccount">
//         <ChooseAccount />
//       </Route>
//       <Route path="/login">
//         <Login />
//       </Route>
//       <Route path="/register">
//         <Register />
//       </Route>
//       <Route path="/userdetails">
//         <UserDetails />
//       </Route>
//       <Route exact path="/" element={<ChooseAccount/>}/> 
//       <Route path="*">
//         <NotFound />
//       </Route>
//     </Routes>
//     </Router>
// );

// export default Routing;
