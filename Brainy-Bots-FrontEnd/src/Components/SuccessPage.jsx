import React from "react";
import "./Styles/successanderror.css";

const SuccessPage = () => {
  return (
    <div className='result-main-div'>
      <div className='result-page'>
        <h2 className='result-title success'>
          Succesfully Logged into UIDAI<br></br>
        </h2>
        <p className='result-message'>Your details are stored safely.</p>
      </div>
    </div>
  );
};

export default SuccessPage;
