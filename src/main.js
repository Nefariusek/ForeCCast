import './style.scss';
import * as news from './news';
import * as sunTime from './sunsetSunriseTime';

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

console.log('main.js ready to serve');