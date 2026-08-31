const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
);