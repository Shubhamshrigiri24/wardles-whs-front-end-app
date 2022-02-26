import * as React from 'react';
import { Paper,Button, IconButton, OutlinedInput,InputAdornment } from '@material-ui/core';
import {Lock} from '@material-ui/icons';
import StrongPassModal from '../../StrongPassModal';
// import Lock from '../../Assets/Lock.svg';
import './Resetpassword.css'

function ResetpasswordSuccess() {

  const paperStyle={padding :20,marginTop: "5%", width:380, margin:"10px auto",background: "#F7FBFF"};

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

            <Paper elevation={0} style={paperStyle}>
            
                <h1 className='heading'>Reset password</h1>
                <p className='paragraph'>Choose a password to keep your data secure. You’ll need this password and your email address to access your account in future.</p>

                    <OutlinedInput
                        variant="outlined"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        placeholder="New Password"
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
                            
                            </IconButton>
                        </InputAdornment>
                        }    
                    />
                
                <StrongPassModal/>

                <Button variant="contained" size="Large" disableElevation style={{background: "#FFCD00",color:"#07283C", marginTop:"17px", fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Resend email</Button>

            </Paper> 

    
  );
}

export default ResetpasswordSuccess;
