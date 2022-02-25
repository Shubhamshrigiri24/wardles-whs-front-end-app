import { Grid,Paper, TextField, Button} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate } from 'react-router-dom'; 
import Navbar from '../../Components/Navbar/Navbar';


function Userregform() {
  let navigate = useNavigate();

  const paperStyle={padding :10, width:650, margin:"auto"};

    return (
      <>
      <Navbar />
        

      <Grid>
        <Paper elevation={0} style={paperStyle}>
                <h2 style={{fontSize: 25,margin:0, marginBottom:25, textAlign:"center"}}>User Registration Form</h2>
            

          <Grid fullWidth style={{marginBottom:17, display:"flex", justifyContent:"space-between"}}>
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginRight:10, background:"white"}}
                type="text"  variant="outlined" 
                fullWidth
                label="First Name" 
                />
            
            
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginLeftt:10, background:"white"}}
                type="text"  variant="outlined" 
                fullWidth
                label="Last Name"
                />
          </Grid>

          <Grid fullWidth style={{marginBottom:17, display:"flex", justifyContent:"space-between"}}>
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginRight:10, background:"white"}}
                type="text"  variant="outlined" 
                fullWidth
                label="Phone number"
                />
            
            
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginLeftt:10, background:"white"}}
                type="text"  variant="outlined" 
                fullWidth
                label="Enter pharmacy name"
                />
          </Grid>

          <Grid fullWidth style={{marginBottom:17, display:"flex", justifyContent:"space-between"}}>
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginRight:10, background:"white"}}
                type="text"  variant="outlined" 
                fullWidth
                label="Enter the post code"
                />
            
            
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginLeftt:10, background:"white"}}
                type="text"  variant="outlined" 
                fullWidth
                label="Enter pharmacy name"
                />
          </Grid>

           

          <Grid align='right'>
            <Button  onClick={() => {navigate("/emailactivate");}} variant="contained" align="Right" size="Large" disableElevation style={{background: "#404040",color:"white", marginTop:"17px", fontSize:"18px", textTransform: "none"}} type="submit" >Continue</Button>
          </Grid>


            



        </Paper>
    </Grid>

    </>
    );
  }
  
  export default Userregform;