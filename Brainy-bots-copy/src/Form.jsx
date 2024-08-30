// src/Form.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Form.css"; // Import the CSS for styling

const Form = () => {
  const [inputValue, setInputValue] = useState("");
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleInputChange = (e) => {
    if (!startTime) {
      setStartTime(Date.now());
    }
    setInputValue(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const endTime = Date.now();
    const timeTaken = (endTime - startTime) / 1000; // time in seconds
    const wordsTyped = inputValue.trim().split(/\s+/).length; // Split on whitespace
    const wpm = (wordsTyped / timeTaken) * 60; // calculate words per minute

    if (wpm > 80) {
      // If typing speed is over 80 wpm, assume it's a bot
      navigate("/error"); // Redirect to error page
    } else {
      navigate("/success"); // Redirect to success page
    }
  };

  return (
    <div className="form-container">
      <h1>Bot Detection Form</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter something:
          <input
            type="text"
            required
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
