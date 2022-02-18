import React ,{useState} from 'react'
import {  Paper } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Link } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { FormControl } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { Checkbox } from '@material-ui/core'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom'

export default function CreateAcc(props) {
  const paperStyle={padding :20,paddingTop:'3%', width:340, margin:"10px auto",background: "#F7FBFF"};
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const[name, setName] = useState("")
  const[password, setPassword] = useState("")
  const[email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const history=useNavigate();

  function signUp()
  {
    let item={name, password, email}
    console.warn("item",item)
    
    let result = await fetch("http://localhost:3333/register", {
      method: 'POST',      
      headers:{
        "Content-Type":'application/json',
        "Acccept":'application/json'
      },
      body:JSON.stringify(item),
    })
    result  = await result.json()
    localStorage.setItem("user-info", JSON.stringify(result))
    history.push("/contact")
  }
  const [values1,setValues1] = React.useState({
    confirmpassword : '',
    showConfirmPassword: false,
  })

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleConfirmChange = (prop) => (event) => {
    setValues1({ ...values1, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setValues1({
      ...values1,
      showConfirmPassword: !values1.showConfirmPassword,
    });
  };
  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>

          <Typography variant="h5" style={{fontFamily: "Gilroy Alt"}}>Create Account</Typography>
          <Typography variant="body2" style={{lineHeight:"100%",letterSpacing:"0.01em",fontSize:"14px"}}>Enter the email address you want to use to access your account and choose a password to keep your data secure.</Typography>
          <br/>
          <Typography variant="body2" style={{lineHeight:"110%",letterSpacing:"0.01em",fontSize:"14px"}}>If you already have an account for our online prescription service, please use a different email address to set up this account.</Typography>
          <Box mt={2} mb={1}>
          <TextField
              margin="normal"
              required
              fullWidth
              onChange={e => setEmail(e.target.value)}
              id="firstmail"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                   { email!== "" && email === confirmEmail ? <DoneIcon style={{ color: "green" }} /> :  null }
                  </InputAdornment>
                  
                ),
              }}
              variant="outlined"
            />
          <TextField
              margin="normal"
              required
              fullWidth
              id="confirmmail"
              label="Confirm email"
              name="confirmmail"
              autoComplete="email"
              onChange={e => setConfirmEmail(e.target.value)}
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
                
                }}
                variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="pass"
              label="Password"
              name="pass"
              autoComplete="Password"
              autoFocus
              type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>)
              }}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="passwd"
              label="Confirm Password"
              name="passwd"
              autoComplete="Password"
              autoFocus
              type={values1.showConfirmPassword ? 'text' : 'password'}
            value={values1.confirmpassword}
            onChange={handleConfirmChange('confirmpassword')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon/>
                  </InputAdornment>
                ),
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowConfirmPassword}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values1.showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>)
              }}
              variant="outlined"
            />
          </Box>
          <Button href="#contained-buttons" color="primary" size="large" fullWidth endIcon={<ArrowForwardIosIcon/>}>Help setting a strong password</Button>
          <FormControl component="fieldset">
          <FormControlLabel
          value="true"
          control={<Checkbox />}
          label="I would like to receive health advice and offers from Well Healthcare Supplies by email. (Optional)"
          labelPlacement="start"
        />
        <label>By continuing you are agreeing to our <a href="/" style={{textDecoration:"none"}}>terms and conditions</a> and<a href="/" style={{textDecoration:"none"}}> privacy policy.</a></label> 
        </FormControl>
        <Button variant="contained" color="primary" fullWidth size="large" style={{textTransform:"none !important",backgroundColor:"#FFCD00",color:"#07283C",marginTop:"9px"}} onClick={() => {
          props.history.push({pathname:'/checkyouremail'})
        }}>Create Account</Button>
      
        <Link component="button"
        variant="body2"
        style={{marginLeft:"20%",marginTop: "3%"}}
        underline="none">Already Have An Account</Link>
       
         
      </Paper>
    </Grid>
  )
}
