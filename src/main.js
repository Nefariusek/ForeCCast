import '../style.scss';
import * as news from './news';
import * as sunTime from './sunsetSunriseTime';
import Weather from './weather';
import {initCurrency, getConvertedCurrency} from './currency'
import {TimeInPlace, getTimeZone} from './time'

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