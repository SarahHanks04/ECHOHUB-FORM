import React from "react";
import "../Styles/Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="outer-spinner">
        <div className="inner-spinner"></div>
      </div>
    </div>
  );
};

export default Spinner;
