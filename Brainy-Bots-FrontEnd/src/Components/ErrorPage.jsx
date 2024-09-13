import React from "react";
import "./Styles/successanderror.css";

const ErrorPage = () => {
  return (
    <div className="result-main-div">
      <div className='result-page'>
        <h2 className='result-title error'>
          Access Denied<br></br>
        </h2>
        <p className='result-message'>Bot detected. Access is not allowed.</p>
      </div>
    </div>
  );
};

export default ErrorPage;
