import * as React from 'react';
import { Grid,Paper, Button, Box, Modal,Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Grnmail from '../../Assets/GrnMail.svg';
import OpenMail from '../../Assets/OpenMail.svg';
import ArrowBackIcon from '@material-ui/icons/KeyboardArrowLeft';
import Question from '../../Assets/questionmark.svg';
import ArrowDown from '../../Assets/Arrowdown.svg';
import ArrowUp from '../../Assets/Arrowup.svg';



function EMailActivate() {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {position: 'absolute',top: '50%',left: '50%',border: "1px solid #7DD4FF",transform: 'translate(-50%, -50%)',bgcolor: '#EBF8FF', boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", borderRadius:3, p: 3,width:"30%"};

  const paperStyle={padding :10,paddingTop:10, width:340, margin:"auto"};
  const paperStyle2={padding:15, border: "1px solid #CEDCE9", display:"flex",boxSizing:"border-box",border: "1px solid #52B057",boxSizing: "border-box",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)", borderRadius: 4}

  
  return (
    <Grid>
      <Navbar />
            <div onClick={() => {navigate("/pharmacydetails");}} style={{textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, padding:0,marginLeft:150}}>
            <ArrowBackIcon />
            <p>Back</p>
            </div>
      
            <Paper elevation={0} style={paperStyle}>
                <Grid align='Center'>
                <img src={OpenMail} alt="error"/>
                <h2 style={{marginTop:0}}>Check your email to <br/>activate your account</h2>
                </Grid>
              
        
            <Paper elevation={0} style={paperStyle2} >
              <img src={Grnmail} alt="error" />
              <div style={{marginLeft:15}}>
                <p style={{padding:0, margin:0,fontWeight:"bolder"}}>We’ve sent an email to </p>
                <p style={{padding:0, margin:0,color:"#007BB8"}}>eexample.example@yahoo.com</p>
              </div>
            </Paper>
            
    

                <p style={{color:"#5E5E5E"}}>To complete sign up and activate your account we need to confirm your email address. </p>
                <p>Please check your email and follow the link in the email we sent you. It might take a few minutes for the email to arrive.</p>
                <p>Make sure to check your junk and spam folders.</p>

                <Button onClick={handleOpen} variant="contained" size="Large" disableElevation style={{background: "#E8F8FF",marginTop:17, color:"#0066BE",borderRadius: '6px',marginBottom:17, fontSize:"18px", textTransform: "none", display:"flex", justifyContent:"space-between", border: "1px solid #7DD4FF"}} fullWidth>
                      <div style={{display:"flex", justifyContent:"flex-start", margin:0,padding:0}}>
                        <img src={Question} alt="error" />
                        <p style={{margin:0,padding:0, marginLeft:10, fontSize:16}}>Didn’t get an email?</p>
                      </div>
                      <img src={ArrowDown} alt="error" />
                </Button>

                <Button  onClick={() => {navigate("/myprofile");}} variant="outlined" size="small" disableElevation style={{background: "white",color:"black", marginBottom:"17px", border: "1.5px solid #07283C", fontSize:"18px", textTransform: "none"}} fullWidth  type="submit" >Resend email</Button>
                
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
    
  );
}

export default EMailActivate;
