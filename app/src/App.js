import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [features, setFeatures] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        features: features.split(',').map(feature => parseFloat(feature))
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>Enter Features</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={features}
            onChange={e => setFeatures(e.target.value)}
            placeholder="Enter: Age, Sex, INF_ANAM, STENOK_AN, FK_STENOK..."
            style={{ width: '500px' }}
          />
          <button type="submit">Predict</button>
        </form>
        {prediction && <h3>Prediction: {prediction}</h3>}
        <p>Based on the inputted health data, you are not at risk for complications following a heart attack. It is always recommended to reach out to a health-care professional regarding medical advice. </p>
      </header>
    </div>
  );
}

export default App;
