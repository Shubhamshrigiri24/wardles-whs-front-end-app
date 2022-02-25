import {Link} from 'react-router-dom' ;
import './Signin.css';
import Logo from "../../Assets/Logo.svg"
import { Grid,Paper, TextField, Button, Typography } from '@material-ui/core';


function Signin() {

  const paperStyle={padding :110, margin:"10px auto",};


    return (
      <div className="container">
        <div className="singupcontainer">
          <img src={Logo} alt="error" className='image'/>
          <h2 className='header'>Wardles Free Prescription Portal</h2>
        </div>

        <div className="singincontainer">
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='center'>
                    <h2 style={{fontSize: 28, margin:0}}>Sign in</h2>
                </Grid>

                    <p style={{fontSize: 18,marginBottom:15}}>Enter your email address and password.</p>

                <TextField size="small"
                    label="Email address"
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)"}}
                    placeholder="Email address" 
                    type="email"  variant="outlined" 
                    fullWidth
                    />
                <TextField 
                    size="small"
                    label="Password"
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)"}} 
                    placeholder="Password" 
                    type="Password"
                    variant="outlined" 
                    fullWidth />

                <Button variant="contained" size="Large" disableElevation style={{background: "#404040",color:"white",  fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Sign In</Button>

                <Typography style={{marginTop:"17px",textAlign: "Center"}} >
                    <p style={{fontSize: 13,color:"black",textDecoration:"none"}} >I don’t have a password or have forgotten password?</p>
                </Typography>
               



            </Paper>
        </Grid>
        </div>
      
      </div>
      
    );
  }
  
  export default Signin;