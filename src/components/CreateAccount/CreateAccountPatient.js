import React, { useState } from "react";
import { Paper } from "@material-ui/core";
// import { Typography } from '@material-ui/core'
import { TextField } from "@material-ui/core";
import { Box } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { Link } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";
import { Checkbox } from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import StrongPassModal from "../../StrongPassModal";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";
import "./CreateAccount.css";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  isEmpty,
  isEmail,
  isMatch,
  isMatchemail,
  isPasswordValid,
} from "../validation/Validation";
import { showErrMsg, showErrMsgEmpty } from "../notification/Notification";

const initialState = {
  email: "",
  confirm_email: "",
  password: "",
  cf_password: "",
  checked: false,
  err: "",
  errEmpty: "",
  success: "",
  showPassword: false,
  showConfirmPassword: false,
  // dob:"",
  // address:"",
  // gpAddress: "",
  // productCode: "",
  // phoneNumber: "",
  // firstName: "",
  // lastName: "",
};

export default function CreateAcc(props) {
  let navigate = useNavigate();

  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@]{12,}$/;

  const paperStyle = {
    padding: 10,
    width: 380,
    margin: "10px auto",
    background: "#F7FBFF",
  };
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  // const[email, setEmail] = useState("")
  // const [confirmEmail, setConfirmEmail] = useState("")

  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setUser({
      ...user,
      showConfirmPassword: !user.showConfirmPassword,
    });
  };

  const [user, setUser] = useState(initialState);
  const {
    email,
    confirm_email,
    password,
    cf_password,
    checked,
    err,
    errEmpty,
    success,
  } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    // console.log(password)

    e.preventDefault();
    if (isEmpty(email) || isEmpty(password) || isEmpty(confirm_email))
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email, confirm_email))
      return setUser({ ...user, err: "Invalid email address.", success: "" });

    if (!isMatchemail(email, confirm_email))
      return setUser({
        ...user,
        err: "Make sure your email address matches in both fields.",
        success: "",
      });

    if (!isPasswordValid(password, passwordValidator))
      return setUser({
        ...user,
        err: "Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({
        ...user,
        err: "Make sure your password matches in both fields.",
        success: "",
      });

    navigate("/patient/userdetails", {
      state: { email: email, password: password },
    });
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

      <div>
        <Paper elevation={0} style={paperStyle}>
          <form onSubmit={handleSubmit}>
            <h2 className="heading">Create account</h2>
            <p className="paragraph">
              Enter the email address you want to use to access your account and
              choose a password to keep your data secure.
            </p>
            <p className="paragraph">
              If you already have an account for our online prescription
              service, please use a different email address to set up this
              account.
            </p>
            <Box mt={2} mb={0}>
              <TextField
                size="large"
                error={errEmpty}
                placeholder="Email address"
                variant="outlined"
                label="Email address"
                type="text"
                id="email"
                value={email}
                name="email"
                onChange={handleChangeInput}
                style={{ marginTop: 17 }}
                fullWidth
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {isEmail(email) ? (
                        <DoneIcon style={{ color: "#52B057" }} />
                      ) : null}
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                size="large"
                error={errEmpty}
                style={{ marginTop: 17 }}
                placeholder="Confirm Email address"
                variant="outlined"
                id="confirm_email"
                value={confirm_email}
                name="confirm_email"
                type="text"
                onChange={handleChangeInput}
                fullWidth
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {isEmail(confirm_email) ? (
                        <DoneIcon style={{ color: "#52B057" }} />
                      ) : null}
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                placeholder="Password"
                label="Password"
                variant="outlined"
                style={{ marginTop: 17 }}
                fullWidth
                type={user.showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChangeInput}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {user.showPassword ? (
                          <Visibility style={{ color: "grey" }} />
                        ) : (
                          <VisibilityOff style={{ color: "grey" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Confirm Password*/}

              <TextField
                placeholder="Confirm Password"
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type={user.showPassword ? "text" : "password"}
                id="cf_password"
                name="cf_password"
                value={cf_password}
                onChange={handleChangeInput}
                style={{ marginTop: 17 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {user.showPassword ? (
                          <Visibility style={{ color: "grey" }} />
                        ) : (
                          <VisibilityOff style={{ color: "grey" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <StrongPassModal />

            <div
              style={{
                margin: 0,
                padding: 20,
                marginBottom: 17,
                display: "flex",
                alignItems: "center",
                border: "1px solid #CEDCE9",
                boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",
                borderRadius: 4,
              }}
            >
              <p
                style={{
                  margin: 0,
                  padding: 0,
                  fontFamily: "Gilroy Alt",
                  fontSize: 15,
                }}
              >
                I would like to receive health advice and offers from Well
                Healthcare Supplies by email. (Optional)
              </p>

              <Checkbox
                {...label}
                style={{ marginRight: 5, color: "grey" }}
                id="checked"
                name="checked"
              />
            </div>

            {err && showErrMsg(err)}

            <label>
              By continuing you are agreeing to our{" "}
              <a
                target="blank"
                href="https://www.well.co.uk/about-us/policies/terms-and-conditions-well-healthcare-supplies "
              >
                terms and conditions
              </a>{" "}
              and
              <a
                target="blank"
                href="https://www.well.co.uk/about-us/policies/privacy"
              >
                {" "}
                privacy policy.
              </a>
            </label>

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
              Create Account
            </Button>
            <Box mt={1} sx={{ textAlign: "center" }}>
              <Link
                component="button"
                variant="body2"
                underline="none"
                style={{ fontSize: "17px", fontFamily: "Gilroy Alt" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Already have an account?
              </Link>
            </Box>
          </form>
        </Paper>
      </div>
    </Grid>
  );
}
