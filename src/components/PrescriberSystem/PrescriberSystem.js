import React from 'react'
import './PrescriberSystem.css'
import { useNavigate } from "react-router-dom";

 
function PrescriberSystem() {

  let navigate = useNavigate();

  return (
    <div className="prescriber-section">
      <div className="container">
        <div className="inner-container">
          <h1 className="prescriber-heading">
            {" "}
            We will try to add your prescriber into our system
          </h1>
          <p className="prescriber-paragraph">
            You can continue to create your account and we'll try to add your
            prescriber details. We'll be in touch with an update in the next few
            days.
          </p>
          <div className="button-container">
            <button
              className="button"
              onClick={() => {
                navigate("/consent");
              }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrescriberSystem