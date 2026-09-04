function UnitToggle({ unit, onToggle }) {
  const isCelsius = unit === 'celsius';

  return (
    <button className="unit-toggle" type="button" onClick={onToggle}>
      {isCelsius ? 'C' : 'F'}
    </button>
  );
}

export default UnitToggle;
