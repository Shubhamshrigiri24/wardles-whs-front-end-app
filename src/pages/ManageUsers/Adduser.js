import { Grid,Paper, TextField, Checkbox, Button} from '@material-ui/core';
import {Link} from 'react-router-dom' ;
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './EditUser.css';
import Dropdown from '../../Components/Dropdown/Dropdown';
import Navbar from '../../Components/Navbar/Navbar';


function Adduser() {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' }, color:"grey" };
    return (
      <>
      <Navbar />
        <div to="/back" style={{textDecoration:"none", color:"black", display:"flex", alignItems:"center", margin:0, padding:0,marginLeft:150}}>
          <ArrowBackIcon />
          <p>Back</p>
        </div>

      <Grid>
        <Paper elevation={0} className="edituser">
          <div className="line1">
                <h2 className="header">Add Users</h2>
          </div>
        
        <div className='subcontainer'>

            <TextField size="small"
                    className="addusertextarea"
                    label="Enter user name"
                    type="text"  variant="outlined" 
                    fullWidth
                    />
            <TextField size="small"
                    className="addusertextarea"
                    label="Email address"
                    type="text"  variant="outlined" 
                    fullWidth
                    />

            <Dropdown />

            <div className="checkboxcontainer">
            <Checkbox {...label} style={{padding:0, marginRight:5}} />
            <p style={{margin:0, padding:0, fontSize:12}}>Can View Commission Statements</p>
            </div>

            <div className='adduserbuttoncontainer'>
            <Button on variant="contained" size="small" disableElevation className='button2'  type="submit" >Add</Button>
            </div>
        
        </div>

       
        </Paper>
    </Grid>

    </>
    );
  }
  
  export default Adduser;