import '../style.scss';
import * as news from './news';
import * as sunTime from './sunsetSunriseTime';
import Weather from './weather';

let country = 'pl';
let language = 'pl';

//console.log(country,language);
news.getNewsByCountry(country, language);

let city = 'Walbrzych';

// Show info when the user clicks the button
document.getElementById('getText')
.addEventListener('click', () => {
    sunTime.getSunsetSunrise(country, city); 
});

// Default current weather data
let weather = new Weather(51.107883, 17.038538);
weather.apiCall(weather.setURL());
//Current weather data for coordinates from user

document.getElementById('getCoordinates').addEventListener('click', () => {
    weather.getCoordinates();
});


console.log('main.js ready to serve');