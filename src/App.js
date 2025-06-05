import React, { useState } from 'react';
import './App.css';

function App() {
  // State to store the cat fact from API
  const [fact, setFact] = useState('');

  // To show loading while we fetch the fact
  const [loading, setLoading] = useState(false);

  // To store error message if something goes wrong
  const [error, setError] = useState('');

  // This function gets called when user clicks the button
  const fetchCatFact = async () => {
    setLoading(true); 
    setError('');  

    try {
      const response = await fetch('https://catfact.ninja/fact');
      if (!response.ok) throw new Error('Failed to fetch fact');
      const data = await response.json();
      setFact(data.fact);
    } catch (err) {
      setError('Oops! Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🐱 Random Cat Fact</h1>

      {/* small intro about the assignment */}
      <p className="intro">
        Assignment done by <strong>Devvrath Giri</strong> — generating random cat facts using React and a public API.
      </p>

      {/* button to fetch new cat fact */}
      <button onClick={fetchCatFact} disabled={loading}>
        {loading ? 'Fetching...' : 'Get Cat Fact'}
      </button>

      {/* if there's any error, we show it here */}
      {error && <p className="error">{error}</p>}

      {/* if we have a fact, show it below */}
      {fact && <p className="fact">{fact}</p>}
    </div>
  );
}

export default App;
