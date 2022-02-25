import React from 'react'
import './KeepUpdate.css'
function KeepUpdate() {
  return (
      <>
      <div className="keepupdate-section">
        <div className="container">
          <div className="inner-container">
            <div className="header-section">
            <h1>Keep up to date with offers from Well?</h1>
            </div>
            <div className="text-section">
            <p >We're sorry we couldn't set up the service you wanted this time. If you'd still like to see health advice and offers from Well Healthcare Supplies, we will save your details and keep you on our mailing list.</p>
            </div>
            <div className="text-section2">
              <p>If this isn't what you want, you can delete your details using the button below.</p>
            </div>
            <div>
            <button className="button-1" type="button">Delete my details </button>
            </div>
            <div>
            <button className="button-2" type="button">Keep me updated</button>
            </div>
            </div>
          </div> 
        </div>  
        </>
  )
}

export default KeepUpdate