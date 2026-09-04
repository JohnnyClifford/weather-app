import { motion } from 'framer-motion';

function WeatherBackground({ condition, children }) {
  const getBackground = (cond) => {
    const conditions = cond?.toLowerCase() || '';
    
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

  // Animated particles for specific weather
  const renderParticles = (cond) => {
    const conditions = cond?.toLowerCase() || '';
    
    if (conditions.includes('rain') || conditions.includes('drizzle')) {
      return (
        <div className="rain-particles">
          {[...Array(30)].map((_, i) => (
            <div 
              key={i} 
              className="rain-drop"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${0.5 + Math.random() * 0.5}s`
              }}
            />
          ))}
        </div>
      );
    }
    
    if (conditions.includes('snow')) {
      return (
        <div className="snow-particles">
          {[...Array(40)].map((_, i) => (
            <div 
              key={i} 
              className="snowflake"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                width: `${4 + Math.random() * 8}px`,
                height: `${4 + Math.random() * 8}px`
              }}
            />
          ))}
        </div>
      );
    }
    
    return null;
  };

  return (
    <motion.div 
      className={`weather-background ${getBackground(condition)}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {renderParticles(condition)}
      {children}
    </motion.div>
  );
}

export default WeatherBackground;