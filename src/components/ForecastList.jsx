function ForecastList({ data, unit, convertTemperature }) {
  if (!data?.list?.length) {
    return null;
  }

  const unitLabel = unit === 'celsius' ? 'C' : 'F';
  const dailyForecasts = data.list
    .filter((item) => item.dt_txt?.includes('12:00:00'))
    .slice(0, 5);
  const forecasts = dailyForecasts.length ? dailyForecasts : data.list.slice(0, 5);

  return (
    <section className="forecast-section" aria-label="Five day forecast">
      <h2>Forecast</h2>
      <div className="forecast-list">
        {forecasts.map((item) => {
          const date = new Date(item.dt * 1000);
          const icon = item.weather?.[0]?.icon;

          return (
            <article className="forecast-card" key={item.dt}>
              <h3>
                {date.toLocaleDateString(undefined, {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                })}
              </h3>
              {icon && (
                <img
                  src={`https://openweathermap.org/img/wn/${icon}.png`}
                  alt=""
                  width="50"
                  height="50"
                />
              )}
              <p className="forecast-temp">
                {convertTemperature(item.main?.temp ?? 0)}
                {unitLabel}
              </p>
              <p>{item.weather?.[0]?.main ?? 'Weather'}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default ForecastList;
