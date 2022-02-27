import React from "react";
import "./ThankYou.css";

function ThankYou() {
  return (
    <div className="thankyou-section">
      <div className="container">
        <div className="inner-container">
          <h1 className="keepupdate-heading">
            Thanks for confirming, we have deleted your data
          </h1>
          <p className="keepupdate-paragraph">
            Thanks for your interest in Well Healthcare Supplies. To find out
            about our other services, visit our website.
          </p>

          <button type="button" class="thankyou-button btn btn-warning">
            Go to well.co.uk
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
