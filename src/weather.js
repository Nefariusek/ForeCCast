import clearSrc from '../src/bg_img/clear.jpg';
import drizzleSrc from '../src/bg_img/drizzle.jpg';
import dustSrc from '../src/bg_img/dust.jpg';
import few_cloudsSrc from '../src/bg_img/few_clouds.jpg';
import fogSrc from '../src/bg_img/fog.jpg';
import overcast_cloudsSrc from '../src/bg_img/overcast_clouds.jpg';
import rainSrc from '../src/bg_img/rain.jpg';
import snowSrc from '../src/bg_img/snow.jpg';
import thunderstormSrc from '../src/bg_img/thunderstorm.jpg';
import tornadoSrc from '../src/bg_img/tornado.jpg';

const weatherConditions = document.querySelector('#weather');
const backgroundChange = document.querySelector('body');

class Weather {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    this.backgroundPicture = clearSrc;
  }
  //set lat value
  setLat(value) {
    return (this.lat = value);
  }
  //set lon value
  setLon(value) {
    return (this.lon = value);
  }
  //background picture change
  setBackgroundPicture(weatherConditionId) {
    switch (weatherConditionId) {
      case weatherConditionId >= 200 && weatherConditionId <= 232:
        this.backgroundPicture = thunderstormSrc;
        break;
      case weatherConditionId >= 300 && weatherConditionId <= 321:
        this.backgroundPicture = drizzleSrc;
        break;
      case weatherConditionId >= 500 && weatherConditionId <= 531:
        this.backgroundPicture = rainSrc;
        break;
      case weatherConditionId >= 600 && weatherConditionId <= 622:
        this.backgroundPicture = snowSrc;
        break;
      case 701 || 711 || 721 || 741:
        this.backgroundPicture = fogSrc;
        break;
      case 800:
        this.backgroundPicture = clearSrc;
        break;
      case 801:
        this.backgroundPicture = few_cloudsSrc;
        break;
      case 781 || 771:
        this.backgroundPicture = tornadoSrc;
        break;
      case 761 || 751 || 731:
        this.backgroundPicture = dustSrc;
        break;
      case weatherConditionId > 801 && weatherConditionId <= 804:
        this.backgroundPicture = overcast_cloudsSrc;
        break;
      default:
        this.backgroundPicture = clearSrc;
        break;
    }

    return this.backgroundPicture;
  }
  //set coordinates value
  getCoordinates(lat, lng) {
    this.setLat(lat);
    this.setLon(lng);
    return this.apiCall(this.setURL());
  }
  // set URL address for API call
  setURL() {
    let weatherApiKey = '47f83ac09c8aba4209901acd619fdb03';
    let weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&APPID=${weatherApiKey}`;
    return weatherApiURL;
  }

  //sending API call
  apiCall(setURL) {
    fetch(setURL)
      .then(res => res.json())
      .then(data => {
        weatherConditions.innerHTML = `<div class="weather row"><div class="col"><img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'></div>
            <div class="col">Temperature: ${data.main.temp}°C</div>
            <div class="col">Pressure: ${data.main.pressure}hPa</div> 
            <div class="col">Humidity: ${data.main.humidity}%</div>
            <div class="col">Wind: ${data.wind.speed}km/h</div>
            <div class="col"><img style = "width:55%; transform:rotate(${data.wind.deg}deg);" src='./src/wind_arrow/arrow.png'></div></div>
           `;
        backgroundChange.style.background = `url(${this.setBackgroundPicture(data.weather[0].id)}) center fixed`;
      });
  }
}

export default Weather;
