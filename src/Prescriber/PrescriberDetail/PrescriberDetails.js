import React from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import { TextField } from '@mui/material'

import { ThemeConsumer } from 'styled-components'

export default function PrescriberDetails() {
  return (
    <div>
        <Container style={{ margin: "4% auto" }} maxWidth="xs">
        
            <Typography variant="h5"  >
            Enter your prescriber details
            </Typography>            

            <p fullWidth="large">If you can't find your GP surgery, prescriber or prescribing hub, enter their details below.</p>
            <Grid mb={2}>
            <TextField s placeholder="Prescriber name" label="Prescriber name" fullWidth="large" id="outlined-basic"  variant="outlined" />
            

            </Grid>
            <Grid mb={2}>
            <TextField placeholder="Address line 1" label="Address line 1" fullWidth="large" id="outlined-basic"  variant="outlined" />
            </Grid>
            <Grid mb={2}>
            <TextField placeholder="Address line 2" label="Address line 2" fullWidth="large" id="outlined-basic"  variant="outlined" />
            </Grid>
            <Grid mb={2}>
            <TextField placeholder="City" label="City" fullWidth="large" id="outlined-basic"  variant="outlined" />
            </Grid>
            <Grid mb={1}>
            <TextField placeholder="Postcode" label="Postcode" fullWidth="large" id="outlined-basic"  variant="outlined" />
            </Grid>
            <br/>
            <Button  variant="contained" color="primary" fullWidth size="large" style={{textTransform:"none",backgroundColor:"#FFCD00",color:"#07283C",border:"black"}}>Next</Button>
        </Container>
    </div>
  )
}
