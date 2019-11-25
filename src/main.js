import '../style.scss';
import * as sunTime from './sunsetSunriseTime';
import Weather from './weather';
import Search from './Search';
import News from './news'

let defCity = {
    "country": "PL",
    "name": "Warsaw",
    "lat": "52.22977",
    "lng": "21.01178"
};


const search = new Search("searchForm", "mySelect", "myInput", defCity);
let city = search.getSelectedCity();
let news = new News(city.country, 'en');


// Default current weather data
let weather = new Weather(city.lat, city.lng);
weather.apiCall(weather.setURL());

news.getNewsByCountry(news.setNewsUrl());
sunTime.getSunsetSunrise(city.country, city.name); 

// // Show info when the user clicks the button
// document.getElementById('getText')
// .addEventListener('click', () => {
//     sunTime.getSunsetSunrise(city.country, city.name); 
// });


//reset
function reset() {
    city = search.getSelectedCity();
    news.getCountry(city.country, 'en');
    sunTime.getSunsetSunrise(city.country, city.name); 
    weather.getCoordinates(city.lat, city.lng);
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