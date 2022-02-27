import { Paper, Button, TextField } from "@material-ui/core";
import { InputAdornment } from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import "./EmailResetPwd.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";

function EmailResetPwd() {
    let navigate = useNavigate();

  const paperStyle = {
    padding: 20,
    paddingTop: "3%",
    width: 400,
    margin: "10px auto",
    background: "#F7FBFF",
  };

  return (
    <Paper elevation={0} style={paperStyle}>
      <div style={{ marginTop: "2%" }}>
        <a
          href=" /homeaddressmanual"
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
          fontFamily: "Gilroy Alt",
          marginBottom: "17px",
          fontSize: "16px",
          textTransform: "none",
        }}
        fullWidth
        onClick={() => {
          navigate("/CheckYourEmail");
        }}
      >
        Reset password
      </Button>
    </Paper>
  );
}

export default EmailResetPwd;
