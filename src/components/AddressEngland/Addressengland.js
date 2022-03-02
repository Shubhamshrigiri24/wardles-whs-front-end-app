import { Paper, Button } from "@material-ui/core";
import Arrowright2 from "../../Assets/Arrowright2.svg";
import { useNavigate } from "react-router-dom";

function Addressengland() {
  let navigate = useNavigate();

  const paperStyle = {
    padding: 20,
    paddingTop: 30,
    width: 370,
    margin: "10px auto",
    background: "#F7FBFF",
  };
  const paperStyle2 = {
    padding: 15,
    border: "1px solid #CEDCE9",
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
    boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",
  };

  return (
    <Paper elevation={0} style={paperStyle}>
      <h4 style={{ marginTop: 0 }}>
        It looks like your address <br />
        isn’t in England
      </h4>
      <p>
        Due to regulations, our online prescription services are only available
        to people registered with a prescriber in England.
      </p>

      <Paper elevation={0} style={paperStyle2}>
        <div style={{ marginRight: 10, width: 280 }}>
          <p style={{ padding: 0, margin: 0, fontWeight: "bolder" }}>
            My prescriber is based in England
          </p>
          <p style={{ padding: 0, margin: 0 }}>
            If your prescriber is in England, you might still be able to sign
            up.
          </p>
        </div>
        <div
          style={{
            width: 34,
            height: 34,
            margin: 0,
            padding: 0,
            background: "#FFCD00",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
          }}
        >
          <img src={Arrowright2} alt="error" />
        </div>
      </Paper>

      <Paper elevation={0} style={paperStyle2}>
        <div
          style={{ marginRight: 10, width: 280 }}
          onClick={() => {
            navigate("/wearesorry");
          }}
        >
          <p style={{ padding: 0, margin: 0, fontWeight: "bolder" }}>
            My prescriber is based in ("Nation")
          </p>
          <p style={{ padding: 0, margin: 0 }}>
            We can keep you updated about our other services.
          </p>
        </div>
        <div
          style={{
            width: 34,
            height: 34,
            margin: 0,
            padding: 0,
            background: "#FFCD00",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
          }}
        >
          <img src={Arrowright2} alt="error" />
        </div>
      </Paper>

      <Button
        variant="contained"
        size="Large"
        disableElevation
        style={{
          background: "#F7FBFF",
          border: "1.5px solid #07283C",
          color: "#07283C",
          marginBottom: "17px",
          fontSize: "18px",
          textTransform: "none",
        }}
        fullWidth
        type="submit"
      >
        Change my address
      </Button>
    </Paper>
  );
}

export default Addressengland;
