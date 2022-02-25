import './Signin.css';
import {useState} from 'react';
import Logowhite from "../../Assets/logowhite.svg";
import Helpicon from "../../Assets/Helpicon.svg"
import { Grid,Paper, TextField, Button, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom'; 
import {isEmpty, isEmail} from '../../Components/validation/Validation'
import {showErrMsg} from '../../Components/notification/Notification'

const initialState = {
  email: '',
  password: '',
  err: '',
  success: '',
}

function Signin() {

    let navigate = useNavigate();
    const paperStyle={padding :110,paddingTop:50, margin:"10px auto",};

    const [user, setUser] = useState(initialState)
    const {email, password,err, success} = user



    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(email) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

            
        navigate("/myprofile");

    }

    return (
      <div className="container">
        <div className="detailscontainer">
          <div className="detailsdiv">
          <img src={Logowhite} alt="error" className='image'/>
          <p className="detailstext">Wardles, our independent Dispensing Appliance Contractor (DAC) is part of Bestway Medhub group and are Part IX specialists.</p>
          <p className="detailstext"> Wardles helps pharmacies and dispensing practices by enhancing profits and supports cash flow, whilst offering an enhanced service to your patients. We do this by offering an easy and simple to use agency scheme which saves both time and money.</p>
          </div>
        </div>

        <div className="singincontainer">
        <Grid>
        <form onSubmit={handleSubmit}>

                <Grid align='right' className='helpcontainer'>
                <img src={Helpicon} alt="error" />
                <p className='helptext'>Help</p>
                </Grid>
            <Paper elevation={0} style={paperStyle}>
                <Grid align='left'>
                    <h2 style={{fontSize: 28, margin:0}}>Sign in</h2>
                </Grid>

                    <p style={{fontSize: 18,marginBottom:15}}>Enter your email address and password.</p>

                <TextField size="small"
                    label="Email address"
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)"}}
                    placeholder="Email address" 
                    variant="outlined" 
                    type="text" id="email"
                    value={email} 
                    name="email" 
                    onChange={handleChangeInput}
                    fullWidth
                    />
                <TextField 
                    size="small"
                    label="Password"
                    style={{marginBottom:"17px",boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)"}} 
                    placeholder="Password" 
                    type="password"
                    id="password"
                    value={password} name="password"
                    variant="outlined" 
                    onChange={handleChangeInput}
                    fullWidth />

                    {err && showErrMsg(err)}

                <Button  variant="contained" size="large" disableElevation style={{background: "#3D8541",boxShadow: "0px 4px 0px #125A16",color:"white",  fontSize:"18px", textTransform: "none"}} fullWidth type="submit" >Sign In</Button>

                <Typography style={{textAlign: "Center"}} >
                    <p style={{fontSize: 16,color:"black",textDecoration:"none"}} >Don’t have an account?</p>
                </Typography>

                <Button onClick={() => {navigate("/signup");}} variant="outlined" size="large" disableElevation style={{background: "white",color:"black", fontSize:"18px", border: "1.5px solid #222222",boxSizing: "border-box", textTransform: "none"}} fullWidth type="submit" >Create account</Button>

                <Typography style={{marginTop:"17px",textAlign: "Center"}} >
                    <p onClick={() => {navigate("/forgotpasswordemail");}} style={{fontSize: 16,color:"#007BB8",textDecoration:"none"}} >Forgotten your password?</p>
                </Typography>
               



            </Paper>
           </form>
        </Grid>
        </div>
      
      </div>
      
    );
  }
  
  export default Signin;