import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@material-ui/core';
import UserIcon1 from '../../Assets/UserIcon1.svg'
import UserIcon2 from '../../Assets/UserIcon2.svg'


export default function ChooseAcc() {
  return (
      <Container style={{display:"flex",justifyContent:"center",alignItems:"center",height:"70vh",width:"100vh"}}>
        <div>
        <h1 style={{textAlign:"center"}}>Which type of account would you like to create?</h1>
        <Container style={{display:"flex"}}>
        <Container maxWidth="sm">
        <Box p={2} sx={{width: "364px",height: "330px", background: "#FFFFFF",border: "1px solid #CEDCE9",boxSizing: "border-box",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",borderRadius: "4px" }} >
        <img src={UserIcon1} alt="Error"/>
        <h2>Personal</h2>
        <p>I am creating an account for myself to manage my own appliances. </p>
        <Button variant="contained" fullWidth color="primary" size="large" style={{textTransform:"none",backgroundColor:"#FFCD00",color:"#07283C",marginTop:"10%",height:"20%",borderRadius:"1px"}}>Continue</Button>
        </Box>
      </Container>
      <Container maxWidth="sm">
        <Box p={2} sx={{width: "364px",height: "330px", background: "#FFFFFF",border: "1px solid #CEDCE9",boxSizing: "border-box",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",borderRadius: "4px" }}>
        <img src={UserIcon2} alt="Error"/>
        <h2>Health care professional</h2>
        <p>I am a healthcare professional managing someone else’s appliances</p>
        <Button variant="contained" fullWidth color="primary" size="large" style={{textTransform:"none",backgroundColor:"#FFCD00",color:"#07283C",marginTop:"10%",height:"20%",borderRadius:"1px"}}>Continue</Button>
        </Box>
      </Container>
      </Container>
      </div>
    </Container>
  )
}
