import { motion } from 'framer-motion';
import { useState } from 'react';

function WeatherDisplay({ 
  data, 
  unit, 
  convertTemperature, 
  convertWindSpeed, 
  getWindUnit,
  isFavorite,
  onToggleFavorite,
  uvIndex
}) {
  const [showDetails, setShowDetails] = useState(false);

  if (!data) return null;

  const temperature = convertTemperature(data.main?.temp ?? 0);
  const feelsLike = convertTemperature(data.main?.feels_like ?? 0);
  const unitLabel = unit === 'celsius' ? '°C' : '°F';
  const description = data.weather?.[0]?.description ?? 'Current conditions';
  const icon = data.weather?.[0]?.icon;
  const cityName = data.name;
  const isFav = isFavorite?.(cityName) || false;

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <motion.section 
      className="weather-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="weather-card-header">
        <div>
          <p className="greeting">{getTimeOfDay()} 👋</p>
          <h2>{cityName}</h2>
          <p className="weather-description">{description}</p>
        </div>
        <div className="weather-actions">
          <button 
            className={`favorite-btn ${isFav ? 'active' : ''}`}
            onClick={() => onToggleFavorite?.(cityName)}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFav ? '⭐' : '☆'}
          </button>
        </div>
      </div>

      <div className="weather-main">
        <motion.div 
          className="weather-icon-container"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {icon && (
            <img
              src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
              alt={description}
              width="100"
              height="100"
            />
          )}
        </motion.div>
        <motion.p 
          className="temperature"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {temperature}
          <span>{unitLabel}</span>
        </motion.p>
      </div>

      <motion.button 
        className="details-toggle"
        onClick={() => setShowDetails(!showDetails)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {showDetails ? 'Hide Details ▲' : 'Show Details ▼'}
      </motion.button>

      {showDetails && (
        <motion.dl 
          className="weather-details"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <dt>Feels like</dt>
            <dd>{feelsLike}{unitLabel}</dd>
          </div>
          <div>
            <dt>Humidity</dt>
            <dd>{data.main?.humidity ?? '--'}%</dd>
          </div>
          <div>
            <dt>Wind</dt>
            <dd>{convertWindSpeed?.(data.wind?.speed ?? 0)} {getWindUnit?.() || 'm/s'}</dd>
          </div>
          <div>
            <dt>Pressure</dt>
            <dd>{data.main?.pressure ?? '--'} hPa</dd>
          </div>
          <div>
            <dt>Visibility</dt>
            <dd>{((data.visibility ?? 0) / 1000).toFixed(1)} km</dd>
          </div>
          {uvIndex !== null && (
            <div>
              <dt>UV Index</dt>
              <dd>{uvIndex}</dd>
            </div>
          )}
        </motion.dl>
      )}
    </motion.section>
  );
}

export default WeatherDisplay;