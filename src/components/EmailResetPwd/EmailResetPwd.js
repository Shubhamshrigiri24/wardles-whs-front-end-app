import { Paper,Button,TextField } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';

function EmailResetPwd() {

  const paperStyle={padding :20,paddingTop:'3%', width:400, margin:"10px auto",background: "#F7FBFF"};
  
  return (

            <Paper elevation={0} style={paperStyle}>
                <h2 style={{marginTop:'3%' , fontFamily:"Gilroy Alt",fontSize:"32px"}}>Enter your email address</h2>
                <p style={{fontFamily:"Gilroy Alt",fontSize:"18px"}}>Enter the email address you used to create your account.</p>
                <TextField
                margin="normal"
                required
                fullWidth
                id="firstmail"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
              />
                <Button variant="contained" size="large" disableElevation style={{background: "#FFCD00",color:"#07283C", fontFamily:"Gilroy Alt", marginBottom:"17px", fontSize:"16px", textTransform: "none"}} fullWidth type="submit" >Continue to your account</Button>
            </Paper> 
  );
}

export default EmailResetPwd;
