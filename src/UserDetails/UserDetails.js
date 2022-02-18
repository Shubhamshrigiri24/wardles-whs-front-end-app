import React from 'react'
import { Container } from '@material-ui/core'
import { Box } from '@material-ui/core'
import { TextField } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import InputAdornment from '@mui/material/InputAdornment';
import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import { useNavigate } from 'react-router-dom';

function UserDetails() {
  let navigate = useNavigate();
  const [values, setValues] = React.useState({
    "First name": '',
    "Last name":'',
    "Date of birth":'',
    "Phone number":''
  });
  function onSubmit(e){
   
  }
  return (
    <div>
        <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
            <Box component="form" noValidate sx={{ mt: 0.5 }}>
            
            <Typography variant="h5">
            Your details
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="fname"
              label="First name"
              name="fname"
              autoComplete="fname"
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermContactCalendarRoundedIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lname"
              label="Last name"
              type="text"
              id="lname"
              autoComplete="lname"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PermContactCalendarRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="dob"
              label="Date of birth"
              type="date"
              id="dob"
              autoComplete="dob"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarTodayRoundedIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pno"
              label="Phone number"
              type=""
              id="pno"
              autoComplete="pno"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocalPhoneRoundedIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 20}}
              size="large"
              onClick={() => {navigate("/searchhomeaddress");}}
              style={{backgroundColor: "#FFCD00"}}
            >
              Next
            </Button>
            </Box>
            </Box>
        </Container>
    </div>
  )
}

export default UserDetails