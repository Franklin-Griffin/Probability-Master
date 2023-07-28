import React, { useState } from 'react';
import Fraction from 'fraction.js';
import diceProbability from './p.js';
import './App.css';


const TextAreaForm = () => {
  const [inputText, setInputText] = useState('');
  const [outputData, setOutputData] = useState({});
  const [average, setAverage] = useState(-1);
  const [warning, setWarning] = useState("");

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = () => {
    const result = diceProbability(inputText);
    if (result) {
      setOutputData(result["probabilities"]);
      setAverage(result["average"]);
      setWarning("");
    } else {
      setWarning("Invalid format or request too big.");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior of Enter key in the textarea
      handleSubmit(); // Submit the form when Enter key is pressed
    }
  };

  const decimalToFraction = (decimalValue) => {
    const fraction = new Fraction(decimalValue);
    return fraction.toFraction(true);
  };

  return (
    <div className="container">
      <h1>Probability Master</h1>
      <textarea
        rows="4"
        cols="50"
        value={inputText}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className="textarea"
        placeholder='Example: "d6 2d20 1d4"'
      />
      <p className="warning">{warning}</p>
      <button onClick={handleSubmit} className="submit-button">
        Submit
      </button>
      <p className="note">(enter)</p>
      {Object.keys(outputData).length > 0 && (
        <>
          <h2>Expected Outcome:</h2>
          <h1>{average}</h1>
          <p className="note">This is the mean of the distribution, rounded to the nearest tenth.</p>
          <div className="grid-container">
            {Object.entries(outputData).map(([key, value]) => (
              <div className="grid-item" key={key}>
                <p className="key">{key}:</p>
                <p className="value-decimal">{value}</p>
                <p className="value-fraction">{decimalToFraction(value)}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TextAreaForm;