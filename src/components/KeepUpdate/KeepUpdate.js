import React from "react";
import "./KeepUpdate.css";
import { useNavigate } from "react-router-dom";

function KeepUpdate() {
  let navigate = useNavigate();
  return (
    <>
      <div className="keepupdate-section">
        <div className="container">
          <div className="inner-container">
            <div className="header-section">
              <h2>Keep up to date with offers from Well?</h2>
            </div>
            <div className="text-section">
              <p>
                We're sorry we couldn't set up the service you wanted this time.
                If you'd still like to see health advice and offers from Well
                Healthcare Supplies, we will save your details and keep you on
                our mailing list.
              </p>
            </div>
            <div className="text-section">
              <p>
                If this isn't what you want, you can delete your details using
                the button below.
              </p>
            </div>
            <div>
              <button
                onClick={() => {
                  navigate("/thankyou");
                }}
                className="button-1"
                type="button"
              >
                Delete my details{" "}
              </button>
            </div>
            <div>
              <button
                onClick={() => {
                  navigate("/keepupdate2");
                }}
                className="button-2"
                type="button"
              >
                Keep me updated
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KeepUpdate;
