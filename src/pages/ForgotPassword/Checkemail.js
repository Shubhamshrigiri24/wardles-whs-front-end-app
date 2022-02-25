import { Grid, Paper,Button,Box,Typography,Modal } from '@material-ui/core';
import OpenMail from '../../Assets/OpenMail.svg'
import Grnmail from '../../Assets/GrnMail.svg'
import Help from '../../Assets/questionmark.svg'
import ArrowDwn from '../../Assets/Arrowdown.svg'
import { Link } from '@material-ui/core';
import * as React from 'react';
import ArrowUp from '../../Assets/Arrowup.svg';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../Components/Navbar/Navbar';
import ArrowBackIcon from '@material-ui/icons/KeyboardArrowLeft';

function Checkemail() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {position: 'absolute',top: '50%',left: '50%',border: "1px solid #7DD4FF",transform: 'translate(-50%, -50%)',bgcolor: '#EBF8FF', boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", borderRadius:3, p: 3,width:"30%"};
  
    const paperStyle={padding :10, width:340, margin:"auto"};

    return (
      <>
      <Navbar/>
            <div onClick={() => {navigate("/forgotpasswordemail");}} style={{textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, padding:0,marginLeft:150}}>
            <ArrowBackIcon />
            <p>Back</p>
            </div>
      <Grid align="center">
        <Paper elevation={0} style={paperStyle} sx={{textAlign:"center",marginBottom:"0px"}}>
                <img src={OpenMail} alt="" srcset="" className="center" />

                <h1 style={{fontSize: 25,margin:0, marginBottom:25,width:"70%"}}>Check your email to reset your password</h1>
                <Box sx={{border:"1px solid #3D8541",display:"flex",flexDirection:"row"}} p={2} >
                <img src={Grnmail} alt=''/>
                <p style={{fontSize:"12px",textAlign:"start",marginLeft:10,}}>We’ve sent an email to <Link href="#" style={{textDecoration:"none",color:"blue"}}> email@address.com </Link>with a secure link to reset your password.</p>
                </Box>
                <Button onClick={handleOpen} variant="contained" size="Large" disableElevation style={{background: "#E8F8FF",color:"#0066BE",borderRadius: '4px',border:"1px solid #0066BE", fontSize:"12px",marginTop:"15px", textTransform: "none", display:"flex", justifyContent:"space-between"}} fullWidth>
                  <div style={{display:"flex", justifyContent:"flex-start", margin:0,padding:0}}>
                  <img src={Help} width="10" height="20" alt="error" />
                  <p style={{margin:0,padding:0, marginLeft:5, fontSize:12}}>Didn’t get an email?</p>
                  </div>
                  <img src={ArrowDwn} width="10" height="20" alt="error" />
                </Button>
                <Button variant="outlined" onClick={() => {navigate("/changepassword");}} size="large" fullWidth disableElevation style={{background:"white", color:"black", marginTop:"17px", fontSize:"12px",fontWeight:"bold", textTransform: "none",border:"2px solid black"}} type="submit" >Resend email</Button>
                
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
                      <img src={Help} width="15" height="25" alt="error" />
                      <p style={{margin:0,padding:0, marginLeft:5,fontSize:"15px",color:"#007BB8",fontWeight:"bold"}}>Didn’t get an email?</p>
                      </div>
                      <img src={ArrowUp} onClose={handleClose} width="20" height="15" alt="error" />
                      </div>
                  </Typography>
                  <Typography id="modal-modal-description" style={{ marginTop: 22 , marginBottom: 0 , fontSize : "14px" , color:"#222222",lineHeight:"130%"}}>
                  Try resending the email and check your junk or spam folders. If you still can't see an email from us after a few minutes, use the help button at the top of the screen.
                  </Typography>
                </Box>
              </Modal>
        </Paper>
    </Grid>

    </>
    );
  }
  
  export default Checkemail;