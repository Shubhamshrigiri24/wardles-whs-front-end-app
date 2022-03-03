import React from "react";
import "./KeepUpdate2.css";
import { Link } from "@material-ui/core";


export default function KeepUpdate2() {
  return (
    <div className="keepupdate-section">
      <div className="container">
        <div className="inner-container">
          <div className="keepupdate-heading">
            <h1>Thanks, we’ll keep you updated</h1>
          </div>
          <div className="keepupdate-paragraph">
            <p>
              We'll be in touch with our latest offers, important updates and
              health advice. To find out about our other services, visit our
              website.
            </p>
          </div>
          <div>
          <Link href="https://www.well.co.uk" style={{textDecoration:"none"}}>
            <button type="button" class="keepupdate-button ">
              Go to well.co.uk
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
