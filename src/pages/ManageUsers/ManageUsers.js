import { Grid,Paper, TextField, Checkbox} from '@material-ui/core';
import {Link} from 'react-router-dom' ;
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './ManageUser.css';
import Adduser from '../../Assets/Adduser.svg';
import Edit from '../../Assets/Edit.svg';
import { useNavigate } from 'react-router-dom'; 


function ManageUsers() {

    let navigate = useNavigate();

    return (
      <>
        <div style={{textDecoration:"none", color:"black", display:"flex", alignItems:"center", margin:0, padding:0,marginLeft:150}}>
          <ArrowBackIcon />
          <p>Back</p>
        </div>

      <Grid>
        <Paper elevation={0} className="manageusers">
          <div className="line1">
                <h2 className="header">Manage Users</h2>
                <div className='adduser' onClick={() => {navigate("/adduser");}}>
                  <img src={Adduser} alt="error" />
                  <p className="addusertext">Add a new user</p>
                </div>
          </div>

          <div className="line2">
                <p className="text">Account number: 4DF45235</p>
                <p className="text">Pharmacy Name: ABC Pharmacy</p>
          </div>

          <div className="line3">
                <p className="text">Group Name: Jane Pharma</p>
          </div>

        <div className='tablecontainer'>
          <table className="table">
            <thead className="tablehead">
              <tr>
                <th>Name</th>
                <th>Email address</th>
                <th>Status</th>
                <th>Role</th>
                <th style={{width:70}}></th>
              </tr>
            </thead>
            <tbody className="tablebody">
              <tr className="tablerow">
                <td>John Doe</td>
                <td>johndoe@email.com</td>
                <td>Registered</td>
                <td>Admin</td>
                <td onClick={() => {navigate("/editusers");}}><img src={Edit} alt="error" /></td>
              </tr>
              <tr className="tablerow">
                <td>Emma Jane</td>
                <td>emmajane@email.com</td>
                <td>Registered</td>
                <td>User</td>
                <td onClick={() => {navigate("/editusers");}}><img src={Edit} alt="error" /></td>
              </tr>
              <tr className="tablerow">
                <td>Harry Peterson</td>
                <td>harry@email.com</td>
                <td>Link sent</td>
                <td>User</td>
                <td onClick={() => {navigate("/editusers");}}><img src={Edit} alt="error" /></td>
              </tr>
              <tr className="tablerow">
                <td>Harry Peterson</td>
                <td>harry@email.com</td>
                <td>Link sent</td>
                <td>User</td>
                <td onClick={() => {navigate("/editusers");}}><img src={Edit} alt="error" /></td>
              </tr>
              <tr className="tablerow">
                <td>Harry Peterson</td>
                <td>harry@email.com</td>
                <td>Link sent</td>
                <td>User</td>
                <td onClick={() => {navigate("/editusers");}}><img src={Edit} alt="error" /></td>
              </tr>
            </tbody>
          </table>
              <div className="auditcontainer">       
                    <p>Audit trial</p>
              </div>

          </div>
        </Paper>
    </Grid>

    </>
    );
  }
  
  export default ManageUsers;