import React from "react";
import "./notification.css";
import Redcross from "../../Assets/Redcross.svg";

export const showErrMsg = (msg) => {
  return (
    <div className="errMsg">
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          margin: 0,
          padding: 0,
          width: "90%",
        }}
      >
        <p style={{ margin: 0, padding: 0, marginLeft: 5, fontSize: 16 }}>
          {msg}
        </p>
      </div>
      <div style={{ paddingLeft: "25%" }}>
        <img
          src={Redcross}
          width="10"
          height="20"
          alt="error"
          className="close"
        />
      </div>
    </div>
  );
};

export const showErrMsgEmpty = (msg) => {
  return (
    <p className="emptyfield" style={{ marginTop: -15, fontSize: 16 }}>
      {msg}
    </p>
  );
};
