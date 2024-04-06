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
            placeholder="Enter features separated by commas"
          />
          <button type="submit">Predict</button>
        </form>
        {prediction && <h3>Prediction: {prediction}</h3>}
      </header>
    </div>
  );
}

export default App;
