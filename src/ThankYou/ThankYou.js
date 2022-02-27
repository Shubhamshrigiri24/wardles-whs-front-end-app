import React from "react";
import "./ThankYou.css";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/KeyboardArrowLeft";

function ThankYou() {
  let navigate = useNavigate();

  return (
    <div className="thankyou-section">
      <div style={{ marginTop: "2%" }}>
        <a
          href=" "
          style={{
            textDecoration: "none",
            color: "black",
            display: "flex",
            alignItems: "center",
            margin: 0,
            padding: 0,
            marginLeft: 150,
            marginTop: 0,
          }}
        >
          <ArrowBackIcon />
          <p>Back</p>
        </a>
      </div>
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
