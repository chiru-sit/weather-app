import React from 'react';

export default function FutureWeather({
  moreOption,
  setMoreOption,
  futureWeather,
}) {
  const showCurrent = futureWeather.daily.map((day, idx) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dt = new Date(day.dt * 1000);
    const today = days[dt.getDay()];

    if (idx === 0) {
      return (
        <div className="today" id="current-temp">
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="w-icon"
          />
          <div className="other">
            <div className="day">{today}</div>
            <div className="temp">Night - {day.temp.night}&#176;C</div>
            <div className="temp">Day - {day.temp.day}&#176;C</div>
          </div>
        </div>
      );
    }
    return <span></span>;
  });

  const showNext = futureWeather.daily.map((day, idx) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dt = new Date(day.dt * 1000);
    const tomorrow = days[dt.getDay()];

    if (idx !== 0) {
      return (
        <div className="weather-forecast-item">
          <div className="day">{tomorrow}</div>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="w-icon"
          />
          <div className="temp">Night - {day.temp.night}&#176; C</div>
          <div className="temp">Day - {day.temp.day}&#176; C</div>
        </div>
      );
    }
  });

  const handleChanger = () => {
    setMoreOption(true);
  };

  return (
    <div className="future-forecast-container">
      <div className="button">
        <button onClick={handleChanger}>Next weathers</button>
      </div>
      {moreOption ? (
        <>
          <div className="future-forecast">
            {showCurrent}
            <div className="weather-forecast" id="weather-forecast">
              {showNext}
            </div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
