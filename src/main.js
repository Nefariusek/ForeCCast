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

const search = new Search("searchForm", "mySelect", "myInput", defCity);
let city = search.getSelectedCity();
// let country = 'pl';
let language = 'pl';

// Default current weather data
let weather = new Weather(city.lat, city.lng);
weather.apiCall(weather.setURL());

news.getNewsByCountry(city.country, language);
sunTime.getSunsetSunrise(city.country, city.name); 
weather.getCoordinates(city.lat, city.lng);

// // Show info when the user clicks the button
// document.getElementById('getText')
// .addEventListener('click', () => {
//     sunTime.getSunsetSunrise(city.country, city.name); 
// });


//Current weather data for coordinates from user

// document.getElementById('getCoordinates').addEventListener('click', () => {
//     weather.getCoordinates(city.lat, city.lng);
// });


//reset
function reset() {
    city = search.getSelectedCity();
    news.getNewsByCountry(city.country, language);
    sunTime.getSunsetSunrise(city.country, city.name); 
    weather.getCoordinates(city.lat, city.lng);
}

document.getElementById("myInput").addEventListener("keydown", function(event){
    if(event.keyCode === 13){
        reset();
    }
})

console.log('main.js ready to serve');