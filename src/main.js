import '../style.scss';
import Weather from './weather';
import Search from './Search';
import News from './news';
import AstronomyForecast from './astronomyForecast.js';
import { getUserLocation } from './userLocation';
import Forecast from './forecast';
import map from './map/map';
import { Currency } from './currency';
import { TimeInPlace, creatClockAn } from './time';

let defCity = {
  country: 'PL',
  name: 'Warsaw',
  lat: '52.22977',
  lng: '21.01178',
};

const search = new Search('searchForm', 'mySelect', 'myInput', defCity);
let city = search.getSelectedCity();
let news = new News(city.country, 'en');
let day = 0; // 0 - current day
let astronomyForecast = new AstronomyForecast(city.name, day);

//init map
map.initMap();
document.getElementById('world-map').addEventListener('click', () => {
  if (map.flag) {
    search.setCountry(map.country);
    map.flag = false;
  }
});
document.getElementById('world-map').hidden = true;

// Default current weather data
let weather = new Weather(city.lat, city.lng);
weather.apiCall(weather.setURL());

let forecast = new Forecast(city.lat, city.lng);
forecast.apiCall(forecast.setURL());

news.getNewsByCountry(news.setNewsUrl());
astronomyForecast.getAstronomyForecast(astronomyForecast.setUrl());
astronomyForecast.buttonStyle();

// Variables useing in Time and currency
const wrapTim = document.getElementById('time');
const wrapCu = document.getElementById('currency');
const t = new TimeInPlace();
const currency = new Currency();

t.createTime(city, wrapTim);
currency.createCurrency(city, wrapCu);

// // Show info when the user clicks the button
// document.getElementById('getText')
// .addEventListener('click', () => {
//     sunTime.getSunsetSunrise(city.country, city.name);
// });

getUserLocation()
  .then(data => {
    let c = search.getCityByName(...data);
    if (c !== null) {
      search.setCity(c);
      city = c;
      reset(city);
    }
  })
  .catch(err => {});

//reset
function reset(city) {
  news.getCountry(city.country, 'en');
  weather.getCoordinates(city.lat, city.lng);
  forecast.getCoordinates(city.lat, city.lng);
  astronomyForecast.getCity(city.name, day);

  t.createTime(city, wrapTim);
  currency.createCurrency(city, wrapCu);
}

document.getElementById('myInput').addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    city = search.getSelectedCity();
    reset(city);
  }
});

document.getElementById('sugestion').addEventListener('click', function() {
  city = search.getSelectedCity();
  reset(city);
});

document.getElementById('previousDay').addEventListener('click', function() {
  if (day > 0) {
    day--;
    reset(city);
  }
});

document.getElementById('nextDay').addEventListener('click', function() {
  if (day < 7) {
    day++;
    reset(city);
  }
});

console.log('main.js ready to serve');
creatClockAn(t.currentTime, '.timer1');
creatClockAn(t.inOtherPlace, '.timer2');
setInterval(() => {
  t.countTime();
  t.insertTime(wrapTim);
  creatClockAn(t.currentTime, '.timer1');
  creatClockAn(t.inOtherPlace, '.timer2');
}, 60000);
