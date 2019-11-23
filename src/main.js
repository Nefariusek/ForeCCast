import '../style.scss';
import * as news from './news';
import * as sunTime from './sunsetSunriseTime';
import Weather from './weather';
import Search from './Search';

let defCity = {
    "country": "PL",
    "name": "Warsaw",
    "lat": "52.22977",
    "lng": "21.01178"
};

const search = new Search("mySelect", "myInput", defCity);

let city = search.getSelectedCity();

// let country = 'pl';
let language = 'pl';

//console.log(country,language);
news.getNewsByCountry(city.country, language);


// Show info when the user clicks the button
document.getElementById('getText')
.addEventListener('click', () => {
    sunTime.getSunsetSunrise(city.country, city); 
});

// Default current weather data
let weather = new Weather(city.lat, city.lng);
weather.apiCall(weather.setURL());
//Current weather data for coordinates from user

document.getElementById('getCoordinates').addEventListener('click', () => {
    weather.getCoordinates();
});


console.log('main.js ready to serve');