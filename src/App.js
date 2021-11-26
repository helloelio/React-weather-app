import React, { useState } from 'react';
import './App.css';
import WindIcon from './assets/background/wind.svg';
const api = {
  key: '20f515d131e439bc4ca34b669f531518',
  base: 'https://api.openweathermap.org/data/2.5/',
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState('');

  const search = (event) => {
    if (event.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

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

  let dayTime = new Date();
  let currentHour = dayTime.getHours();

  let currentTime = '';
  if (currentHour > 16) {
    currentTime = 'night';
  } else {
    currentTime = 'day';
  }

  return (
    <div className={`App ${currentTime}`}>
      <main
        className={
          typeof weather.main != 'undefined' ? `${weather.weather[0].main}` : ``
        }
      >
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Write..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined' ? (
          <div className="weather-box">
            {' '}
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°C
                <div className="temp-feels">
                  Feels like: {Math.round(weather.main.feels_like)}
                </div>
              </div>
              <div className="wind">
                <img src={WindIcon} alt="" />
                {Math.round(weather.wind.speed)} m/s
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          <div className="home-page">Weather App</div>
        )}
      </main>
    </div>
  );
}

export default App;
