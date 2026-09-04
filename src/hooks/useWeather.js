import { useState, useCallback, useEffect } from 'react';
import { 
  fetchCurrentWeather, 
  fetchForecast, 
  fetchWeatherByCoords,
  fetchUVIndex
} from '../api/weatherApi';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const getFavorites = () => {
  try {
    return JSON.parse(localStorage.getItem('weatherFavorites') || '[]');
  } catch {
    return [];
  }
};

const saveFavorites = (favorites) => {
  localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
};

export function useWeather() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [favorites, setFavorites] = useState(getFavorites);
  const [uvIndex, setUvIndex] = useState(null);
  const [lastSearched, setLastSearched] = useState(null);

  useEffect(() => {
    if (!API_KEY) {
      setError('API key is missing. Please create a .env file with VITE_OPENWEATHER_API_KEY');
    }
  }, []);

  // Fetch weather by city name
  const fetchWeather = useCallback(async (city) => {
    if (!city || !city.trim()) {
      setError('Please enter a city name');
      return;
    }

    if (!API_KEY) {
      setError('API key is missing. Please check your .env file.');
      return;
    }

    setLoading(true);
    setError(null);
    setUvIndex(null);

    try {
      const [weather, forecast] = await Promise.all([
        fetchCurrentWeather(city),
        fetchForecast(city)
      ]);
      
      setWeatherData(weather);
      setForecastData(forecast);
      setLastSearched(city);

      // Get UV index
      if (weather.coord) {
        const uv = await fetchUVIndex(weather.coord.lat, weather.coord.lon);
        setUvIndex(uv);
      }
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch weather by current location
  const fetchWeatherByLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const weather = await fetchWeatherByCoords(latitude, longitude);
          setWeatherData(weather);
          
          const forecast = await fetchForecast(weather.name);
          setForecastData(forecast);
          setLastSearched(weather.name);
          
          const uv = await fetchUVIndex(latitude, longitude);
          setUvIndex(uv);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        setError('Unable to access your location. Please enter a city manually.');
        setLoading(false);
      }
    );
  }, []);

  const addFavorite = useCallback((city) => {
    if (!favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      saveFavorites(newFavorites);
    }
  }, [favorites]);

  const removeFavorite = useCallback((city) => {
    const newFavorites = favorites.filter(c => c !== city);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  }, [favorites]);

  const isFavorite = useCallback((city) => {
    return favorites.includes(city);
  }, [favorites]);

  const loadFavorite = useCallback((city) => {
    fetchWeather(city);
  }, [fetchWeather]);

  const toggleUnit = useCallback(() => {
    setUnit(prev => prev === 'celsius' ? 'fahrenheit' : 'celsius');
  }, []);

  // Temperature conversion
  const convertTemperature = useCallback((celsius) => {
    if (celsius === undefined || celsius === null) return '--';
    if (unit === 'fahrenheit') {
      return Math.round((celsius * 9/5) + 32);
    }
    return Math.round(celsius);
  }, [unit]);

  // Wind speed conversion
  const convertWindSpeed = useCallback((mps) => {
    if (unit === 'fahrenheit') {
      return Math.round(mps * 2.237); 
    }
    return Math.round(mps);
  }, [unit]);

  const getWindUnit = useCallback(() => {
    return unit === 'fahrenheit' ? 'mph' : 'm/s';
  }, [unit]);

  return {
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
  };
}
