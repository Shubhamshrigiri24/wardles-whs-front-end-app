import { Grid, Paper, Button } from "@material-ui/core";
import Succestick from "../../Assets/succestick.svg";
import "./ResetpasswordSuccess.css";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";

function ResetpasswordSuccess() {
  const paperStyle = {
    padding: 20,
    paddingTop: 0,
    width: 380,
    margin: "10px auto",
    background: "#F7FBFF",
  };

  return (
    <Paper elevation={0} style={paperStyle}>
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
      <Grid align="Center">
        <img src={Succestick} alt="error" />
      </Grid>
      <h2 className="heading">Thanks, we’ve reset your password</h2>
      <p className="paragraph">
        You’ll need to use your new password to access your account in future.
      </p>

      <Button
        variant="contained"
        size="Large"
        disableElevation
        style={{
          background: "#FFCD00",
          color: "#07283C",
          marginBottom: "17px",
          width: "380px",
          fontSize: "18px",
          fontFamily: "Gilroy Alt",
          textTransform: "none",
        }}
        fullWidth
        type="submit"
      >
        Done
      </Button>
    </Paper>
  );
}

export default ResetpasswordSuccess;
