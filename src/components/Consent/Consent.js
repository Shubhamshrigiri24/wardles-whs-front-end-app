import React from 'react'
import { useState } from 'react';
import Redcross from '../../Assets/Redcross.svg'



import './Consent.css'

export const showErrMsg = (msg) => {
  return <div className="errMsg">
    <div style={{ display: "flex", justifyContent: "flex-start", margin: 0, padding: 0, width: "90%" }}>
      <p style={{ margin: 0, padding: 0, marginLeft: 5, fontSize: 16 }}>{msg}</p>
    </div>
    <div style={{ paddingLeft: "25%" }}>
      <img src={Redcross} width="10" height="20" alt="error" className="close" />
    </div>
  </div>
}

export const showErrMsgEmpty = (msg) => {
  return (
    <p className="emptyfield" style={{ margin: 0, padding: 0, marginLeft: 5, fontSize: 16 }}>{msg}</p>

  )
}

export default function Consent() {



  const [A, setA] = useState(false);

  const [B, setB] = useState(false);
  const [C, setC] = useState(false);
  const [D, setD] = useState(false);
  const [Error, setError] = useState('')


  console.log(A)
  console.log(B)
  console.log(C)
  console.log(D)
  console.log(Error)
  const handleOnChangeA = () => {
    setA(!A);

  };
  const handleOnChangeB = () => {
    setB(!B);
  };
  const handleOnChangeC = () => {
    setC(!C);
  };
  const handleOnChangeD = () => {
    setD(!D);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (A === true && B === true && C === true && D === true) {
      setError("")
      alert("submit")//navigate to next page.

    }

    else {
      setError("You must agree to all of the statements above to continue.")

    }


  }
  return (
    <div className="consent-section">
      <div className="container">
        <div className='inner-container'>
          <div>
            <form onSubmit={handleSubmit}  >
              <h1 className='container-heading'>Consent</h1>
              <p className='container-paragraph'>You must agree to all of the statements below to continue.</p>

              <div className='card-input-box'>

                <label className='card-input-label'>I agree to the terms and conditions. For information on how we use your personal data see our privacy policy.</label>
                <input type="checkbox" id="a" onChange={handleOnChangeA} className='larger' />
                <span className='checkmark'></span>
              </div>
              <div className='card-input-box'>
                <label className='card-input-label'>I agree to make Well Healthcare Supplies my nominated appliance supplier. This is where my prescriber will send my prescriptions.</label>
                <input type="checkbox" id="b" onChange={handleOnChangeB} className='larger' />
              </div>
              <div className='card-input-box'>
                <label className='card-input-label'>I agree that Well Healthcare Supplies may contact my prescriber about my prescriptions.</label>
                <input type="checkbox" id="c" onChange={handleOnChangeC} className='larger' />
              </div>
              <div className='card-input-box'>
                <label className='card-input-label'>I agree to have my products delivered to me.</label>
                <input type="checkbox" id="d" onChange={handleOnChangeD} className='larger' />
              </div>


              {Error && showErrMsg(Error)}

              <button type="submit" value="submit" class="next-button btn btn-warning">Next</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
