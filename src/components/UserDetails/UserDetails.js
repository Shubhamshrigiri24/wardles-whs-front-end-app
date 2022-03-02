import React, { useRef, useState } from "react";
import { Container } from "@material-ui/core";
import FormHelperText from "@mui/material/FormHelperText";
import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";
import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { isSpace, isEmpty, isPhone } from "../validation/Validation";

import { showErrMsg, showErrMsgEmpty } from "../notification/Notification";

let initialState1 = {
  phoneNumber: "",
  firstName: "",
  lastName: "",
  err: "",
  dob: "",
  success: "",
  err1: "",
};

function UserDetails() {
  const location = useLocation();

  const email = location.state.email;
  const password = location.state.password;

  const [value, setValue] = React.useState(new Date());

  const [user1, setUser1] = useState(initialState1);

  let navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser1({ ...user1, [name]: value, err: "" });
  };


  const {
    firstName,
    lastName,
    phoneNumber,
    dob,
    err,
    err1,
    errEmpty,
    success,
  } = user1;


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (
      isEmpty(firstName) ||
      isEmpty(lastName) ||
      isEmpty(phoneNumber)
      // isEmpty(dob)
    ) {
      return setUser1({
        ...user1,
        err: "This field is required",
        err1: "Please check the information above is correct",
        success: "",
      });
    }
    if (!isPhone(phoneNumber)) {
      return setUser1({
        ...user1,
        err: "Please provide a valid phone number",
        err1: "Please check the information above is correct ",
        success: "",
      });
    }
    if (isSpace(phoneNumber) || isSpace(firstName) || isSpace(lastName)) {
      return setUser1({
        ...user1,
        err1: "Please check the information above is correct",
        success: "",
      });
    }


    navigate("/patient/searchhomeaddress", {
      state: {
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        firstName: firstName,
        lastName: lastName,
      },
    });
  };

  return (
    <div>
      <div style={{ marginTop: "2%" }}>
        <a
          href=" "
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            margin: 0,
            padding: 0,
            marginLeft: 150,
            marginTop: 0,
          }}
        >
          <ArrowBackIcon />
          <p>Back</p>
        </a>
      </div>

      <form onSubmit={handleSubmit}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 15,
              marginBottom: "15%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box sx={{ mt: 0.5 }}>
              <h1 className="heading">Your details</h1>

              <TextField
                margin="normal"
                fullWidth
                placeholder="First name"
                id="firstName"
                label="First name"
                type="text"
                name="firstName"
                value={firstName}
                autoComplete="fname"
                onChange={handleChangeInput}
                error={isEmpty(firstName) && err}
                style={{ marginBottom: "23px" }}
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermContactCalendarRoundedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              {isEmpty(firstName) && showErrMsgEmpty(err)}

              <TextField
                margin="normal"
                fullWidth
                style={{ marginBottom: "23px" }}
                placeholder="Last name"
                name="lastName"
                label="Last name"
                onChange={handleChangeInput}
                type="text"
                id="lastName"
                value={lastName}
                error={isEmpty(lastName) && err}
                autoComplete="lname"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermContactCalendarRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />


              {isEmpty(lastName) && showErrMsgEmpty(err)}

              <div style={{ marginBottom: "23px" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    fullWidth
                    variant="inline"
                    inputVariant="outlined"
                    label="Date of birth DD/MM/YYYY"
                    format="dd/MM/yyyy"
                    value={value}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={(date) => setValue(date)}
                  />
                </MuiPickersUtilsProvider>
              </div>

              {lastName === "" && phoneNumber !== "" ? (
                <FormHelperText
                  style={{ color: "red" }}
                  id="component-error-text"
                >
                  This Field Is Required
                </FormHelperText>
              ) : (
                ""
              )}


           
              <TextField
                margin="normal"
                fullWidth
                name="phoneNumber"
                label="Phone number"
                type="text"
                id="phoneNumber"
                autoComplete="pno"
                value={phoneNumber}
                style={{ marginBottom: "23px" }}
                onChange={handleChangeInput}
                error={
                  (isEmpty(phoneNumber) && err) ||
                  (!isPhone(phoneNumber) && err)
                }
                InputProps={{
                  inputMode: "numeric",
                  pattern: "[0-9]",
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalPhoneRoundedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
              {(isEmpty(phoneNumber) && showErrMsgEmpty(err)) ||
                (!isPhone(phoneNumber) && showErrMsgEmpty(err))}

              {err1 && showErrMsg(err1)}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                style={{
                  textTransform: "none",
                  backgroundColor: "#FFCD00",
                  color: "#07283C",
                  marginTop: "9px",
                  borderRadius: "2px",
                  marginBottom: "5%",
                  fontWeight: "500",
                  fontFamily: "Arial",
                }}
                type="submit"
              >
                Next
              </Button>
            </Box>
          </Box>
        </Container>
      </form>
    </div>
  );
}

export default UserDetails;
