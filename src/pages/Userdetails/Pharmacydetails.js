import React from 'react'
import {useState} from 'react'
import { Grid, Paper,Button,OutlinedInput,Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useNavigate } from 'react-router-dom'; 
import {isEmpty} from '../../Components/validation/Validation'
import {showErrMsg} from '../../Components/notification/Notification';
import Question from '../../Assets/questionmark.svg';
import ArrowDown from '../../Assets/Arrowdown.svg';
import Navbar from '../../Components/Navbar/Navbar';
import ArrowBackIcon from '@material-ui/icons/KeyboardArrowLeft';

const initialState = {
    pharm_name: '',
    pharm_code: '',
    pharm_accno: '',
    err: '',
}

function Pharmacydetails() {
    let navigate = useNavigate();
    const paperStyle={padding :10, width:340, margin:"auto"};
    const [user, setUser] = useState(initialState)
    const {pharm_name, pharm_code,pharm_accno, err} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(pharm_name) || isEmpty(pharm_code) || isEmpty(pharm_accno))
                return setUser({...user, err: "Please check the information above is correct"})
        navigate("/emailactivate");              
    }

  return (
    <div>
        <Navbar />
        <div onClick={() => {navigate("/yourdetails");}} style={{textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, padding:0,marginLeft:150}}>
            <ArrowBackIcon />
            <p>Back</p>
        </div>        
        <Grid>
        <form onSubmit={handleSubmit}>
        <Paper elevation={0} style={paperStyle}>
                <h2 style={{fontSize: 25,margin:0, marginBottom:15, textAlign:"start"}}>Pharmacy details</h2>
                <Typography variant="subtitle2" style={{fontSize:"75%",textAlign:"start",lineHeight:"17px",color:"#4E4E4E"}}>Enter your pharmacy name, postcode and account number used on your account.</Typography>

                <OutlinedInput
                        variant="outlined"
                        type={'text'}
                        placeholder="Pharmacy name"
                        fullWidth
                        onChange={handleChangeInput}
                        name="pharm_name"
                        name="pharm_name"
                        value={pharm_name}
                        id="pharm_name"
                        style={{marginBottom:2,marginTop:25,boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",height:45}}
                        size="small"
                           
                    />
                <OutlinedInput
                        variant="outlined"
                        type={'text'}
                        placeholder="Pharmacy postcode"
                        fullWidth
                        onChange={handleChangeInput}
                        id="pharm_code"
                        name="pharm_code"
                        value={pharm_code}
                        name="pharm_code"
                        style={{marginBottom:2,marginTop:15,boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",height:45}}
                        size="small"
                           
                    />
                <OutlinedInput
                        variant="outlined"
                        type={'text'}
                        placeholder="Pharmacy account number"
                        fullWidth
                        onChange={handleChangeInput}
                        id="pharm_accno"
                        name="pharm_accno"
                        name="pharm_accno"
                        value={pharm_accno}
                        style={{marginBottom:0,marginTop:15,boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",height:45}}
                        size="small"
                           
                    />
                    {err && showErrMsg(err)}
                    
                    <Button variant="contained" size="Large" disableElevation style={{background: "#E8F8FF",color:"#0066BE",borderRadius: '4px',border:"1px solid #0066BE", fontSize:"12px",marginTop:"15px", textTransform: "none", display:"flex", justifyContent:"space-between"}} fullWidth>
                  <div style={{display:"flex", justifyContent:"flex-start", margin:0,padding:0}}>
                  <img src={Question} width="10" height="20" alt="error" />
                  <p style={{margin:0,padding:0, marginLeft:5, fontSize:12}}>What is a pharmacy account number?</p>
                  </div>
                  <img src={ArrowDown} width="10" height="20" alt="error" />
                </Button>
                 
                   
            <Grid align="center">
                <Button variant="contained" fullWidth size="large" disableElevation style={{background: "#3D8541",color:"white", marginTop:"22px", fontSize:"12px", textTransform: "none",borderRadius:"2px"}} type="submit" >Next</Button>
            </Grid>
        </Paper>
        </form>
    </Grid>
    </div>
  )
}

export default Pharmacydetails