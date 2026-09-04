const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  console.error('❌ OpenWeatherMap API key is missing!');
  console.error('Please create a .env file with VITE_OPENWEATHER_API_KEY=your_key');
}

export const fetchCurrentWeather = async (city) => {
  if (!API_KEY) throw new Error('API key is not configured');
  
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Invalid API key. Please check your .env file.');
      } else if (response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling.`);
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please wait a moment.');
      } else {
        throw new Error(`Failed to fetch weather data (Status: ${response.status})`);
      }
    }
    
    const data = await response.json();
    
    if (!data || !data.main || !data.weather) {
      throw new Error('Invalid weather data received');
    }
    
    return data;
  } catch (error) {
    console.error('Weather API Error:', error.message);
    throw error;
  }
};

export const fetchForecast = async (city) => {
  if (!API_KEY) throw new Error('API key is not configured');
  
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found for forecast`);
      }
      throw new Error('Failed to fetch forecast data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Forecast API Error:', error.message);
    throw error;
  }
};

export const fetchWeatherByCoords = async (lat, lon) => {
  if (!API_KEY) throw new Error('API key is not configured');
  
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch weather data for your location');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Location Weather Error:', error.message);
    throw error;
  }
};

export const searchCities = async (query) => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(
      `${BASE_URL}/find?q=${encodeURIComponent(query)}&type=like&sort=population&cnt=5&appid=${API_KEY}`
    );
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.list?.map(city => ({
      name: city.name,
      country: city.sys?.country || '',
      id: city.id
    })) || [];
  } catch (error) {
    console.error('City search error:', error.message);
    return [];
  }
};

export const fetchUVIndex = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    
    if (!response.ok) return null;
    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error('UV Index error:', error.message);
    return null;
  }
};