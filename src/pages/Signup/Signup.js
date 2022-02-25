import * as React from 'react';
import {useState} from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import { Grid,Paper, TextField, Button, Checkbox,InputAdornment, Typography, Modal, Box  } from '@material-ui/core';
import {isEmpty, isEmail, isLength, isMatch,isMatchemail, isChecked} from '../../Components/validation/Validation'
import {showErrMsg} from '../../Components/notification/Notification'
import { useNavigate } from 'react-router-dom'; 
import EmailIcon from '../../Assets/Mailicongreen.svg';
import Lockgreen from '../../Assets/Lockgreen.svg';
import Question from '../../Assets/questionmark.svg';
import ArrowDown from '../../Assets/Arrowdown.svg';
import ArrowUp from '../../Assets/Arrowup.svg';
import ArrowBackIcon from '@material-ui/icons/KeyboardArrowLeft';
import { Visibility , VisibilityOff } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';



const initialState = {
    email: '',
    password: '',
    cf_password: '',
    checked:false,
    err: '',
    success: '',
    showPassword: false,
    showConfirmPassword: false,
}



function Signup() {
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
   

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {position: 'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -50%)',bgcolor: '#EBF8FF',border: "1px solid #7DD4FF", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", borderRadius:3, p: 3,width:"30%"};
    const [user, setUser] = useState(initialState)
    const {email,confirm_email, password,cf_password,checked, err, success} = user

    const paperStyle={padding :10, width:390, margin:"auto"};
    const label = { inputProps: { 'aria-label': 'Checkbox demo' }, };

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        // console.log(password)

        e.preventDefault()
        // if(isEmpty(email) || isEmpty(password) || isEmpty(confirm_email)) 
        //         return setUser({...user, err: "Please fill in all fields.", success: ''})

        // if(!isEmail(email) || !isEmail(confirm_email) )
        //     return setUser({...user, err: "Invalid emails.", success: ''})

        
        if(!isMatchemail(email, confirm_email))
        return setUser({...user, err: "Make sure your email matches in both fields.", success: ''})
        
        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Make sure your password matches in both fields.", success: ''})
    
        navigate("/yourdetails");

    }

    
    return (
        <Grid>
            <Navbar />
            <div onClick={() => {navigate("/");}} style={{textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, padding:0,marginLeft:150}}>
            <ArrowBackIcon />
            <p>Back</p>
            </div>
           
        <form onSubmit={handleSubmit}>
        <Paper elevation={0} style={paperStyle}>
            <Grid align='left'>
                <h2 style={{fontSize: 25, margin:0}}>Create account</h2>
            </Grid>

                <p style={{fontSize: 15,marginBottom:15}}>Enter the email address you want to use to access your account and choose a password to keep your data secure.</p>

            <TextField size="small"
                style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)", background:"white"}}
                placeholder="Email address" 
                variant="outlined" 
                type="text" id="email"
                value={email} 
                name="email" 
                onChange={handleChangeInput}
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={EmailIcon} alt="error" />
                      </InputAdornment>
                    ),
                    
                      
                  
                  }}
                />

            <TextField size="small"
                style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)", background:"white"}}
                placeholder="Confirm email address" 
                variant="outlined" 
                type="text" id="confirm_email"
                value={confirm_email} 
                name="confirm_email" 
                onChange={handleChangeInput}
                fullWidth
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={EmailIcon} alt="error" />
                      </InputAdornment>
                    ),
                    
                  }}
                />

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

            <Button onClick={handleOpen} variant="contained" size="Large" disableElevation style={{background: "#E8F8FF",color:"#0066BE",borderRadius: '6px',marginBottom:17, fontSize:"18px", textTransform: "none", display:"flex", justifyContent:"space-between", border: "1px solid #7DD4FF"}} fullWidth>
                      <div style={{display:"flex", justifyContent:"flex-start", margin:0,padding:0}}>
                        <img src={Question} alt="error" />
                        <p style={{margin:0,padding:0, marginLeft:10, fontSize:16}}>Help setting a strong password</p>
                      </div>
                      <img src={ArrowDown} alt="error" />
            </Button>

            
            <div style={{margin:0,padding:20,marginBottom:17, display:"flex", alignItems:"center",border: "1px solid #CEDCE9",boxSizing: "border-box",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",borderRadius: 4}}>
            <p style={{margin:0, padding:0, fontSize:15}}>I would like to receive health advice and offers from Wardles by email. (You can change your marketing preferences at any time).</p>
            <Checkbox {...label} style={{padding:0, marginRight:5, color:"grey",}} 
            id="checked"
            value={checked} 
            name="checked" 
            onChange={handleChangeInput}/>
            </div>

            <p style={{margin:0,fontSize:15, marginBottom:5}}>By continuing you are agreeing to our terms and conditions and privacy policy.</p>
            

            {err && showErrMsg(err)}

            

            <Button  variant="contained" size="large" disableElevation style={{background: "#3D8541",color:"white", marginTop:"17px", fontSize:"18px", textTransform: "none", boxShadow: "0px 2px 0px #306B33, inset 0px 1px 0px #62B767"}} fullWidth type="submit" >Next</Button>

            <Typography style={{marginTop:"17px",textAlign: "Center"}} >
                    <p onClick={() => {navigate("/");}} style={{fontSize: 16,color:"#007BB8",fontWeight:600, textDecoration:"none"}} >Already have an account?</p>
            </Typography>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} align="justify">
                  
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
    );
  }
  
  export default Signup;

