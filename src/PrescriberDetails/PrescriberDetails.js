import React from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { ThemeConsumer } from 'styled-components'

export default function PrescriberDetails() {
  let navigate = useNavigate();
  return (
    <div>
      <Container style={{ margin: "4% auto" }} maxWidth="xs">

        <Typography mb={1}  variant="h4" style={{ color: "#07283C" }} >
          Enter your prescriber details
        </Typography >
        <Typography mb={2} style={{ color: "#1E4B68" }}>
          If you can't find your GP surgery, prescriber or prescribing hub, enter their details below.
        </Typography>
        <Grid mb={2}>
          <TextField s placeholder="Prescriber name" label="Prescriber name" fullWidth="large" id="outlined-basic" variant="outlined" />


        </Grid>
        <Grid mb={2}>
          <TextField placeholder="Address line 1" label="Address line 1" fullWidth="large" id="outlined-basic" variant="outlined" />
        </Grid>
        <Grid mb={2}>
          <TextField placeholder="Address line 2" label="Address line 2" fullWidth="large" id="outlined-basic" variant="outlined" />
        </Grid>
        <Grid mb={2}>
          <TextField placeholder="City" label="City" fullWidth="large" id="outlined-basic" variant="outlined" />
        </Grid>
        <Grid mb={1}>
          <TextField placeholder="Postcode" label="Postcode" fullWidth="large" id="outlined-basic" variant="outlined" />
        </Grid>
        <br />
        <Button onClick={() => {navigate("/prescribersystems");}}variant="contained" color="primary" fullWidth size="large" style={{ textTransform: "none", backgroundColor: "#FFCD00", color: "#07283C", border: "black" }}>Next</Button>
      </Container>
    </div>
  )
}
