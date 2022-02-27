import { Grid,Paper,Button } from '@material-ui/core';
import Succestick from '../../Assets/succestick.svg'


function Emailsuccess() {

  const paperStyle={padding :20,paddingTop:'3%', width:340, margin:"10px auto",background: "#F7FBFF"};
  
  return (

            <Paper elevation={0} style={paperStyle}>
                <Grid align='Center'>
                <img src={Succestick} alt="error"/>
                </Grid>
                <h2 style={{marginTop:0}}>Thanks, your account is ready!</h2>
                <p>Your account is ready to use. On the next page, you'll see your account dashboard where you can create and manage orders. Ready to have a look around?</p>
                <Button variant="contained" size="Large" disableElevation style={{background: "#FFCD00",color:"#07283C", marginBottom:"17px", fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Continue to your account</Button>
            </Paper> 
  );
}

export default Emailsuccess;
