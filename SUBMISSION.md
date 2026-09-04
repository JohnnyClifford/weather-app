# Weather Forecasting App - Assignment Submission

## 📋 Submission Information

- **Student Name**: Johnny Clifford
- **GitHub Repository**: https://github.com/JohnnyClifford/weather-app
- **Live Demo**: https://johnnys-weather.netlify.app
- **Date**: September 4, 2026

## ✨ Features Implemented

### Required Features
- ✅ OpenWeatherMap API integration
- ✅ Current weather display (temperature, humidity, wind speed, pressure)
- ✅ 5-day weather forecast
- ✅ City search functionality
- ✅ Celsius/Fahrenheit toggle
- ✅ Responsive design
- ✅ Error handling for invalid input and API failures

### Additional Features (Bonus)
- ✅ Current location detection (Geolocation API)
- ✅ Favorites management with localStorage persistence
- ✅ UV Index display
- ✅ Dynamic weather backgrounds with color gradients
- ✅ Rain and snow particle animations
- ✅ Framer Motion animations
- ✅ Accessibility features (ARIA labels, semantic HTML)
- ✅ Debounced search input
- ✅ Error Boundary component

## 📂 Code Organization
src/
├── api/weatherApi.js # API integration with error handling
├── components/ # Reusable React components
│ ├── ErrorBoundary.jsx
│ ├── Favorites.jsx
│ ├── ForecastList.jsx
│ ├── SearchBar.jsx
│ ├── UnitToggle.jsx
│ ├── WeatherBackground.jsx
│ └── WeatherDisplay.jsx
├── hooks/ # Custom React hooks
│ ├── useDebounce.js
│ └── useWeather.js
├── styles/App.css # Global styles
├── App.jsx # Main app component
└── main.jsx # Entry point


## 🛠️ Technical Implementation

- **State Management**: Custom `useWeather` hook with useState and useCallback
- **API Integration**: Async/await with error handling for all API calls
- **Styling**: CSS3 with CSS variables and mobile-first responsive design
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite for fast development and optimized production builds

## 🧪 Error Handling

The app handles errors for:
- Invalid city names (404)
- Invalid API keys (401)
- Network failures
- Rate limiting (429)
- Geolocation permission denied
- Missing API key

## ✅ Testing Done

- [x] Search functionality works
- [x] Location detection works
- [x] Unit toggle works
- [x] Favorites persist in localStorage
- [x] 5-day forecast displays correctly
- [x] Responsive on mobile, tablet, and desktop
- [x] Error messages display appropriately
- [x] No console errors or warnings

## 🚀 Deployment

- **Platform**: Netlify
- **URL**: https://johnnys-weather.netlify.app
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

## 💡 Challenges & Solutions

1. **Git Push Error (HTTP 400)**
   - **Problem**: Repository too large with node_modules
   - **Solution**: Added proper .gitignore and removed package-lock.json from tracking

2. **API Key Security**
   - **Problem**: API key exposed in code
   - **Solution**: Moved to .env file with Vite environment variables

3. **Forecast Data Filtering**
   - **Problem**: API returns 3-hour intervals, need daily forecast
   - **Solution**: Filter data list for noon entries (12:00:00)
