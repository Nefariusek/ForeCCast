import '../style.scss';
import Weather from './weather';
import Search from './Search';
import News from './news'
import AstronomyForecast from './astronomyForecast.js';

let defCity = {
    "country": "PL",
    "name": "Warsaw",
    "lat": "52.22977",
    "lng": "21.01178"
};

const search = new Search("searchForm", "mySelect", "myInput", defCity);
let city = search.getSelectedCity();
let news = new News(city.country, 'en');
let astronomyForecast = new AstronomyForecast(city.name, 0);

// Default current weather data
let weather = new Weather(city.lat, city.lng);
weather.apiCall(weather.setURL());

news.getNewsByCountry(news.setNewsUrl());
astronomyForecast.getAstronomyForecast(astronomyForecast.setUrl());
// // Show info when the user clicks the button
// document.getElementById('getText')
// .addEventListener('click', () => {
//     sunTime.getSunsetSunrise(city.country, city.name); 
// });


//reset
function reset() {
    city = search.getSelectedCity();
    news.getCountry(city.country, 'en');
    weather.getCoordinates(city.lat, city.lng);
    astronomyForecast.getCity(city.name, 0);
}

document.getElementById("myInput").addEventListener("keydown", function(event){
    if(event.keyCode === 13){
        reset();
    }
})

document.getElementById("sugestion").addEventListener("click", function(){
        reset();
})

console.log('main.js ready to serve');
