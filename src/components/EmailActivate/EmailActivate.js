import { Grid, Paper, Button } from "@material-ui/core";
import Message from "../../Assets/message.svg";
import Msgmail from "../../Assets/msgmail.svg";
import GetEmail from "../GetEmail";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";

function EMailActivate() {
  let navigate = useNavigate();

  const location = useLocation();
  const email = location.state.email;

  const paperStyle = {
    padding: 20,
    paddingTop: 0,
    width: 340,
    margin: "10px auto",
    background: "#F7FBFF",
  };
  const paperStyle2 = {
    padding: 15,
    border: "1px solid #CEDCE9",
    display: "flex",
    boxSizing: "border-box",
  };

  return (
    // <Grid>
    <Paper elevation={0} style={paperStyle}>
          <div onClick={() => {navigate(("/patient/consent"),{state:{email:email}})}} style={{cursor: "pointer",textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, paddingTop:100,marginLeft:150}}><ArrowBackIcon /><p>Back</p></div>  

      <Grid align="Center">
        <img src={Message} alt="error" />
      </Grid>
      <h2 style={{ marginTop: 0 }}>
        Check your email to <br /> activate your account
      </h2>

      <Paper elevation={0} style={paperStyle2}>
        <img src={Msgmail} alt="error" />
        <div style={{ marginLeft: 15 }}>
          <p style={{ padding: 0, margin: 0 }}>We’ve sent an email to </p>
          <p style={{ padding: 0, margin: 0, fontWeight: "bolder" }}>{email}</p>
        </div>
      </Paper>

      <p>
        To complete sign up and process your future orders, we need to confirm
        your email address.
      </p>
      <p>
        Please check your email and follow the link in the email we sent you.
      </p>

      <Button
        variant="contained"
        size="Large"
        disableElevation
        style={{
          background: "#F7FBFF",
          color: "#07283C",
          marginBottom: "17px",
          border: "1.5px solid #07283C",
          fontSize: "18px",
          textTransform: "none",
        }}
        fullWidth
        type="submit"
      >
        Resend email
      </Button>

      <GetEmail />
    </Paper>
    // </Grid>
  );
}

export default EMailActivate;
