import React from "react";
import "./ThankYou.css";
import { Link } from "@material-ui/core";


function ThankYou() {
  return (
    <div className="thankyou-section">
      <div className="container">
        <div className="inner-container">
          <h1 style={{color:""}}>Thanks for confirming, we have deleted your data</h1>
          <p>
            Thanks for your interest in Well Healthcare Supplies. To find out
            about our other services, visit our website.
          </p>
          <Link href="https://www.well.co.uk" style={{textDecoration:"none"}}>
          <button type="button" class="thankyou-button btn btn-warning">
            Go to well.co.uk
          </button>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
