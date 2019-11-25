import '../style.scss';
import * as sunTime from './sunsetSunriseTime';
import Weather from './weather';
import Search from './Search';
import News from './news'
import {initCurrency, getConvertedCurrency} from './currency'
import {TimeInPlace, getTimeZone} from './time'

let defCity = {
    "country": "PL",
    "name": "Warsaw",
    "lat": "52.22977",
    "lng": "21.01178"
};


const search = new Search("searchForm", "mySelect", "myInput", defCity);
let city = search.getSelectedCity();
let news = new News(city.country, 'en');
let city = 'Wroclaw';
let day = 0; // current day, available 0 to 6

// Show info when the user clicks the button
document.getElementById('getText').addEventListener('click', () => {
  sunTime.getSunsetSunrise(city, country, day);
});

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


function insertCurrency(warp,cName,cCode,cSymbol,convertedC){
    wrap.innerHTML = `<h3>Currency in searching city:</h3>
    <b>${cName}</b>: 1 ${cCode}[1 ${cSymbol}]
    <b>${convertedC.currency_name}</b> ${convertedC.rate}`
}
function insertTime(wrap,tHour,tMinut,t2Hour,t2Minut){
    wrap.innerHTML = `<h3>Time:</h3>
    ${tHour}:${tMinut}
    <h3>Time in searching city:</h3>
    ${t2Hour}:${t2Minut}`
}
const wrap = document.getElementById('time-currency');

const t = new TimeInPlace();
t.updateTimeIOP('16:26:34');

setInterval(() => {
    t.countTime();
    insertTime(wrap,t.currentTime.hours,t.currentTime.minutes,t.inOtherPlace.hours,t.inOtherPlace.minutes);
}, 60000); 

// const convertedCurrency = getConvertedCurrency('pln','eur');
const currency = initCurrency('de');
const convertedC = getConvertedCurrency('pln','eur');

currency.then(c => { insertCurrency(wrap,c.name,c.code,c.symbol,convertedC) });

// t.printInConsole();
// getTimeZone('DE');