import {Grid, Paper, Button, Link } from '@material-ui/core';
import Help from '../../Assets/Help.svg'
import Arrowright from '../../Assets/Arrowright.svg';

function CheckYourEmail() {

  const paperStyle={padding :20,paddingTop:"3%", width:380, margin:"10px auto",background: "#F7FBFF"};
 
  
  return (
    <Grid>
            <Paper elevation={0} style={paperStyle}>
                
                <h4 style={{fontFamily: "Gilroy Alt",fontSize: "32px"}}>Check your email to reset  your password</h4>
              

                <p style={{fontfamily: "Gilroy Alt",fontsize: "18px"}}>We’ve sent an email to email@address.com <br/> with a secure link to reset your password.</p>

                <Button variant="contained" size="Large" disableElevation style={{background: "#FFCD00",color:"#07283C" ,marginBottom:"17px", borderWidth: '0px', border: "1.5px solid ", fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Resend email</Button>
                
                <div style={{marginRight: 10 , size: "large" ,background:'#E8F8FF' ,padding: 18  , display :'flex',  justifyContent : "center" , alignItems :"center"}}>
                <div style={{width: 50,margin:0,padding:0,display:'flex', justifyContent:"start", alignItems:"start", borderRadius: 4}}>
                <img src={Help} alt="error" />
                </div>  
                <Link href="#" underline="none" margin = '' >
                  Didn’t get an email?
                </Link> 
                <div style={{width: 50, margin:0,padding:0,display:'flex', justifyContent:"end", alignItems:"end", borderRadius: 4}}>
                <img src={Arrowright} alt="error" />
                </div>   
                </div>


            </Paper> 
      </Grid>      
    
  );
}

export default CheckYourEmail;
