import { Grid,Paper, TextField, Button, Typography } from '@material-ui/core';
// import Errormessage from "./Error";
import React, { useState } from 'react'
// import {Link} from 'react-router-dom' ;
import { useNavigate } from 'react-router-dom'
function Login(){ 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    // useEffect(() => {
    //     if (localStorage.getItem('user-info')) {
    //         navigate.push("/HomeAddress")
        
    //     }
    // }, [])
    async function login(){
    console.warn("data", email, password)
    let item = { email, password };
    let result = await fetch('http://localhost:3333/login',{
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
            "Accept": "application/json" 
        },
        body: JSON.stringify(item)
    });
    result = await result.json();
    localStorage.setItem('user-info', JSON.stringify(result))
    navigate.push("/contact")

    }
    const paperStyle={padding :20, width:340, margin:"10px auto", background: "#F7FBFF"};

   

    return(
        <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='left'>
                    <h2 style={{fontSize: 28, margin:0}}>Sign in</h2>
                </Grid>

                    <p style={{fontSize: 18,marginBottom:15}}>Enter your email address and password.</p>

                <TextField size="small"
                    label="Email address" onChange={(e)=>setEmail(e.target.value)}
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)"}}
                    placeholder="Email address" 
                    type="email"  variant="outlined" 
                    fullWidth
                    />
                <TextField 
                    size="small" 
                    label="Password" onChange={(e) => setPassword(e.target.value)}
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)"}} 
                    placeholder="Password" 
                    type="Password"
                    variant="outlined" 
                    fullWidth />

                

               <Typography style={{marginBottom:"17px",textAlign: "Center"}} >
                    <a href='# ' style={{fontSize: 17,color:"#0066BE",textDecoration:"none"}} >Forgotten your password?</a>
                </Typography>


                <Button variant="contained" onClick={login} size="Large" disableElevation style={{background: "#FFCD00",color:"#07283C",  fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Sign In</Button>

                {/* <Typography  style={{marginTop:"17px",textAlign: "Center"}}>
                    <a href='# ' style={{fontSize: 17,color:"#0066BE",textDecoration:"none"}}>Dont have an account yet?</a> 
                </Typography>  */}
                <Typography style={{ marginTop: "17px", textAlign: "Center" }}>
          <a
            onClick={() => {
              navigate("/patient/createaccount");
            }}
            href=" "
            style={{ fontSize: 17, color: "#0066BE", textDecoration: "none" }}
          >
            Don???t have an account yet?
          </a>
        </Typography>



            </Paper>
        </Grid>
    )
}

export default Login;