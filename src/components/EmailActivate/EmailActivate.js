import { Grid,Paper, Button } from '@material-ui/core';
import Message from '../../Assets/message.svg'
import Msgmail from '../../Assets/msgmail.svg';
import GetEmail from '../GetEmail';



function EMailActivate() {

  const paperStyle={padding :20,paddingTop:0, width:380, margin:"10px auto",background: "#F7FBFF"};
  const paperStyle2={padding:15, border: "1px solid #CEDCE9", display:"flex",boxSizing:"border-box"}

  
  return (
    // <Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='Center'>
                <img src={Message} alt="error"/>
                </Grid>
                <h2 style={{marginTop:0,fontFamily:"Gilroy Alt"}}>Check your email to <br/> activate your account</h2>
              
        
            <Paper elevation={0} style={paperStyle2}>
              <img src={Msgmail} alt="error" />
              <div style={{marginLeft:15}}>
                <p style={{fontFamily:"Gilroy Alt"}}>We’ve sent an email to </p>
                <p style={{fontFamily:"Gilroy Alt",fontWeight:"bold"}}>emailaddress@email.com</p>
              </div>
            </Paper>
    
                <p style={{fontFamily:"Gilroy Alt"}}>To complete sign up and process your future orders, we need to confirm your email address.</p>
                <p style={{fontFamily:"Gilroy Alt"}}>Please check your email and follow the link in the email we sent you.</p>

                <Button  variant="contained" size="Large" disableElevation style={{background: "#F7FBFF",color:"#07283C",fontFamily:"Gilroy Alt", marginBottom:"17px", border: "1.5px solid #07283C", fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Resend email</Button>
                
                <GetEmail/>
              
               
            </Paper> 
    // </Grid>
    
  );
}

export default EMailActivate;
