import * as React from 'react';
import { Grid, Paper,Button, IconButton, OutlinedInput,InputAdornment } from '@material-ui/core';
import Navbar from '../../Components/Navbar/Navbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Visibility, VisibilityOff, Lock} from '@material-ui/icons';



function ResetPassword() {

  const paperStyle={padding :10, width:340, margin:"auto"};

  //   functionality for password 
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //   functionality for confirm password 
  const [values2, setValues2] = React.useState({
    password2: '',
    showPassword2: false,
  });

  const handleChange2 = (prop) => (event) => {
    setValues2({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword2 = () => {
    setValues2({
      ...values2,
      showPassword2: !values2.showPassword2,
    });
  };

  const handleMouseDownPassword2 = (event) => {
    event.preventDefault();
  };

    return (
      <>
      <Navbar />
        <p to="/back" style={{textDecoration:"none", color:"black", display:"flex", alignItems:"center", margin:0, padding:0,marginLeft:150}}>
          <ArrowBackIcon />
          <p>Back</p>
        </p>

      <Grid>
        <Paper elevation={0} style={paperStyle}>
                <h2 style={{fontSize: 25,margin:0, marginBottom:25, textAlign:"center"}}>Change your password</h2>
            
                <OutlinedInput
                        variant="outlined"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        placeholder="Enter Password"
                        fullWidth
                        style={{marginBottom:15,boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",height:45}}
                        size="small"
                        startAdornment={<InputAdornment position="start"><Lock style={{color:"grey", height:23,width:18}} /></InputAdornment>}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }    
                    />

                    <OutlinedInput
                        variant="outlined"
                        type={values2.showPassword2 ? 'text' : 'password'}
                        value={values2.password2}
                        onChange={handleChange2('password')}
                        placeholder="Confirm Password"
                        fullWidth
                        style={{marginBottom:15,boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",height:45}}
                        size="small"
                        startAdornment={<InputAdornment position="start"><Lock style={{color:"grey", height:23,width:18}} /></InputAdornment>}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword2}
                            onMouseDown={handleMouseDownPassword2}
                            edge="end"
                            >
                            {values2.showPassword2 ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }    
                    />

                <p>Strong passwords are unique, at least 12 characters and contain upper and lowercase letters, numbers and symbols.</p>
                <Button variant="contained" size="large" disableElevation style={{background: "#404040",color:"white", marginTop:"17px", fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Save</Button>

        </Paper>
    </Grid>

    </>
    );
  }
  
  export default ResetPassword;