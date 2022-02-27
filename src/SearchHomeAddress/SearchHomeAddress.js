import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Button } from "@mui/material";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";
import { TextField } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";

import "./SearchHomeAddress.css";

export default function SearchHomeAddress() {
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
          Enter your home address
        </Typography>
        <Typography mb={2} style={{ color: "#1E4B68" }}>
          Use the address registered with your prescriber.
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
            placeholder="Start typing your address"
            fullWidth="large"
            id="outlined-basic"
            variant="outlined"
          />
        </Grid>
        <Grid className="or" mt={2}>
          Or
        </Grid>
        <Button
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
            border: "black",
            height: "56px",
            border: "1.5px solid #07283C",
            borderradius: "4px",
          }}
          onClick={() => {
            navigate("/homeaddress");
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
