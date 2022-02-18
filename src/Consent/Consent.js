import React from 'react'
import './Consent.css'
import { useNavigate } from 'react-router-dom';

export default function Consent() {
  let navigate = useNavigate()
  return (
    <div className="consent-section"> 
    <div className="container">
    <div className='inner-container'>
        <div>
        <h1 className='container-heading'>Consent</h1>
        <p className='container-paragraph'>You must agree to all of the statements below to continue.</p>
        <div className='card-input-box'>
            <label  className='card-input-label'>I agree to the terms and conditions. For information on how we use your personal data see our privacy policy.</label>
            <input type="checkbox" className='larger' />
            <span className='checkmark'></span>
        </div>
        <div className='card-input-box'>
            <label  className='card-input-label'>I agree to make Well Healthcare Supplies my nominated appliance supplier. This is where my prescriber will send my prescriptions.</label>
            <input type="checkbox" className='larger' />
        </div>
        <div className='card-input-box'>
            <label  className='card-input-label'>I agree that Well Healthcare Supplies may contact my prescriber about my prescriptions.</label>
            <input type="checkbox" className='larger' />
        </div>
        <div className='card-input-box'>
        <label  className='card-input-label'>I agree to have my products delivered to me.</label>
        <input type="checkbox" className='larger' />
        </div>

        <button  onClick={() => {navigate("/emailactivate");}} type="button" class="next-button btn btn-warning">Next</button>

        </div> 
        </div>  
    </div>
    </div>
  )
}
