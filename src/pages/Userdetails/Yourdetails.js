import React from 'react'
import {useState} from 'react'
import { Grid, Paper,Button,OutlinedInput, InputAdornment  } from '@material-ui/core';
import CallIcon from '../../Assets/CallIcon.svg';
import AccountCircleOutlinedgreen from '../../Assets/AccountCircleOutlinedgreen.svg';
import { useNavigate } from 'react-router-dom'; 
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {isEmpty} from '../../Components/validation/Validation'
import {showErrMsg} from '../../Components/notification/Notification';
import Navbar from '../../Components/Navbar/Navbar';
import ArrowBackIcon from '@material-ui/icons/KeyboardArrowLeft';

const initialState = {
    fname: '',
    lname: '',
    phn_no: '',
    err: '',
    success: ''
}


function Yourdetails() {
    let navigate = useNavigate();
    const paperStyle={padding :10, width:340, margin:"auto"};
    const [user, setUser] = useState(initialState)
    const {fname, lname,phn_no, err,success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: ''})
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(fname) || isEmpty(lname) || isEmpty(phn_no))
                return setUser({...user, err: "Please check the information above is correct",success: ''})
        navigate("/pharmacydetails");
    }

  return (
    <div>
        <Navbar/>
        <div onClick={() => {navigate("/signup");}} style={{textDecoration:"none", color:"#5E5E5E;", display:"flex", alignItems:"center", margin:0, padding:0,marginLeft:150}}>
            <ArrowBackIcon />
            <p>Back</p>
        </div>
        <Grid>
        <form onSubmit={handleSubmit}>
        <Paper elevation={0} style={paperStyle}>
                <h2 style={{fontSize: 25,margin:0, marginBottom:5, textAlign:"start"}}>Your details</h2>

                <OutlinedInput
                        variant="outlined"
                        type="text"
                        placeholder="First name"
                        fullWidth
                        id="fname"
                        name="fname"
                        value={fname}
                        onChange={handleChangeInput}
                        style={{marginBottom:2,marginTop:15,boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",height:45}}
                        size="small"
                        startAdornment={<InputAdornment position="start"><img src={AccountCircleOutlinedgreen} alt="error"/></InputAdornment>}
                           
                    />
                <OutlinedInput
                        variant="outlined"
                        type="text"
                        placeholder="Last name"
                        fullWidth
                        id="lname"
                        value={lname}
                        name="lname"
                        onChange={handleChangeInput}
                        style={{marginBottom:2,marginTop:15,boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",height:45}}
                        size="small"
                        startAdornment={<InputAdornment position="start"><img src={AccountCircleOutlinedgreen} alt="error"/></InputAdornment>}
                           
                    />
                <OutlinedInput
                        variant="outlined"
                        type={'text'}
                        placeholder="Phone number"
                        fullWidth
                        id="phn_no"
                        name="phn_no"
                        value={phn_no}
                        onChange={handleChangeInput}
                        style={{marginBottom:5,marginTop:15,boxShadow: "2px 2px 7px rgba(0, 0, 0, 0.07)",height:45}}
                        size="small"
                        startAdornment={<InputAdornment position="start"><img src={CallIcon} alt="error"  /></InputAdornment>}
                           
                    />
                    {err && showErrMsg(err)}
            <Grid align="center">
                <Button variant="contained" fullWidth size="large" disableElevation style={{background: "#3D8541",color:"white", marginTop:"17px", fontSize:"12px", textTransform: "none",borderRadius:"2px"}} type="submit" >Next</Button>
            </Grid>
        </Paper>
        </form>
    </Grid>
    </div>
  )
}

export default Yourdetails