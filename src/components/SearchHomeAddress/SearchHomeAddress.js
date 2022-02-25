import React from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { Button } from '@mui/material'
import { TextField } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { InputAdornment } from '@mui/material'
import './SearchHomeAddress.css'
import MyPrescriber1 from '../MyPrescriber1'


export default function SearchHomeAddress() {

    return (
        <div style={{ textTransform: "none !important", background: "E5E5E5" }}>
            <Container style={{ margin: "4% auto" }} maxWidth="xs">

                <Typography mb={1} variant="h5" style={{ color: "#07283C", fontSize: "32px" , fontFamily:"Gilroy Alt" , fontWeight:"600"}} >
                    Enter your home address
                </Typography>
                <Typography mb={2} style={{ color: "#1E4B68" , fontFamily:"Gilroy Alt", fontSize:"18px"}}>
                    Use the address registered with your prescriber.
                </Typography>
                <Grid mb={2}>
                    <TextField InputProps={{ startAdornment: (<InputAdornment position="start"><SearchOutlinedIcon /></InputAdornment>) }} placeholder="Start typing your address" fullWidth="large" id="outlined-basic" variant="outlined" />
                </Grid>
                <Grid className="or" mt={2}>
                    Or
                </Grid>
                <Button variant="contained" color="primary" fullWidth size="large" style={{ textTransform: "none ", background: "White", marginTop: "2%", marginBottom: "4%", color: "black", border: "black", height: "56px", border: "1.5px solid #07283C", borderradius: "4px" }}>Enter your address manually</Button>

                <MyPrescriber1/>

            </Container>

        </div>
    )
}
