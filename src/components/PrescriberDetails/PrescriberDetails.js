import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeConsumer } from "styled-components";
import {
  isPostCode,
  isEmpty,
  isSpace
} from "../../components/validation/Validation";

import {
  showErrMsg,
} from "../../components/notification/Notification";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";


const initialState = {
  prescriberName:"",
  prescriberaddresLineone:"",
  prescriberaddresLinetwo:"",
  prescriberCity:"",
  prescriberpostcode:"",
  err: "",
  success: "",
};

export default function PrescriberDetails() {
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

  const [user, setUser] = useState(initialState);

  const {
    prescriberName,prescriberCity,prescriberaddresLineone,prescriberaddresLinetwo, prescriberpostcode, err
  } = user;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        if(isEmpty(prescriberName || location.state.prescriberName) || isEmpty(prescriberCity || location.state.prescriberCity) || isEmpty(prescriberaddresLineone || location.state.prescriberaddresLineone) || isEmpty(prescriberaddresLinetwo || location.state.prescriberaddresLinetwo) || isEmpty(prescriberpostcode || location.state.prescriberpostcode)) 
              return setUser({...user, err: "Please fill in all fields.", success: ''})
        if(isSpace(prescriberName || location.state.prescriberName) || isSpace(prescriberCity || location.state.prescriberCity) || isSpace(prescriberaddresLineone || location.state.prescriberaddresLineone) || isSpace(prescriberaddresLinetwo || location.state.prescriberaddresLinetwo) || isSpace(prescriberpostcode || location.state.prescriberpostcode)) 
              return setUser({...user, err: "Please fill in all fields.", success: ''})
        if(!isPostCode(prescriberpostcode || location.state.prescriberpostcode))
              return setUser({...user, err: "We can't find your address. Please check you've entered a valid UK postcode.", success: ''})
          
    navigate("/patient/prescribersystem", {
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
        prescriberName:location.state.prescriberName?location.state.prescriberName:prescriberName,
        prescriberCity:location.state.prescriberCity?location.state.prescriberCity:prescriberCity,
        prescriberaddresLineone:location.state.prescriberaddresLineone?location.state.prescriberaddresLineone:prescriberaddresLineone,
        prescriberaddresLinetwo:location.state.prescriberaddresLinetwo?location.state.prescriberaddresLinetwo:prescriberaddresLinetwo,
        prescriberpostcode:location.state.prescriberpostcode?location.state.prescriberpostcode:prescriberpostcode
       },
    });
    
  };
  return (
    <div>
            <div onClick={() => {navigate(("/patient/selectprescriber"),{state:{email:email, password:password,firstName:firstName,lastName:lastName,phoneNumber:phoneNumber,addressLineOne:addressLineOne,addressLineTwo:addressLineTwo,city:city,postcode:postcode}})}} style={{cursor: "pointer",textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, paddingTop:100,marginLeft:150}}><ArrowBackIcon /><p>Back</p></div>  

      <form onSubmit={handleSubmit}>
      <Container style={{ margin: "4% auto" }} maxWidth="xs">
        <Typography mb={1} variant="h4" style={{ color: "#07283C" }}>
          Enter your prescriber details
        </Typography>
        <Typography mb={2} style={{ color: "#1E4B68" }}>
          If you can't find your GP surgery, prescriber or prescribing hub,
          enter their details below.
        </Typography>
        <Grid mb={2}>
          <TextField
            // value={prescriberName}
            value={location.state.prescriberName?location.state.prescriberName:prescriberName}
            name="prescriberName"
            onChange={handleChangeInput}
            type="text"
            placeholder="Prescriber name"
            label="Prescriber name"
            fullWidth="large"
            id="prescriberName"
            variant="outlined"
          />
        </Grid>
        <Grid mb={2}>
          <TextField
            // value={prescriberaddresLineone}
            value={location.state.prescriberaddresLineone?location.state.prescriberaddresLineone:prescriberaddresLineone}
            name="prescriberaddresLineone"
            type="text"
            onChange={handleChangeInput}
            placeholder="Address line 1"
            label="Address line 1"
            fullWidth="large"
            id="prescriberaddresLineone"
            variant="outlined"
          />
        </Grid>
        <Grid mb={2}>
          <TextField
            // value={prescriberaddresLinetwo}
            value={location.state.prescriberaddresLinetwo?location.state.prescriberaddresLinetwo:prescriberaddresLinetwo}
            name="prescriberaddresLinetwo"
            type="text"
            onChange={handleChangeInput}
            placeholder="Address line 2"
            label="Address line 2"
            fullWidth="large"
            id="prescriberaddresLinetwo"
            variant="outlined"
          />
        </Grid>
        <Grid mb={2}>
          <TextField
            // value={prescriberCity}
            value={location.state.prescriberCity?location.state.prescriberCity:prescriberCity}
            name="prescriberCity"
            type="text"
            placeholder="City"
            label="City"
            onChange={handleChangeInput}
            fullWidth="large"
            id="prescriberCity"
            variant="outlined"
          />
        </Grid>
        <Grid mb={1}>
          <TextField
            // value={prescriberpostcode}
            value={location.state.prescriberpostcode?location.state.prescriberpostcode:prescriberpostcode}
            name="prescriberpostcode"
            type="text"
            placeholder="Postcode"
            label="Postcode"
            onChange={handleChangeInput}
            fullWidth="large"
            id="prescriberpostcode"
            variant="outlined"
          />
        </Grid>
        <br />
        {err && showErrMsg(err)}
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
