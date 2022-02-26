import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { accessStart } from "../../API/userOps";

const initialState = {
  prescriberName: "",
  prescriberaddressLineOne: "",
  prescriberaddressLineTwo: "",
  prescribercity: "",
  prescriberpostcode: "",
  err: "",
  errEmpty: "",
  success: "",
};

export default function PrescriberDetails() {
  let navigate = useNavigate();
  const location = useLocation();

  const email = location.state.email;
  const password = location.state.password;
  const firstName = location.state.firstName;
  const lastName = location.state.lastName;
  const dob = location.state.dob;
  const phoneNumber = location.state.phoneNumber;
  const addressLineOne = location.state.addressLineOne;
  const addressLineTwo = location.state.addressLineTwo;
  const city = location.state.city;
  const postcode = location.state.postcode;

  const [user, setUser] = useState(initialState);
  const {
    prescriberName,
    prescriberaddressLineOne,
    prescriberaddressLineTwo,
    prescribercity,
    prescriberpostcode,
    err,
    errEmpty,
    success,
  } = user;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "" });
  };
  const handleSubmit = async (e) => {
    // console.log(location.state.email,location.state.password,location.state.phoneNumber, location.state.firstName,location.state.lastName,pharm_name,pharm_code,pharm_accno)
    e.preventDefault();

    console.log("fetching data.....");

    accessStart(
            location.state.email,
          location.state.password,
           location.state.phoneNumber,
           location.state.firstName,
          location.state.lastName,
           prescriberName,
           prescriberaddressLineOne,
          prescriberaddressLineTwo,
          // productCode = "whs",
           prescribercity,
           prescriberpostcode,     
      )
  
          navigate("/prescribersystems");
      

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Container style={{ margin: "4% auto" }} maxWidth="xs">
          <Typography variant="h5">Enter your prescriber details</Typography>

          <p fullWidth="large">
            If you can't find your GP surgery, prescriber or prescribing hub,
            enter their details below.
          </p>
          <Grid mb={2}>
            <TextField
              placeholder="Prescriber name"
              label="Prescriber name"
              fullWidth="large"
              id="prescriberName"
              name="prescriberName"
              variant="outlined"
              value={prescriberName}
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid mb={2}>
            <TextField
              placeholder="Address line 1"
              label="Address line 1"
              fullWidth="large"
              value={prescriberaddressLineOne}
              id="prescriberaddressLineOne"
              name="prescriberaddressLineOne"
              variant="outlined"
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid mb={2}>
            <TextField
              placeholder="Address line 2"
              label="Address line 2"
              fullWidth="large"
              value={prescriberaddressLineTwo}
              id="prescriberaddressLineTwo"
              name="prescriberaddressLineTwo"
              variant="outlined"
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid mb={2}>
            <TextField
              placeholder="City"
              label="City"
              fullWidth="large"
              value={prescribercity}
              id="prescribercity"
              name="prescribercity"
              variant="outlined"
              onChange={handleChangeInput}
            />
          </Grid>
          <Grid mb={1}>
            <TextField
              placeholder="Postcode"
              label="Postcode"
              fullWidth="large"
              value={prescriberpostcode}
              id="prescriberpostcode"
              name="prescriberpostcode"
              variant="outlined"
              onChange={handleChangeInput}
            />
          </Grid>
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            style={{
              textTransform: "none",
              backgroundColor: "#FFCD00",
              color: "#07283C",
              border: "black",
            }}
          >
            Next
          </Button>
        </Container>
      </form>
    </div>
  );
}







{/*  let result = fetch(
      "https://3ms0k4a2ke.execute-api.eu-west-2.amazonaws.com/dev/access/start",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Acccept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Origin":
            "https://3ms0k4a2ke.execute-api.eu-west-2.amazonaws.com/dev/access/start",
          mode: "cors",
        },
        body: JSON.stringify({
          email: location.state.email,
          password: location.state.password,
          phoneNumber: location.state.phoneNumber,
          firstName: location.state.firstName,
          lastName: location.state.lastName,
          prescriberName: prescriberName,
          prescriberaddressLineOne: prescriberaddressLineOne,
          prescriberaddressLineTwo: prescriberaddressLineTwo,
          productCode: "whs",
          prescribercity: prescribercity,
          prescriberpostcode: prescriberpostcode,
        }),
      }
    );

    result.then(function (web_response) {
      console.log(web_response);
      console.log(web_response.status);
        (web_response.json())
        .then(function (response_object) {
          console.log("got the following result");
          console.log(response_object);
        console.log("....."); */}
          