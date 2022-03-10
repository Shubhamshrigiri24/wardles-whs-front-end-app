import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import InputAdornment from "@mui/material/InputAdornment";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignInModal from "../../SignInModal";
import { login } from "../../API/userOps";
import { Link } from "@material-ui/core";
import DoneIcon from "@mui/icons-material/Done";
import IconButton from "@mui/material/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";

import {
  isEmpty,
  isEmail,
  isMatch,
  isMatchemail,
  isPasswordValid,
} from "../validation/Validation";
import { showErrMsg, showErrMsgEmpty } from "../notification/Notification";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Hcplogin() {
  let navigate = useNavigate();
  const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z@]{12,}$/;
  const paperStyle = {
    padding: 20,
    width: 340,
    margin: "10px auto",
    background: "#F7FBFF",
  };

  const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;
  
  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };
  const handleChangeInput = (e) => {
    e.preventDefault();
    console.log("handlechange")
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // if (isEmpty(email) || isEmpty(password))
  //   //   return setUser({
  //   //     ...user,
  //   //     err: "Please fill in all fields.",
  //   //     success: "",
  //   //   });

  //   // if (!isEmail(email))
  //   //   return setUser({ ...user, err: "Invalid emails.", success: "" });

  //   navigate("*");
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(isEmpty(email) || isEmpty(password)  ) 
              return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
          return setUser({...user, err: "Invalid email address.", success: ''})

        
        // if(!isMatchemail(email))
        // return setUser({...user, err: "Make sure your email address matches in both fields.", success: ''})
        
        
        if(!isPasswordValid(password,passwordValidator))
        return setUser({...user,err:"Password must contain at least 8 characters, 1 number, 1 upper and 1 lowercase!", success:''})


        
        // if(!isMatch(password, cf_password))
        //     return setUser({...user, err: "Make sure your password matches in both fields.", success: ''})



    
    navigate("/dashboard", {
      state: { email: email },
    });

  };

  return (
    <form onSubmit={handleSubmit}>
    <Grid>
    <div onClick={() => {navigate("/hcp/createaccount");}} style={{cursor: "pointer",paddingTop:"100px",textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, marginLeft:150}}>

<ArrowBackIcon />

<p>Back</p>

</div>
      <Paper elevation={0} style={paperStyle}>
        
          <Grid align="left">
            <h2 style={{ fontSize: 28, margin: 0 }}>Sign in</h2>
          </Grid>

          <p style={{ fontSize: 18, marginBottom: 15 }}>
            Enter your email address and password.
          </p>
          
          <TextField
            size="large"
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
              endAdornment: (
                <InputAdornment position="end">
                  {isEmail(email) ? (
                    <DoneIcon style={{ color: "#52B057" }} />
                  ) : null}
                </InputAdornment>
              ),
            }}
          />
          <TextField
            size="large"
            label="Password"
            name="password"
            id="password"
            style={{
              marginBottom: "17px",
              boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",
            }}
            placeholder="Password"
            // type="password"
            type={user.showPassword ? "text" : "password"}
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
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {user.showPassword ? (
                      <Visibility style={{ color: "grey" }} />
                    ) : (
                      <VisibilityOff style={{ color: "grey" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          
          {err && showErrMsg(err)}
          
          <Typography style={{ marginBottom: "17px", textAlign: "Center" }}>
            <a
              onClick={() => {
                navigate("/hcp/hcpemailresetpwd");
              }}
              href="# "
              style={{ fontSize: 17, color: "#0066BE", textDecoration: "none" }}
            >
              Forgotten your password?
            </a>
          </Typography>
          
          {/* <Link href="https://www.well.co.uk" style={textDecoration:"none"}> */}
          <Button
          
            variant="contained"
            size="Large"
            type="submit"
            disableElevation
            style={{
              background: "#FFCD00",
              color: "#07283C",
              fontSize: "18px",
              textTransform: "none",
            }}
            fullWidth
          // onClick={() => {
          //   login(email, password);
          // }}
          >
            Sign In
          </Button>
          {/* </Link> */}

          <Typography style={{ marginTop: "17px", textAlign: "Center" }}>
            <a
              onClick={() => {
                navigate("/hcp/createaccount");
              }}
              href=" "
              style={{ fontSize: 17, color: "#0066BE", textDecoration: "none" }}
            >
              Don’t have an account yet?
            </a>
          </Typography>
        
      </Paper>
    </Grid>
    </form>
  );
}

export default Hcplogin;