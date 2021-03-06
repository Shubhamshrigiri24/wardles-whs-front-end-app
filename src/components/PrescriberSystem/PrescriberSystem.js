import React from "react";
import "./PrescriberSystem.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PrescriberSystem() {
  let navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const password = location.state.password;
  const firstName = location.state.firstName;
  const lastName = location.state.lastName;
  const phoneNumber = location.state.phoneNumber;
  const addressLineOne = location.state.addressLineOne;
  const addressLineTwo = location.state.addressLineTwo;
  const city = location.state.city;
  const postcode = location.state.postcode;
  const prescriberName = location.state.prescriberName;
  const prescriberaddresLineone= location.state.prescriberaddresLineone;
  const prescriberaddresLinetwo= location.state.prescriberaddresLinetwo;
  const prescriberCity = location.state.prescriberCity
  const prescriberpostcode = location.state.prescriberpostcode;

  const handleSubmit = async (e) => {
    e.preventDefault();
        
    navigate("/patient/consent", {
      state: { 
        addressLineOne: addressLineOne,
        addressLineTwo: addressLineTwo,
        city: city,
        postcode: postcode,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        prescriberName:prescriberName,
        prescriberCity:prescriberCity,
        prescriberaddresLineone:prescriberaddresLineone,
        prescriberaddresLinetwo:prescriberaddresLinetwo,
        prescriberpostcode:prescriberpostcode
       },
    });
    
  };
  
  return (
    <div className="prescriber-section">
      <form onSubmit={handleSubmit} >
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
              type="submit"
              className="button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
}

export default PrescriberSystem;
