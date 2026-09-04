import { useEffect } from 'react';
import { useWeather } from './hooks/useWeather';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastList from './components/ForecastList';
import UnitToggle from './components/UnitToggle';
import Favorites from './components/Favorites';
import ErrorBoundary from './components/ErrorBoundary';
import WeatherBackground from './components/WeatherBackground';
import './styles/App.css';

function App() {
  const { 
    weatherData, 
    forecastData, 
    loading, 
    error, 
    fetchWeather,
    fetchWeatherByLocation,
    unit,
    toggleUnit,
    convertTemperature,
    convertWindSpeed,
    getWindUnit,
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    loadFavorite,
    uvIndex,
    lastSearched
  } = useWeather();

  // Load default city 
  useEffect(() => {
    if (!weatherData && !loading) {
      const lastCity = localStorage.getItem('lastSearchedCity');
      if (lastCity) {
        fetchWeather(lastCity);
      } else {
        fetchWeather('London');
      }
    }
  }, []);

  // Save last searched city
  useEffect(() => {
    if (lastSearched) {
      localStorage.setItem('lastSearchedCity', lastSearched);
    }
  }, [lastSearched]);

  const handleSearch = (city) => {
    fetchWeather(city);
  };

  const weatherCondition = weatherData?.weather?.[0]?.main || '';

  return (
    <ErrorBoundary>
      <WeatherBackground condition={weatherCondition}>
        <div className="app">
          <header className="app-header">
            <div className="header-left">
              <h1>🌤️ Weather</h1>
              <Favorites 
                favorites={favorites}
                onSelect={loadFavorite}
                onRemove={removeFavorite}
                currentCity={weatherData?.name}
              />
            </div>
            <div className="header-controls">
              <button 
                className="location-btn" 
                onClick={fetchWeatherByLocation}
                aria-label="Get weather for my location"
                disabled={loading}
              >
                📍
              </button>
              <UnitToggle unit={unit} onToggle={toggleUnit} />
            </div>
          </header>

          <main>
            <SearchBar 
              onSearch={handleSearch} 
              loading={loading}
            />
            
            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                <span className="error-text">{error}</span>
                <button 
                  className="error-close" 
                  onClick={() => window.location.reload()}
                  aria-label="Dismiss error"
                >
                  ✕
                </button>
              </div>
            )}

            {loading && (
              <div className="loading-container">
                <div className="loader"></div>
                <p>Fetching weather data...</p>
              </div>
            )}

            {weatherData && !loading && !error && (
              <>
                <WeatherDisplay 
                  data={weatherData} 
                  unit={unit}
                  convertTemperature={convertTemperature}
                  convertWindSpeed={convertWindSpeed}
                  getWindUnit={getWindUnit}
                  isFavorite={isFavorite}
                  onToggleFavorite={addFavorite}
                  uvIndex={uvIndex}
                />

                {forecastData && (
                  <ForecastList 
                    data={forecastData} 
                    unit={unit}
                    convertTemperature={convertTemperature}
                  />
                )}
              </>
            )}
          </main>

          <footer>
            <p>🌍 Powered by OpenWeatherMap API</p>
            <p className="footer-note">
              {weatherData?.name && `Last updated: ${new Date().toLocaleTimeString()}`}
            </p>
          </footer>
        </div>
      </WeatherBackground>
    </ErrorBoundary>
  );
}

export default App;