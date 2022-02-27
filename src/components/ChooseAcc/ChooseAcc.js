import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import UserIcon1 from "../../Assets/UserIcon1.svg";
import UserIcon2 from "../../Assets/UserIcon2.svg";
import { useNavigate } from "react-router-dom";

export default function ChooseAcc() {
  let navigate = useNavigate();

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
        width: "100vh",
      }}
    >
      <div>
        <h1 style={{ fontFamily: "Gilroy Alt", textAlign: "center" }}>
          Which type of account would you like to create?
        </h1>
        <Container style={{ display: "flex" }}>
          <Container maxWidth="sm">
            <Box
              p={2}
              sx={{
                width: "364px",
                height: "330px",
                background: "#FFFFFF",
                border: "1px solid #CEDCE9",
                boxSizing: "border-box",
                boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",
                borderRadius: "4px",
              }}
            >
              <img src={UserIcon1} alt="Error" />
              <h2 style={{ fontFamily: "Gilroy Alt" }}>Personal</h2>
              <p style={{ fontFamily: "Gilroy Alt" }}>
                I am creating an account for myself to manage my own appliances.{" "}
              </p>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                size="large"
                style={{
                  textTransform: "none",
                  fontSize: "16px",
                  fontFamily: "Gilroy Alt",
                  backgroundColor: "#FFCD00",
                  color: "#07283C",
                  marginTop: "10%",
                  height: "20%",
                  borderRadius: "1px",
                }}
                onClick={() => {
                  navigate("/patient/createaccount");
                }}
              >
                Continue
              </Button>
            </Box>
          </Container>
          <Container maxWidth="sm">
            <Box
              p={2}
              sx={{
                width: "364px",
                height: "330px",
                background: "#FFFFFF",
                border: "1px solid #CEDCE9",
                boxSizing: "border-box",
                boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",
                borderRadius: "4px",
              }}
            >
              <img src={UserIcon2} alt="Error" />
              <h2 style={{ fontFamily: "Gilroy Alt" }}>
                Health care professional
              </h2>
              <p style={{ fontFamily: "Gilroy Alt" }}>
                I am a healthcare professional managing someone else’s
                appliances
              </p>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                size="large"
                style={{
                  textTransform: "none",
                  fontSize: "16px",
                  fontFamily: "Gilroy Alt",
                  backgroundColor: "#FFCD00",
                  color: "#07283C",
                  marginTop: "10%",
                  height: "20%",
                  borderRadius: "1px",
                }}
                onClick={() => {
                  navigate("/hcp/createaccount");
                }}
              >
                Continue
              </Button>
            </Box>
          </Container>
        </Container>
      </div>
    </Container>
  );
}
