// Format date from timestamp
export const formatDate = (timestamp, options = {}) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    ...options
  });
};

export const formatTime = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getWeatherEmoji = (condition) => {
  const conditions = condition?.toLowerCase() || '';
  
  if (conditions.includes('clear')) return '☀️';
  if (conditions.includes('cloud')) return '☁️';
  if (conditions.includes('rain')) return '🌧️';
  if (conditions.includes('drizzle')) return '🌦️';
  if (conditions.includes('thunder') || conditions.includes('storm')) return '⛈️';
  if (conditions.includes('snow')) return '❄️';
  if (conditions.includes('mist') || conditions.includes('fog')) return '🌫️';
  return '🌤️';
};

export const getWeatherBackground = (condition) => {
  const conditions = condition?.toLowerCase() || '';
  
  if (conditions.includes('clear') || conditions.includes('sunny')) {
    return 'weather-bg-clear';
  } else if (conditions.includes('cloud')) {
    return 'weather-bg-clouds';
  } else if (conditions.includes('rain') || conditions.includes('drizzle')) {
    return 'weather-bg-rain';
  } else if (conditions.includes('snow')) {
    return 'weather-bg-snow';
  } else if (conditions.includes('thunder') || conditions.includes('storm')) {
    return 'weather-bg-storm';
  } else if (conditions.includes('mist') || conditions.includes('fog')) {
    return 'weather-bg-mist';
  } else {
    return 'weather-bg-default';
  }
};

export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

export const capitalizeWords = (str) => {
  if (!str) return '';
  return str.split(' ').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

export const getWindDirection = (degrees) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(degrees / 45) % 8;
  return directions[index];
};

export const getUVDescription = (uvIndex) => {
  if (uvIndex === null || uvIndex === undefined) return '--';
  if (uvIndex <= 2) return 'Low (0-2)';
  if (uvIndex <= 5) return 'Moderate (3-5)';
  if (uvIndex <= 7) return 'High (6-7)';
  if (uvIndex <= 10) return 'Very High (8-10)';
  return 'Extreme (11+)';
};

export const sanitizeCity = (city) => {
  return city?.trim()?.replace(/[<>]/g, '') || '';
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};