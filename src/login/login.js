import { Grid,Paper, TextField, Button, Typography } from '@material-ui/core';
// import Errormessage from "./Error";
// import {Link} from 'react-router-dom' ;
import DoneIcon from '@mui/icons-material/Done';
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';

function Login(){ 
    const [data, setData] = useState([])
    const [email, setEmail] = useState("")
    

    const paperStyle={padding :20, width:340, margin:"10px auto", background: "#F7FBFF"};


    return(
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='left'>
                    <h2 style={{fontSize: 28, margin:0}}>Sign in</h2>
                </Grid>

                    <p style={{fontSize: 18,marginBottom:15}}>Enter your email address and password.</p>

                <TextField size="small"
                    label="Email address"
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)"}}
                    placeholder="Email address" 
                    type="email"  variant="outlined" 
                    fullWidth
                    onChange={e => setEmail(e.target.value)}
                    // data.find(email => email === email)
                    InputProps={{
                        startAdornment: (
                          <InputAdornment position="end">
                           {  true ? <DoneIcon style={{ color: "green" }} /> :  null }
                          </InputAdornment>
                        ),
                      }}
                    />
                <TextField 
                    size="small"
                    label="Password"
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)"}} 
                    placeholder="Password" 
                    type="Password"
                    variant="outlined" 
                    fullWidth />

                

               <Typography style={{marginBottom:"17px",textAlign: "Center"}} >
                    <a href='# ' style={{fontSize: 17,color:"#0066BE",textDecoration:"none"}} >Forgotten your password?</a>
                </Typography>


                <Button variant="contained" size="Large" disableElevation style={{background: "#FFCD00",color:"#07283C",  fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Sign In</Button>

                <Typography style={{marginTop:"17px",textAlign: "Center"}}>
                    <a href='# ' style={{fontSize: 17,color:"#0066BE",textDecoration:"none"}}>Don't have an account yet?</a> 
                </Typography> 




            </Paper>
        </Grid>
    )
}

export default Login;