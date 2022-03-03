import React from "react";
import { useLocation } from "react-router-dom";



function Dashboard() {
    const location = useLocation();

  const email = location.state.email;
  
  
  return (
    <>
      <div className="keepupdate-section">
        <div className="container">
          <div className="inner-container">
            <div className="header-section">
              <h2>Dashboard</h2>
            </div>
          <h3> You Signed in as user name : {email} </h3>
            
            
          
            <div>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
