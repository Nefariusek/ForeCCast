import '../style.scss';
import * as sunTime from './sunsetSunriseTime';
import Weather from './weather';
import Search from './Search';
import News from './news'
import {Currency} from './currency'
import {TimeInPlace, creatClockAn} from './time'

let defCity = {
    "country": "PL",
    "name": "Warsaw",
    "lat": "52.22977",
    "lng": "21.01178"
};


const search = new Search("searchForm", "mySelect", "myInput", defCity);
let city = search.getSelectedCity();
let news = new News(city.country, 'en');
let day = 0; // current day, available 0 to 6

// Show info when the user clicks the button
document.getElementById('getText').addEventListener('click', () => {
  sunTime.getSunsetSunrise(city.name, city.country, day);
});

// Default current weather data
let weather = new Weather(city.lat, city.lng);
weather.apiCall(weather.setURL());

news.getNewsByCountry(news.setNewsUrl());

// Variables useing in Time and currency
const wrapTim = document.getElementById("time");
const wrapCu = document.getElementById("currency");
const t = new TimeInPlace();
const currency = new Currency();

t.createTime(city,wrapTim);
currency.createCurrency(city,wrapCu);

//reset
function reset() {
    city = search.getSelectedCity();
    news.getCountry(city.country, 'en');
    sunTime.getSunsetSunrise(city.country, city.name); 
    weather.getCoordinates(city.lat, city.lng);

    t.createTime(city,wrapTim);
    currency.createCurrency(city,wrapCu);
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
creatClockAn(t.currentTime,'.timer1');
creatClockAn(t.inOtherPlace,'.timer2');
setInterval(() => {
    t.countTime();
    t.insertTime(wrapTim);
    creatClockAn(t.currentTime,'.timer1');
    creatClockAn(t.inOtherPlace,'.timer2');
}, 60000); 
