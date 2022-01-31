import axios from 'axios';
import { useState } from 'react';
import Futureweather from './Futureweather';

// open weather api details

const api = {
  key: '8bdf7c688075275b9896b8c4a6077652',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [moreOption, setMoreOption] = useState(false);
  const [weather, setWeather] = useState({});
  const [futureWeather, setFutureWeather] = useState({});

  const search = (e) => {
    if (e.key === 'Enter') {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => {
          setWeather(res.data);
          setQuery('');
          setMoreOption(false);
          console.log(res.data);
          return axios.get(
            `${api.base}onecall?lat=${res.data.coord.lat}&lon=${res.data.coord.lon}&exclude=minutely,hourly&units=metric&appid=${api.key}`
          );
        })
        .then((res) => {
          console.log(res.data);
          setFutureWeather(res.data);
        })
        .catch((err) => {
          if (err.message === 'Network Error')
            alert('Please check your Network⛔');
          else alert('No such location found 🙄');
          console.log(err.message);
        });
    }
  };

  // setting up data object for display
  const dateBuilder = (d) => {
    let months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != 'undefined'
          ? `app ${weather.weather[0].main} `
          : 'app'
      }
    >
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            type="text"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div className="container">
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
            {typeof futureWeather.current != 'undefined' ? (
              <Futureweather
                moreOption={moreOption}
                setMoreOption={setMoreOption}
                futureWeather={futureWeather}
              />
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className="minimum">Weather App</div>
        )}
      </main>
    </div>
  );
}

export default App;
