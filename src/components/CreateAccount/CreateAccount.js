import React ,{useState} from 'react'
import {  Paper } from '@material-ui/core'
// import { Typography } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Link } from '@material-ui/core'
import { Grid } from '@material-ui/core'
import LockIcon from '@mui/icons-material/Lock';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import { FormControl } from '@material-ui/core'
import { FormControlLabel } from '@material-ui/core'
import { Checkbox } from '@material-ui/core'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import DoneIcon from '@mui/icons-material/Done';
import StrongPassModal from '../../StrongPassModal'


export default function CreateAcc(props) {
  const paperStyle={padding :20,paddingTop:'3%', width:340, margin:"10px auto",background: "#F7FBFF"};
  const [values, setValues] = React.useState({
    password: '',
    showPassword: false,
  });
  const[email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  
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


  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>

          <h2>Create Account</h2>
          <p>Enter the email address you want to use to access your account and choose a password to keep your data secure.</p>
          <p>If you already have an account for our online prescription service, please use a different email address to set up this account.</p>
          <Box mt={2} mb={0}>
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

           <StrongPassModal/>
          
          <FormControl component="fieldset">
            <Box p={1.2} mt={1} mb={1} sx={{background:"#FFFFFF",border:"1px solid #CEDCE9",boxSizing:"border-box",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",borderRadius:"1px"}}>
          <FormControlLabel
          value="true"
          control={<Checkbox defaultChecked size="large" />}
          label="I would like to receive health advice and offers from Well Healthcare Supplies by email. (Optional)"
          labelPlacement="start"
          />
          </Box>
        <label>By continuing you are agreeing to our <a href="/" style={{textDecoration:"none"}}>terms and conditions</a> and<a href="/" style={{textDecoration:"none"}}> privacy policy.</a></label> 
        </FormControl>
        <Button variant="contained" color="primary" fullWidth size="large" style={{textTransform:"none",backgroundColor:"#FFCD00",color:"#07283C",marginTop:"9px",borderRadius:"2px"}} onClick={() => {
          props.history.push({pathname:'/checkyouremail'})
        }}>Create Account</Button>
        <Box mt={1} sx={{textAlign:"center"}}>
        <Link component="button"
        variant="body2"
        underline="none"
        style={{fontSize:"17px"}}>Already have an account?</Link>
       </Box>
         
      </Paper>
    </Grid>
  )
}
