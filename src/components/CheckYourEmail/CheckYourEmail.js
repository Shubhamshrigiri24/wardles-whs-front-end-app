import {Grid, Paper, Button } from '@material-ui/core';
import GetEmail from '../GetEmail';

function CheckYourEmail() {

  const paperStyle={padding :20,paddingTop:"3%", width:380, margin:"10px auto",background: "#F7FBFF"};
 
  
  return (
    <Grid>
            <Paper elevation={0} style={paperStyle}>
                
                <h4 style={{fontFamily: "Gilroy Alt",fontSize: "32px"}}>Check your email to reset  your password</h4>
              

                <p style={{fontfamily: "Gilroy Alt",fontsize: "18px"}}>We’ve sent an email to email@address.com <br/> with a secure link to reset your password.</p>

                <Button variant="contained" size="Large" disableElevation style={{background: "#FFCD00",color:"#07283C" ,marginBottom:"17px", borderWidth: '0px', border: "1.5px solid ", fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Resend email</Button>
                
                <GetEmail/>

            </Paper> 
      </Grid>      
    
  );
}

export default CheckYourEmail;
