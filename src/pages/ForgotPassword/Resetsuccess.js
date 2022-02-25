import { Grid, Paper,Button } from '@material-ui/core';
import Right from '../../Assets/Right.svg';
import Navbar from '../../Components/Navbar/Navbar';

function Resetsuccess() {
    
    const paperStyle={padding :10, width:340, margin:"auto", marginTop:50};

    return (
      <>
      <Navbar />
      <Grid align="center">
        <Paper elevation={0} style={paperStyle} sx={{textAlign:"center"}}>
                <img src={Right} alt="" srcset=""/>
                <h1 style={{fontSize: 25,margin:0, marginBottom:25,width:"70%"}}>Thanks, we’ve reset your password</h1>
                <p style={{fontSize:"75%",textAlign:"start"}}>You’ll need to use your new password to access your account in future.</p>
                <Button variant="outlined" size="large" fullWidth disableElevation style={{background:"#3D8541", color:"white", marginTop:"8px", fontSize:"12px", textTransform: "none"}} type="submit" >Go to my account</Button>
        </Paper>
    </Grid>

    </>
    );
  }
  
  export default Resetsuccess;