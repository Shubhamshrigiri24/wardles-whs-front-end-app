import React, { useState } from "react";
import { Container } from "@material-ui/core";
import FormHelperText from "@mui/material/FormHelperText";
import { Box } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";
import PermContactCalendarRoundedIcon from "@mui/icons-material/PermContactCalendarRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
// import Stack from "@mui/material/Stack";
// import "date-fns";
import { useLocation } from "react-router";
import { useNavigate } from "react-router";
import RegistraionModal from "./RegistrationModal"
import { isSpace,isEmpty } from "../validation/Validation";
import { showErrMsg, showErrMsgEmpty } from "../notification/Notification";

let initialState1 = {
  registrationNumber: "",
  firstName: "",
  lastName: "",
  err: "",
  dob: "",
  success: "",
};

function HCPUserDetails() {
  const location = useLocation();

  const email = location.state.email;
  const password = location.state.password;
  console.log(email, password)

  const [user1, setUser1] = useState(initialState1);

  let navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser1({ ...user1, [name]: value, err: "" });
  };

  // const [curr_dob, new_dob] = React.useState(new Date(''));

  // const handleChangeInput = e => {
  //       const {name, value} = e.target
  //       setUser1({...user1, [name]:value, err: ''})
  //   }

  const {
    firstName,
    lastName,
    registrationNumber,
    dob,
    err,
    errEmpty,
    success,
  } = user1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(isEmpty(firstName) || isEmpty(lastName) || isEmpty(registrationNumber))
      return setUser1({...user1, err: "Please check the information above is correct",success: ''})
    if(isSpace(firstName) || isSpace(lastName) || isSpace(registrationNumber))
      return setUser1({...user1, err: "Please check the information above is correct", success: ''})
  
    navigate("/hcp/searchhomeaddress", {
      state: {
        email: email,
        password: password,
        registrationNumber: registrationNumber,
        firstName: firstName,
        lastName: lastName,
      },
    });
  };

  // let lastNameEl = useRef()

  // function clickFun(){
  //   lastNameEl.current.focus()
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 25,
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
              {/* {firstName === "" && lastName !== "" ? (
                <FormHelperText
                  style={{
                    color: "red",
                    margin: "1.68464px 0px",
                    fontWeight: "bold",
                  }}
                  id="component-error-text"
                >
                  This Field Is Required
                </FormHelperText>
              ) : (
                ""
              )} */}
              <TextField
                margin="normal"
                fullWidth
                placeholder="Last name"
                name="lastName"
                label="Last name"
                // ref={lastNameEl}
                onChange={handleChangeInput}
                // onClick={clickFun}
                type="text"
                id="lastName"
                value={lastName}
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
              {/* {lastName === "" && phoneNumber !== "" ? ( */}

              <TextField
                margin="normal"
                
                fullWidth
                placeholder="Registration number"
                id="registrationNumber"
                label="Registration number"
                type="text"
                name="registrationNumber"
                value={registrationNumber}
                autoComplete="fname"
                onChange={handleChangeInput}
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
              {/* <TextField
                margin="normal"
                required
                fullWidth
                name="phoneNumber"
                label="Phone number"
                type="text"
                id="phoneNumber"
                autoComplete="pno"
                value={phoneNumber}
                onChange={handleChangeInput}
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
              /> */}

              <RegistraionModal />
              {err && showErrMsg(err)}

              <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                style={{
                  fontFamily: "Gilroy Alt",
                  textTransform: "none",
                  backgroundColor: "#FFCD00",
                  color: "#07283C",
                  marginTop: "9px",
                  borderRadius: "2px",
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

export default HCPUserDetails;
