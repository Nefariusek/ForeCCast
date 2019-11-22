import '../style.scss';
import * as news from './news';

let country = 'pl';
let language = 'pl';

//console.log(country,language);
news.getNewsByCountry(country, language);

console.log('main.js ready to serve');
