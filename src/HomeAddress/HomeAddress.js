import React from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'

export default function HomeAddress() {
  return (
    <div>
        <Container style={{ margin: "4% auto" }} maxWidth="xs">
        
            <Typography variant="h4" fullWidth="large" >
            Enter your home address
            </Typography>            
            <Grid mb={3} fullWidth="large" >
             Use the address registered with your prescriber.
            </Grid>
            <Grid mb={2}>
            <TextField s placeholder="Address line one" label="Address line one" fullWidth="large" id="outlined-basic"  variant="outlined" />
            </Grid>
            <Grid mb={2}>
            <TextField placeholder="Address line two" label="Address line two" fullWidth="large" id="outlined-basic"  variant="outlined" />
            </Grid>
            <Grid mb={2}>
            <TextField placeholder="City" label="City" fullWidth="large" id="outlined-basic"  variant="outlined" />
            </Grid>
            <Grid mb={3}>
            <TextField placeholder="Postcode" label="Postcode" fullWidth="large" id="outlined-basic"  variant="outlined" />
            </Grid>
            
            
            <Button variant="contained" color="primary" fullWidth size="large" style={{textTransform:"none ",backgroundColor:"#FFCD00",color:"#07283C",border:"black"}}>Next</Button>
        </Container>
    </div>
  )
}
