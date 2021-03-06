import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";

import { TextField } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputAdornment } from "@mui/material";

import "./SelectPrescriber.css";
import MyPrescriber1 from "../MyPrescriber1";

import "./SelectPrescriber.css";

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function SelectPrescriber() {
  const navigate = useNavigate();

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
    navigate("/patient/prescriberdetails", {
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
    <div style={{ textTransform: "none !important", background: "E5E5E5" }}>
      <form onSubmit={handleSubmit}>
        <Container style={{ margin: "4% auto" }} maxWidth="xs">
          <Typography
            mb={1}
            variant="h5"
            style={{ color: "#07283C", fontSize: "32px" }}
          >
            Select your prescriber
          </Typography>
          <Typography mb={2} style={{ color: "#1E4B68" }}>
            This could be your GP surgery, a nurse prescriber or a prescribing
            hub, for example. We will send your orders to your prescriber to
            approve.
          </Typography>
          <Grid mb={2}>
            <TextField
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              placeholder="Search by name, town or postcode"
              fullWidth="large"
              id="outlined-basic"
              variant="outlined"
            />
          </Grid>
          <Grid className="or" mt={2}>
            Or
          </Grid>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            type="submit"
            style={{
              textTransform: "none ",
              background: "White",
              marginTop: "2%",
              marginBottom: "4%",
              color: "black",
              height: "56px",
              border: "1.5px solid #07283C",
              borderradius: "4px",
            }}
          >
            Enter your address manually
          </Button>
          <MyPrescriber1 />
        </Container>
      </form>
    </div>
  );
}
