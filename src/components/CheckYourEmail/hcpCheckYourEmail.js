import { Grid, Paper, Button } from "@material-ui/core";
import GetEmail from "../GetEmail";
import "./CheckYourEmail.css";
import { useNavigate } from "react-router-dom";
import Email from "@mui/icons-material/Email";
import { useLocation } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";

function HcpCheckYourEmail() {
  let navigate = useNavigate();

  const location = useLocation();

  const email = location.state.email;
  

  const paperStyle = {
    padding: 20,
    paddingTop: "3%",
    width: 380,
    margin: "10px auto",
    background: "#F7FBFF",
  };

  return (
    <Grid>
          <div onClick={() => {navigate("/hcp/hcpemailresetpwd");}} style={{cursor: "pointer",paddingTop:"100px",textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, marginLeft:150}}>

<ArrowBackIcon />

<p>Back</p>

</div>
      <Paper elevation={0} style={paperStyle}>
        <h1 className="heading">Check your email to reset your password</h1>

        <p className="paragraph" style={{ marginTop: "10px" }}>
          We've sent an email to {email} with a secure link to reset your
          password.
        </p>

        <Button
          variant="contained"
          size="Large"
          disableElevation
          style={{
            background: "#FFCD00",
            color: "#07283C",
            marginBottom: "17px",
            borderWidth: "0px",
            border: "1.5px solid ",
            fontSize: "18px",
            textTransform: "none",
          }}
          fullWidth
          onClick={() => {
            navigate("/Resetpassword");
          }}
        >
          Resend email
        </Button>

        <GetEmail />
      </Paper>
    </Grid>
  );
}

export default HcpCheckYourEmail;
