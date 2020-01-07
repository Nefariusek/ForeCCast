const forecastConditions = document.querySelector('#forecast');

class Forecast {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    this.forecastConditions = forecastConditions;
  }
  //set lat value
  setLat(value) {
    return (this.lat = value);
  }
  //set lon value
  setLon(value) {
    return (this.lon = value);
  }

  //set coordinates value
  getCoordinates(lat, lng) {
    this.setLat(lat);
    this.setLon(lng);
    this.forecastConditions.innerHTML = '';
    return this.apiCall(this.setURL());
  }
  // set URL address for API call
  setURL() {
    let forecastApiKey = 'f051a3a6eaeb0d3041fa073c40a73a0c';
    let forecastApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&units=metric&APPID=${forecastApiKey}`;
    return forecastApiURL;
  }

  //get date info
  getDate(array, i) {
    let divDate;
    divDate = document.createElement('div');
    divDate.className = `date p-1 flex-fill`;
    divDate.innerHTML = `<div class="d-flex justify-content-center">${array[i].dt_txt.slice(0, 16)}</div>`;
    return divDate;
  }

  //get weather icon
  getIconWeather(array, i) {
    let divIconWeather;
    divIconWeather = document.createElement('div');
    divIconWeather.className = `icon p-1 flex-fill`;
    divIconWeather.innerHTML = `<div class="d-flex justify-content-center"><img style = "max-width:65px; max-height:65px;" src='http://openweathermap.org/img/wn/${array[i].weather[0].icon}@2x.png'> <br></div>`;
    return divIconWeather;
  }

  //get weather icon description
  getIconWeatherDescription(array, i) {
    let divIconWeatherDescription;
    divIconWeatherDescription = document.createElement('div');
    divIconWeatherDescription.className = `description p-1 flex-fill`;
    divIconWeatherDescription.innerHTML = `<div class="d-flex justify-content-center">${array[i].weather[0].description}</div>`;
    return divIconWeatherDescription;
  }

  //get temp info
  getTemp(array, i) {
    let divTemp;
    divTemp = document.createElement('div');
    divTemp.className = `temp p-1 flex-fill`;
    divTemp.innerHTML = `<div class="d-flex justify-content-center">${array[i].main.temp} °C</div>`;
    return divTemp;
  }

  //get pressure info
  getPressure(array, i) {
    let divPressure;
    divPressure = document.createElement('div');
    divPressure.className = `pressure p-1 flex-fill`;
    divPressure.innerHTML = `<div class="d-flex justify-content-center">${array[i].main.pressure} hPa</div>`;
    return divPressure;
  }

  //get humidity info
  getHumidity(array, i) {
    let divHumidity;
    divHumidity = document.createElement('div');
    divHumidity.className = `humidity p-1 flex-fill`;
    divHumidity.innerHTML = `<div class="d-flex justify-content-center">${array[i].main.humidity} %</div>`;
    return divHumidity;
  }

  //get wind value info
  getWind(array, i) {
    let divWind;
    divWind = document.createElement('div');
    divWind.className = `wind p-1 flex-fill`;
    divWind.innerHTML = `<div class="d-flex justify-content-center">${array[i].wind.speed} m/s</div>`;
    return divWind;
  }

  //get wind direction info
  getWindDirection(array, i) {
    let divWindDirection;
    divWindDirection = document.createElement('div');
    divWindDirection.className = `windDirection p-1 flex-fill`;
    divWindDirection.innerHTML = `<div class="d-flex justify-content-center"><img style = "transform:rotate(${array[i].wind.deg}deg); max-width:40px; max-height:40px;" src='./src/wind_arrow/arrow.png'></div>`;
    return divWindDirection;
  }

  getForecast(array) {
    let divDay;
    for (let i = 0; array.length; i++) {
      divDay = document.createElement('div');
      if (i === 0) {
        divDay.className = 'day d-flex flex-row flex-wrap justify-content-center align-items-center';
      } else {
        divDay.className = 'day d-flex flex-row flex-wrap justify-content-center align-items-center';
      }
      divDay.insertBefore(this.getDate(array, i), null);
      divDay.insertBefore(this.getIconWeather(array, i), null);
      divDay.insertBefore(this.getIconWeatherDescription(array, i), null);
      divDay.insertBefore(this.getTemp(array, i), null);
      divDay.insertBefore(this.getPressure(array, i), null);
      divDay.insertBefore(this.getHumidity(array, i), null);
      divDay.insertBefore(this.getWind(array, i), null);
      divDay.insertBefore(this.getWindDirection(array, i), null);
      forecastConditions.appendChild(divDay);
    }
  }

  //sending API call
  apiCall(setURL) {
    fetch(setURL)
      .then(res => res.json())
      .then(data => data.list)
      .then(array => {
        this.getForecast(array);
      })
      .catch(err => console.log(err));
  }
}

export default Forecast;
