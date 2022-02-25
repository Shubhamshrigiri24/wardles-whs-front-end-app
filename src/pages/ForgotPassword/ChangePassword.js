import * as React from 'react';
import {useState} from 'react';
import { Grid,Box,Modal, Paper,TextField, Typography,Button,InputAdornment } from '@material-ui/core';
import Success from "../../Assets/Success.svg"
import { useNavigate } from 'react-router-dom'; 
import cautionicon from '../../Assets/Caution.svg'
import Question from '../../Assets/questionmark.svg';
import ArrowDown from '../../Assets/Arrowdown.svg';
import ArrowUp from '../../Assets/Arrowup.svg'
import Navbar from '../../Components/Navbar/Navbar';
import ArrowBackIcon from '@material-ui/icons/KeyboardArrowLeft';
import {isEmpty, isLength, isMatch} from '../../Components/validation/Validation'
import {showErrMsg} from '../../Components/notification/Notification';
import Lockgreen from '../../Assets/Lockgreen.svg';
import { Visibility , VisibilityOff } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const initialState = {
  password: '',
  cf_password: '',
  err: '',
  success: '',
  showPassword: false,
  showConfirmPassword: false,
}

function ChangePassword() {
  let navigate = useNavigate();

  const handleClickShowPassword = () => {
    setUser({
      ...user,
      showPassword: !user.showPassword,
    });
  };
  const handleClickShowConfirmPassword = () => {
    setUser({
      ...user,
      showConfirmPassword: !user.showConfirmPassword,
    });
  };

  const onChangePassword = e => {
    console.log(e);
    handleChangeInput();
  }

  const paperStyle={padding :10, width:340, margin:"13px auto"};
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [user, setUser] = useState(initialState)
  const {password,cf_password, err, success} = user

  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
}

const handleSubmit = async e => {
    e.preventDefault()
    // if(isEmpty(password) || isEmpty(cf_password)) 
    //         return setUser({...user, err: "Please fill in all fields.", success: ''})

    if(isLength(password))
        return setUser({...user, err: "Password must be at least 6 characters.", success: ''})

    
    if(!isMatch(password, cf_password))
        return setUser({...user, err: "Make sure your password matches in both fields.", success: ''})
        
    navigate("/resetsuccess");

}


  const style = {position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',width: 450,bgcolor: 'background.paper', boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", borderRadius:3, p: 3,};

    return (
      <>
      <Navbar />
            <div onClick={() => {navigate("/checkmail");}} style={{textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, padding:0,marginLeft:150}}>
            <ArrowBackIcon />
            <p>Back</p>
            </div>

      <Grid>
      <form onSubmit={handleSubmit}>
        <Paper elevation={0} style={paperStyle} sx={{textAlign:"center"}}>

                <Grid align="center">
                <img src={cautionicon} alt="" srcset=""  />
                </Grid>

                <h2 style={{fontSize: 25,margin:0, marginBottom:25,marginTop:20, textAlign:"center"}}>Reset password</h2>
                <p style={{fontSize: 13,}}>Choose a password to keep your data secure. You’ll need this password your email address to access your account in future.</p>

                <TextField size="small"
                style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)", background:"white"}}
                placeholder="Password" 
                variant="outlined" 
                fullWidth
                type={user.showPassword ? 'text' : 'password'}
                id="password"
                value={password} name="password" onChange={handleChangeInput}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Lockgreen} alt="error" />
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
                          {user.showPassword ? <Visibility style={{color: "#A8D7AB"}}/> : <VisibilityOff style={{color: "#A8D7AB"}}/>}
                        </IconButton>
                      </InputAdornment>)
                  }}
                />
                 
            <TextField size="small"
                style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)", background:"white"}}
                placeholder="Confirm Password" 
                type={user.showConfirmPassword ? 'text' : 'password'}
                variant="outlined" 
                fullWidth
                id="cf_password"
                value={cf_password} name="cf_password" onChange={handleChangeInput}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={Lockgreen} alt="error" />
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
                          {user.showConfirmPassword ? <Visibility style={{color: "#A8D7AB"}}/> : <VisibilityOff style={{color: "#A8D7AB"}}/>}
                        </IconButton>
                      </InputAdornment>)
                  }}
                />

              {err && showErrMsg(err)}
              
                    
                  <Button onClick={handleOpen} variant="contained" size="Large" disableElevation style={{background: "#E8F8FF",marginTop:17, color:"#0066BE",borderRadius: '6px',marginBottom:17, fontSize:"18px", textTransform: "none", display:"flex", justifyContent:"space-between", border: "1px solid #7DD4FF"}} fullWidth>
                      <div style={{display:"flex", justifyContent:"flex-start", margin:0,padding:0}}>
                        <img src={Question} alt="error" />
                        <p style={{margin:0,padding:0, marginLeft:10, fontSize:16}}>Help setting a strong password</p>
                      </div>
                      <img src={ArrowDown} alt="error" />
                  </Button>

              <Grid align="center">

                <Button  variant="contained" fullWidth size="large" disableElevation style={{background: "#3D8541",color:"white", marginTop:"17px", fontSize:"12px", textTransform: "none"}} type="submit" >Reset Password</Button>
                
              </Grid>

              {/* Modal */}

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} align="justify" style={{background: '#EBF8FF',border: "1px solid #7DD4FF"}}>
                  
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                      <div style={{display:"flex",justifyContent:"space-between"}}>
                      <div style={{display:"flex", justifyContent:"flex-start", margin:0,padding:0}}>
                      <img src={Question} width="15" height="25" alt="error" />
                      <p style={{margin:0,padding:0, marginLeft:5,fontSize:"15px",color:"#007BB8",fontWeight:"bold"}}>Help setting a strong password</p>
                      </div>
                      <img src={ArrowUp} width="20" height="15" alt="error" />
                      </div>
                  </Typography>
                  <Typography id="modal-modal-description" style={{ marginTop: 22 , marginBottom: 22 , fontSize : "14px" , color:"#222222",lineHeight:"130%"}}>
                  Strong passwords are unique, at least 12 characters long and contain upper and lowercase letters, numbers and symbols. 
                  </Typography>
                  <Typography id="modal-modal-description" style={{ marginBottom: 22, fontSize : "14px", lineHeight:"130%" , color:"#222222"}}>
                  Try swapping letters for numarginBottomers or symbols to make your password harder to guess. For example, instead of S try using $.
                  </Typography>
                  <Typography id="modal-modal-description" style={{ marginBottom:22, fontSize : "14px", lineHeight:"130%" , color:"#222222"}}>
                  You could also try using the first letter of each word from your favourite song lyric to create a word that won't be obvious to other people. 
                  </Typography>
                  <Typography id="modal-modal-description" style={{ fontSize : "14px" , lineHeight:"130%" , color:"#222222"}}>
                  Avoid using personal details other people might know or common words like 'password'.                 
                  </Typography>


                </Box>
              </Modal>
                </Paper>
                </form>
            </Grid>

    </>
    );
  }
  
  export default ChangePassword;



