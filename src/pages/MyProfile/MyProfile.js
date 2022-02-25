import { Grid,Paper, TextField, Checkbox} from '@material-ui/core';
import Navbar from '../../Components/Navbar/Navbar';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useNavigate } from 'react-router-dom'; 


function MyProfile() {
let navigate = useNavigate();
  const paperStyle={padding :10, width:650, margin:"auto"};

    return (
      <>
      <Navbar />
        <div style={{textDecoration:"none", color:"black", display:"flex", alignItems:"center", margin:0, padding:0,marginLeft:150}}>
          <ArrowBackIcon />
          <p >Back</p>
        </div>

      <Grid>
        <Paper elevation={0} style={paperStyle}>
          <div style={{margin:0,padding:0, display:"flex", justifyContent:"space-between" }}>
                <h2 style={{fontSize: 25,margin:0,padding:0}}>My Profile</h2>
                <p   onClick={() => {navigate("/resetpassword");}} style={{margin:0,padding:0,textDecoration:"none",color:"black" }}>Change password</p>
          </div>

          <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginTop:17,marginBottom:17, background:"#F2F2F2"}}
                type="text"  variant="outlined" 
                fullWidth
                disabled
                label="Email address" 
                />
                

          <Grid fullWidth style={{marginBottom:17, display:"flex", justifyContent:"space-between"}}>
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginRight:10, background:"#F2F2F2"}}
                type="text"  variant="outlined" 
                fullWidth
                disabled
                label="First Name" 
                />
            
            
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginLeftt:10, background:"#F2F2F2"}}
                type="text"  variant="outlined" 
                fullWidth
                disabled
                label="Last Name"
                />
          </Grid>

          <Grid fullWidth style={{marginBottom:17, display:"flex", justifyContent:"space-between"}}>
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginRight:10, background:"#F2F2F2"}}
                type="text"  variant="outlined" 
                fullWidth
                disabled
                label="Pharmacy Account Number"
                />
            
            
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginLeftt:10, background:"#F2F2F2"}}
                type="text"  variant="outlined" 
                fullWidth
                disabled
                label="Pharmacy Name"
                />
          </Grid>

          <Grid fullWidth style={{marginBottom:17, display:"flex", justifyContent:"space-between"}}>
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginRight:10, background:"#F2F2F2"}}
                type="text"  variant="outlined" 
                fullWidth
                label="Pharmacy Post code"
                disabled
                />
            
            
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginLeftt:10, background:"white"}}
                type="text"  variant="outlined" 
                fullWidth
                label="Pharmacy Phone Number"
                />
          </Grid>

          <Grid fullWidth style={{marginBottom:17, display:"flex", justifyContent:"space-between"}}>
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginRight:10, background:"#F2F2F2"}}
                type="text"  variant="outlined" 
                fullWidth
                disabled
                label="Current role"
                />
            
            
            <TextField size="small"
                style={{boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",marginLeftt:10, background:"white"}}
                type="password"  variant="outlined" 
                fullWidth
                label="Current password"
                />
          </Grid>

          <div style={{display:"flex"}}>
          <Checkbox style={{color:"grey", padding:0, paddingRight:5}} />
          <p>I would like to receive offers from Wardles by email</p>
          </div>

        </Paper>
    </Grid>

    </>
    );
  }
  
  export default MyProfile;