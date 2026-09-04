// src/components/ApiTest.jsx
import { useState, useEffect } from 'react';

export function ApiTest() {
  const [status, setStatus] = useState('testing');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
    
    if (!apiKey) {
      setStatus('error');
      setMessage('❌ API Key not found! Check your .env file');
      return;
    }

    if (apiKey.length < 10) {
      setStatus('error');
      setMessage('❌ API Key seems too short. Did you copy it correctly?');
      return;
    }

    // Test the API with a simple request
    const testApi = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}`
        );
        
        if (response.ok) {
          setStatus('success');
          setMessage('✅ API Key is working! Weather data can be fetched.');
        } else if (response.status === 401) {
          setStatus('error');
          setMessage('❌ Invalid API Key. Please check your key and try again.');
        } else {
          setStatus('warning');
          setMessage('⚠️ API Key exists but there might be issues. Status: ' + response.status);
        }
      } catch (error) {
        setStatus('error');
        setMessage('❌ Network error: ' + error.message);
      }
    };

    testApi();
  }, []);

  return (
    <div className={`api-test ${status}`}>
      <h3>API Status</h3>
      <p>{message}</p>
      {status === 'success' && <span>🎉 Ready to use!</span>}
      {status === 'error' && <button onClick={() => window.location.reload()}>Retry</button>}
    </div>
  );
}