import React from "react";
import "./successanderror.css";

const SuccessPage = () => {
  return (
    <div className="result-main-div">
      <div className='result-page'>
        <h2 className='result-title success'>
          Success!<br></br>
        </h2>
        <p className='result-message'>You have been verified as a human.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
