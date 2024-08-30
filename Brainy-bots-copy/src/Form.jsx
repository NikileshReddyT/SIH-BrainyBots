// src/Form.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import uidai from "../public/pngegg.png"
import "./Form.css"; // Import the CSS for styling

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [hiddenData, setHiddenData] = useState(""); // State for hidden input
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setInputValue(e.target.value);
  };

  const handleHiddenInputChange = (e) => {
    setHiddenData(e.target.value); // Update hidden input value
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(hiddenData);
    // Check if hidden input is filled (honeypot check)
    if (hiddenData.trim() !== "") {
      navigate("/error"); // Redirect to error page if hidden input is filled
      return;
    }

    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // Time in seconds
    const wordsTyped = inputValue.trim().split(/\s+/).length; // Split on whitespace
    const wpm = (wordsTyped / timeTaken) * 60; // Calculate words per minute

    if (wpm > 80) {
      // If typing speed is over 80 wpm, assume it's a bot
      navigate("/error"); // Redirect to error page
    } else {
      navigate("/success"); // Redirect to success page
    }
  };

  return (
    <div className='form-container'>
      <img src={uidai} alt='uidai image' className="uidai-logo" />
      <h1>Aadhar Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Aadhar Number :
          <input
            type='text'
            name='userInput' // Added name attribute
            required
            value={inputValue}
            onChange={handleInputChange}
          />
          {/* Honeypot input: hidden field */}
          <input
            type='text'
            name='hiddenInput' // Added name attribute
            hidden
            value={hiddenData}
            onChange={handleHiddenInputChange}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Form;
