import { Grid,Paper,Button } from '@material-ui/core';
import Succestick from '../../Assets/succestick.svg'


function ResetpasswordSuccess() {

  const paperStyle={padding :20,paddingTop:0, width:340, margin:"10px auto",background: "#F7FBFF"};

  
  return (

            <Paper elevation={0} style={paperStyle}>
                <Grid align='Center'>
                <img src={Succestick} alt="error"/>
                </Grid>
                <h2 style={{marginTop:0}}>Thanks, we’ve reset your password</h2>
                <p>You’ll need to use your new password to access your account in future.</p>
                
                <Button variant="contained" size="Large" disableElevation style={{background: "#FFCD00",color:"#07283C", marginBottom:"17px", fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Done</Button>
                
        
              

            </Paper> 

    
  );
}

export default ResetpasswordSuccess;
