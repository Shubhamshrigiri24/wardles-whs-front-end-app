import React from 'react'
import './ConfirmAddress.css'
import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';


function ConfirmAddress() {
  let navigate = useNavigate();

  return (
      <>
      <div className="explore-section">
        <div className="container">
          <div className="inner-container">
            <div className="header-section">
            <h3>Confirm your address</h3>
            </div>
            <div className="text-section">
            <p >Double-check your address is correct and that it's the address registered with your prescriber.</p>
            </div>
            <Button fullWidth style={{ display: "block", textAlign: "left" ,border: "1px solid black", marginBottom:"2%" , marginTop:"2%", padding:"20px"}}>
            <Typography variant="Body1">
            Merchants Warehouse Castle Street
            </Typography>
            <br/>
            <Typography variant="caption">Castlefield, Manchester, M3 4LZ</Typography>
            </Button>
            <Button onClick={() => {navigate("/homeaddressmanual");}} variant="contained" size="large" disableElevation style={{marginTop:"10px", background: "white",color:"#07283C", fontFamily:"Roboto", fontSize:"16px", textTransform: "none", solid :"#07283C",borderRadius: "2px",fontWeight:"bold",border:"1px solid black"}} fullWidth type="submit">Change Address</Button>
            
            <Button onClick={() => {navigate("/selectprescriber");}} variant="contained" size="large" disableElevation style={{marginTop:"10px", background: "#FFCD00",color:"#07283C", fontFamily:"Roboto", fontSize:"16px", textTransform: "none", solid :"#07283C",borderRadius: "2px",fontWeight:"bold",border:"1px solid black"}} fullWidth type="submit">Confirm</Button>
            </div>
          </div> 
        </div>  
        </>
  )
}

export default ConfirmAddress