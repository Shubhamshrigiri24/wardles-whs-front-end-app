import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";
import { TextField } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./SelectPrescriber.css";

export default function SelectPrescriber() {
  let navigate = useNavigate();
  return (
    <div style={{ textTransform: "none !important", background: "E5E5E5" }}>
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
      <Container style={{ margin: "4% auto" }} maxWidth="xs">
        <Typography
          mb={1}
          variant="h5"
          style={{ color: "#07283C", fontSize: "32px" }}
        >
          Select your prescriber
        </Typography>
        <Typography mb={2} style={{ color: "#1E4B68" }}>
          This could be your GP surgery, a nurse prescriber or a prescribing
          hub, for example. We will send your orders to your prescriber to
          approve.
        </Typography>
        <Grid mb={2}>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchOutlinedIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Search by name, town or postcode"
            fullWidth="large"
            id="outlined-basic"
            variant="outlined"
          />
        </Grid>
        <Grid className="or" mt={2}>
          Or
        </Grid>
        <Button
          onClick={() => {
            navigate("/patient/prescriberdetailsmanually");
          }}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{
            textTransform: "none ",
            background: "White",
            marginTop: "2%",
            marginBottom: "4%",
            color: "black",
            height: "56px",
            border: "1.5px solid #07283C",
            borderradius: "4px",
          }}
        >
          Enter your address manually
        </Button>

        <Button
          variant="outlined"
          href="#contained-buttons"
          color="primary"
          size="large"
          style={{
            textTransform: "none",
            border: "none",
            background: "#E8F8FF",
            borderradius: "6px",
            color: "#0066BE",
            fontsize: "16px",
          }}
          fullWidth
          endIcon={<ArrowForwardIosIcon />}
        >
          Who is my prescriber?
        </Button>
      </Container>
    </div>
  );
}
