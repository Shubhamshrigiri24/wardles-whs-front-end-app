import React from 'react'
import './ConfirmAddress.css'
import { Button } from '@material-ui/core'
import { Typography } from '@material-ui/core'
function ConfirmAddress() {
  let navigate = useNavigate();

  const location = useLocation();

  const email = location.state.email;
  const password = location.state.password;
  const firstName = location.state.firstName;
  const lastName = location.state.lastName;
  const registrationNumber = location.state.registrationNumber;
  const addressLineOne = location.state.addressLineOne;
  const addressLineTwo = location.state.addressLineTwo;
  const city = location.state.city;
  const postcode = location.state.postcode;
  

  const handleSubmit = async (e) => {
    accessStart(
      location.state.email,
      location.state.password,
      location.state.registrationNumber,
      location.state.firstName,
      location.state.lastName,
      location.state.addressLineOne,
      location.state.addressLineTwo,
      location.state.postcode,
      location.state.city
    );
    // console.log(password)
    // console.log(user)
    navigate("/hcp/emailactivate", {
      state: {
        email: email,
      },
    });
    // console.log(user)
    e.preventDefault();
  };

  return (
      <>
      <div className="explore-section">
        <div className="container">
          <div className="inner-container">
            <div className="header-section">
            <h1>Confirm your address</h1>
            </div>
            <div className="text-section">
            <p >Double-check your address is correct and that it's the address registered with your prescriber.</p>
            </div>
            <Button className='textarea' fullWidth style={{ display: "block", textAlign: "left" ,border: "1px solid black", marginBottom:"2%" , marginTop:"2%", padding:"20px"}}>
            <Typography variant="Body1" className='typography-heading'> 
            Merchants Warehouse Castle Street
            </Typography>
            <br/>
            <Typography className='typography' variant="caption">Castlefield, Manchester, M3 4LZ</Typography>
            <input type="checkbox" className='checkbox'  />
            </Button>
            <Button variant="contained" size="large" disableElevation style={{marginTop:"10px", background: "white",color:"#07283C", fontFamily:"Gilroy Alt", fontSize:"16px", textTransform: "none", solid :"#07283C",borderRadius: "2px",fontWeight:"bold",border:"1px solid black"}} fullWidth type="submit">Change Address</Button>
            
            <Button variant="contained" size="large" disableElevation style={{marginTop:"10px", background: "#FFCD00",color:"#07283C", fontFamily:"Gilroy Alt", fontSize:"16px", textTransform: "none", solid :"#07283C",borderRadius: "2px",fontWeight:"bold",border:"0px solid "}} fullWidth type="submit">Close</Button>
            </div>
          </div> 
        </div>  
        </>
  )
}

export default ConfirmAddress