import { useState, useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce';

function SearchBar({ onSearch, loading, onCitySelect }) {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedValue = useDebounce(value, 300);

  useEffect(() => {
    if (debouncedValue && debouncedValue.length > 1) {
      setShowSuggestions(false);
    } else {
      setSuggestions([]);
    }
  }, [debouncedValue]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
      setShowSuggestions(false);
    }
  };

  const handleCitySelect = (city) => {
    setValue(city);
    onSearch(city);
    setShowSuggestions(false);
    if (onCitySelect) onCitySelect(city);
  };

  return (
    <div className="search-wrapper">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="search"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search for a city..."
          aria-label="Search for a city"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? '⏳' : '🔍'}
        </button>
      </form>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="search-suggestions">
          {suggestions.map((city) => (
            <button 
              key={`${city.name}-${city.country}`}
              onClick={() => handleCitySelect(city.name)}
              className="suggestion-item"
            >
              {city.name}, {city.country}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;