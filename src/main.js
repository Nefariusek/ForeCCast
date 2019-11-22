import './style.scss';
import * as sunTime from './sunsetSunriseTime';

let country = 'pl';
let city = 'Walbrzych';

// Show info when the user clicks the button
document.getElementById('getText')
.addEventListener('click', () => {
    sunTime.getSunsetSunrise(country, city); 
});

console.log('main.js ready to serve');