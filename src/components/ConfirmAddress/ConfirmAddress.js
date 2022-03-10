import React from "react";
import "./ConfirmAddress.css";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { accessStart } from "../../API/userOps";

function ConfirmAddress() {
  let navigate = useNavigate();

  const location = useLocation();

  const email = location.state.email;
  const password = location.state.password;
  const firstName = location.state.firstName;
  const lastName = location.state.lastName;
  const registrationNumber = location.state.registrationNumber;
  const addressLineOne = location.state.addressLineOne;
  const addressLineTwo = location.state.addressLineTwo;
  const city = location.state.city;
  const postcode = location.state.postcode;

  const handleSubmit = async (e) => {
    accessStart(
      location.state.email,
      location.state.password,
      location.state.registrationNumber,
      location.state.firstName,
      location.state.lastName,
      location.state.addressLineOne,
      location.state.addressLineTwo,
      location.state.postcode,
      location.state.city
    );
    // console.log(password)
    // console.log(user)
    navigate("/hcp/emailactivate", {
      state: {
        email: email,
      },
    });
    // console.log(user)
    e.preventDefault();
  };

  return (
    <div className="explore-section">
      <form onSubmit={handleSubmit}>
      <div onClick={() => {navigate(("/hcp/searchhomeaddress"),{state:{email:location.state.email, password:location.state.password,firstName:location.state.firstName,lastName:location.state.lastName,registrationNumber:location.state.registrationNumber, }})}} style={{cursor: "pointer",textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, paddingTop:100,marginLeft:150}}>

<ArrowBackIcon />

<p>Back</p>

</div>
        {/* <div style={{ marginTop: "2%" }}>
          <a
            href=" "
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
              margin: 0,
              padding: 0,
              marginTop: 0,
            }}
          >
            <ArrowBackIcon />
            <p>Back</p>
          </a>
        </div> */}
        <div className="inner-container">
          <div className="header-section">
            <h3>Confirm your address</h3>
          </div>

          <div className="text-section">
            <p>
              Double-check your address is correct and that it's the address
              registered with your prescriber.
            </p>
          </div>
          <Button
            className="textarea"
            style={{
              display: "block",
              textAlign: "left",
              border: "1px solid black",
              marginBottom: "2%",
              marginTop: "2%",
              padding: "20px",
              width: "70%",
            }}
          >
            <Typography
              variant="Body1"
              className="typography-heading"
              style={{ fontWeight: "bold", color: "#07283C" }}
            >
              {addressLineOne}
            </Typography>
            <br />
            <Typography
              style={{ fontSize: "13px", fontWeight: "500", color: "#07283C" }}
              className="typography"
              variant="caption"
            >
              {addressLineTwo},{city},{postcode}
            </Typography>

            <input
              style={{ marginLeft: "90%", marginTop:"-90%" }}
              type="checkbox"
              className="checkbox"
            />
          </Button>
          <Button
            onClick={() => {
              navigate("/hcp/homeaddressmanual", {
                state: {
                  email: email,
                  password: password,
                  firstName: firstName,
                  lastName: lastName,
                  registrationNumber: registrationNumber,
                },
              });
            }}
            variant="contained"
            size="large"
            disableElevation
            style={{
              marginTop: "10px",
              background: "white",
              color: "#07283C",
              fontSize: "16px",
              textTransform: "none",
              solid: "#07283C",
              borderRadius: "2px",
              fontWeight: "bold",
              border: "1px solid black",
              width: "70%",
            }}
            type="submit"
          >
            Change Address
          </Button>
          <br />
          <Button
            variant="contained"
            size="large"
            disableElevation
            fullWidth
            style={{
              marginTop: "10px",
              background: "#FFCD00",
              color: "#07283C",
              fontSize: "16px",
              textTransform: "none",
              solid: "#07283C",
              borderRadius: "2px",
              fontWeight: "bold",
              border: "0px solid ",
              width: "70%",
            }}
            type="submit"
          >
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}

export default ConfirmAddress;
