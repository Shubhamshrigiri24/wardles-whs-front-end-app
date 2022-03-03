import React from "react";
import "./ConfirmAddress.css";
import { Button } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { isEmpty, isSpace } from "../validation/Validation";
import { showErrMsg, showErrMsgEmpty } from "../notification/Notification";

function ConfirmAddress() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(password)
    // console.log(user)
    navigate("/patient/selectprescriber", {
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
      },
    });
    // console.log(user)
  };

  return (
    <div className="explore-section">
      <form onSubmit={handleSubmit}>
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
            <h2>Confirm your address</h2>
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
            }}
          >
            <Typography variant="Body1" className="typography-heading">
              {addressLineOne}
            </Typography>
            <br />
            <Typography className="typography" variant="caption">
              {addressLineTwo},{city},{postcode}
            </Typography>

            <input
              style={{ marginLeft: "90%", marginTop:"-90%"  }}
              type="checkbox"
              className="checkbox"
            />
          </Button>
          <Button

          onClick={() => {
            navigate("/patient/homeaddressmanual", {
              state: {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                phoneNumber:phoneNumber,
              },
            });
          }}

            variant="contained"
            size="large"
            fullWidth
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

              border: "0px solid",
              borderColor: "#07283C",


              width: "70%",
            }}
            type="submit"
          >

            Change address
          </Button>

          <Button
            variant="contained"
            size="large"
            fullWidth
            disableElevation
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
