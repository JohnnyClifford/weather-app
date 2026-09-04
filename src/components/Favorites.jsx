import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Favorites({ favorites, onSelect, onRemove, currentCity }) {
  const [isOpen, setIsOpen] = useState(false);

  if (favorites.length === 0) {
    return null;
  }

  return (
    <div className="favorites-container">
      <button 
        className="favorites-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle favorites"
      >
        ⭐ Favorites ({favorites.length})
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="favorites-list"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {favorites.map((city) => (
              <motion.div 
                key={city}
                className={`favorite-item ${currentCity === city ? 'active' : ''}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <button 
                  className="favorite-city"
                  onClick={() => {
                    onSelect(city);
                    setIsOpen(false);
                  }}
                >
                  {city}
                </button>
                <button 
                  className="favorite-remove"
                  onClick={() => onRemove(city)}
                  aria-label={`Remove ${city} from favorites`}
                >
                  ✕
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Favorites;