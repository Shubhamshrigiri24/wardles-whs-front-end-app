import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import HomeAddressModal from "../../HomeAddressModal";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";
//import Question from './Assets/Question.svg';
//import Arrowright from './Assets/Arrowright.svg';
import {
  isEmpty,
  isSpace
} from "../validation/Validation";
import { showErrMsg, showErrMsgEmpty } from "../notification/Notification";

const initialState = {
  addressLineOne: "",
  addressLineTwo: "",
  city: "",
  postcode: "",
  err: "",
  errEmpty: "",
  success: "",
};

function HomeAddressmanual() {
  let navigate = useNavigate();

  const location = useLocation();

  const email = location.state.email;
  const password = location.state.password;
  const firstName = location.state.firstName;
  const lastName = location.state.lastName;
  const registrationNumber = location.state.registrationNumber;


  const [user, setUser] = useState(initialState);
  const {
    addressLineOne,
    addressLineTwo,
    city,
    postcode,
    err,
    errEmpty,
    success,
  } = user;

  const paperStyle = {
    padding: 20,
    width: 340,
    margin: "10px auto",
    background: "#F7FBFF",
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if(isEmpty(addressLineOne) || isEmpty(addressLineTwo) || isEmpty(city) || isEmpty(postcode)) 
        return setUser({...user, err: "Please fill in all fields.", success: ''})
      if(isSpace(addressLineOne) || isSpace(addressLineTwo) || isSpace(city) || isSpace(postcode)) 
        return setUser({...user, err: "Please fill in all fields.", success: ''})

    
    navigate("/hcp/confirmaddress", {
      state: {
        addressLineOne: addressLineOne,
        addressLineTwo: addressLineTwo,
        city: city,
        postcode: postcode,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        registrationNumber: registrationNumber,
      },
    });
    // console.log(user)
    e.preventDefault();
  };

  return (
    <Grid>
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

      <Paper elevation={0} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <Grid align="left">
            <h2 style={{ fontSize: 28, margin: 0, marginBottom: 15 }}>
              Enter your work address
            </h2>
          </Grid>

          <TextField
            size="small"
            style={{
              marginBottom: "17px",
              boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",
              background: "white",
            }}
            placeholder="Address line one"
            id="addressLineOne"
            name="addressLineOne"
            value={addressLineOne}
            onChange={handleChangeInput}
            type="text"
            variant="outlined"
            fullWidth
          />

          <TextField
            size="small"
            style={{
              marginBottom: "17px",
              boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",
              background: "white",
            }}
            placeholder="Address line two"
            type="text"
            variant="outlined"
            id="addressLineTwo"
            name="addressLineTwo"
            value={addressLineTwo}
            onChange={handleChangeInput}
            fullWidth
          />

          <TextField
            size="small"
            style={{
              marginBottom: "17px",
              boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",
              background: "white",
            }}
            placeholder="City"
            id="city"
            name="city"
            value={city}
            onChange={handleChangeInput}
            type="text"
            variant="outlined"
            fullWidth
          />

          <TextField
            size="small"
            style={{
              marginBottom: "17px",
              boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",
              background: "white",
            }}
            placeholder="Postcode"
            id="postcode"
            name="postcode"
            value={postcode}
            onChange={handleChangeInput}
            type="text"
            variant="outlined"
            fullWidth
          />

{err && showErrMsg(err)}

          <Button
            variant="contained"
            size="Large"
            disableElevation
            style={{
              background: "#FFCD00",
              color: "#07283C",
              marginBottom: "17px",
              fontSize: "18px",
              textTransform: "none",
            }}
            fullWidth
            type="submit"
          >
            Next
          </Button>
        </form>

        
      </Paper>
    </Grid>
  );
}

export default HomeAddressmanual;
