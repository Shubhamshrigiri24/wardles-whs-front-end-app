import { Grid,Paper, TextField, Button, Typography } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SignInModal from '../../SignInModal'
import { login } from "../../API/userOps";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};


function Login(){ 
    
    let navigate = useNavigate();
    

    const paperStyle={padding :20, width:340, margin:"10px auto", background: "#F7FBFF"};


    const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (isEmpty(email) || isEmpty(password))
    //   return setUser({
    //     ...user,
    //     err: "Please fill in all fields.",
    //     success: "",
    //   });

    // if (!isEmail(email))
    //   return setUser({ ...user, err: "Invalid emails.", success: "" });

    navigate("*");
    }

    return (
      <Grid>
        <Paper elevation={0} style={paperStyle}>
          <Grid align="left">
            <h2 style={{ fontSize: 28, margin: 0 }}>Sign in</h2>
          </Grid>

          <p style={{ fontSize: 18, marginBottom: 15 }}>
            Enter your email address and password.
          </p>

          <TextField
            size="small"
            label="Email address"
            style={{
              marginBottom: "17px",
              boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",
            }}
            placeholder="Email address"
            type="email"
            variant="outlined"
            fullWidth
            onChange={handleChangeInput}
            value={email}
            name="email"
            id="email"
            // data.find(email => email === email)
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            size="small"
            label="Password"
            name="password"
            id="password"
            style={{
              marginBottom: "17px",
              boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",
            }}
            placeholder="Password"
            type="password"
            value={password}
            onChange={handleChangeInput}
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />

          <Typography style={{ marginBottom: "17px", textAlign: "Center" }}>
            <a
              onClick={() => {
                navigate("/emailresetpwd");
              }}
              href="# "
              style={{ fontSize: 17, color: "#0066BE", textDecoration: "none" }}
            >
              Forgotten your password?
            </a>
          </Typography>

          <Button
            variant="contained"
            size="Large"
            disableElevation
            style={{
              background: "#FFCD00",
              color: "#07283C",
              fontSize: "18px",
              textTransform: "none",
            }}
            fullWidth
            onClick={() => {
              login(email, password);
            }}
          >
            Sign In
          </Button>
          <Typography style={{ marginTop: "17px", textAlign: "Center" }}>
          <a
            onClick={() => {
              navigate("/patient/createaccount");
            }}
            href=" "
            style={{ fontSize: 17, color: "#0066BE", textDecoration: "none" }}
          >
            Don’t have an account yet?
          </a>
        </Typography>
          
        </Paper>
      </Grid>
    );
}

export default Login;