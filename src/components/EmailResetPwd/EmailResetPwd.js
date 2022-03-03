import { Paper, Button, TextField } from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import "./EmailResetPwd.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const initialState = {
  email: "",
};

function EmailResetPwd() {
  let navigate = useNavigate();

  const location = useLocation();

  const [user, setUser] = useState(initialState);

  const { email } = user;

  console.log(email);

  const paperStyle = {
    padding: 20,
    paddingTop: "3%",
    width: 400,
    margin: "10px auto",
    background: "#F7FBFF",
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    navigate("*");
  };

  return (
    <Paper elevation={0} style={paperStyle}>
      <h2 className="heading">Enter your email address</h2>
      <p className="paragraph">
        Enter the email address you used to create your account.
      </p>
      <TextField
        className="input-box"
        margin="normal"
        required
        fullWidth
        id="firstmail"
        label="E-mail"
        name="email"
        autoComplete="email"
        autoFocus
        onChange={handleChangeInput}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        variant="outlined"
      />
      <Button
        variant="contained"
        size="large"
        disableElevation
        style={{
          background: "#FFCD00",
          color: "#07283C",
          marginBottom: "17px",
          fontSize: "16px",
          textTransform: "none",
        }}
        fullWidth
        onClick={() => {
          navigate("/CheckYourEmail", {
            state: { email: email },
          });
        }}
      >
        Reset password
      </Button>
    </Paper>
  );
}

export default EmailResetPwd;
