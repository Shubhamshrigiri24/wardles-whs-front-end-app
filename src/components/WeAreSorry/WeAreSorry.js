import React from "react";
import { Container } from "@mui/material";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function WeAreSorry() {
  let navigate = useNavigate();
  return (
    <div>
      <Container style={{ margin: "4% auto" }} maxWidth="xs">
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h6"
          style={{ fontWeight: "600" }}
        >
          We're sorry, we are unable to provide this service in your area at the
          moment
        </Typography>

        <p style={{ color: "#1E4B68",  }}>
          Unfortunately, due to regulations we don't offer our services in your
          area at the moment.
        </p>
        <p>
          You can choose how we manage your personal data on the next page and
          if you'd still like to see offers and updates from us.
        </p>

        <Button
          onClick={() => {
            navigate("/keepupdate");
          }}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          style={{
            textTransform: "none ",
            backgroundColor: "#FFCD00",
            color: "#07283C",
          }}
        >
          Next
        </Button>
      </Container>
    </div>
  );
}
