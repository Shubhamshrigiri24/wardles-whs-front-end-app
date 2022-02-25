import { Grid, Paper,Button,OutlinedInput, InputAdornment  } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import React from 'react';
import {useState} from 'react'
import Navbar from '../../Components/Navbar/Navbar';
import EmailIcon from '../../Assets/Mailicongreen.svg';
import ArrowBackIcon from '@material-ui/icons/KeyboardArrowLeft';
import { useNavigate } from 'react-router-dom'; 
import {isEmpty, isEmail} from '../../Components/validation/Validation'
import {showErrMsg} from '../../Components/notification/Notification'


const initialState = {
  email: '',
}

function ForgotPasswordEmail() {
    
    const paperStyle={padding :10, width:340, margin:"10px auto"};
    let navigate = useNavigate();

    const [user, setUser] = useState(initialState)
    const {email,err, success} = user

    const handleChangeInput = e => {
      const {name, value} = e.target
      setUser({...user, [name]:value, err: '', success: ''})
  }

  const handleSubmit = async e => {
      e.preventDefault()
      if(isEmpty(email))
              return setUser({...user, err: "Please enter your email address before continuing.", success: ''})

      if(!isEmail(email))
          return setUser({...user, err: "Invalid emails.", success: ''})

          
      navigate("/checkmail");

  }
    

    return (
      <>
      <Navbar />
            <div onClick={() => {navigate("/");}} style={{textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, padding:0,marginLeft:150}}>
            <ArrowBackIcon />
            <p>Back</p>
            </div>
      <Grid>
      <form onSubmit={handleSubmit}>
        <Paper elevation={0} style={paperStyle}>
                <h2 style={{fontSize: 25,margin:0, marginBottom:5, textAlign:"start"}}>Enter your email address</h2>
                <Typography variant="caption">Enter the email address you used to create this account.</Typography>

                <OutlinedInput
                        variant="outlined"
                        placeholder="Email address"
                        fullWidth
                        style={{marginBottom:10,marginTop:15,boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",height:45}}
                        size="small"
                        startAdornment={<InputAdornment position="start"><img src={EmailIcon} alt="error" /></InputAdornment>}
                        type="text" id="email"
                        value={email} 
                        name="email" 
                        onChange={handleChangeInput}
                    />
                 
                   
                  {err && showErrMsg(err)}

                <Button variant="contained" fullWidth size="large" disableElevation style={{background: "#3D8541",color:"white", marginTop:"17px", fontSize:"12px", textTransform: "none"}} type="submit" >Reset password</Button>
            
        </Paper>
        </form>
    </Grid>

    </>
    );
  }
  
  export default ForgotPasswordEmail;