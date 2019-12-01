import clearSrc from '../src/bg_img/clear.jpg';
import drizzleSrc from '../src/bg_img/drizzle.jpg';
import dustSrc from '../src/bg_img/dust.jpg';
import few_cloudsSrc from '../src/bg_img/few_clouds.jpg';
import fogSrc from '../src/bg_img/fog.jpg';
import overcast_cloudsSrc from '../src/bg_img/overcast_clouds.jpg';
import rainSrc from '../src/bg_img/rain.jpg';
import snowSrc from '../src/bg_img/snow.jpg';
import thunderstormSrc from '../src/bg_img/thunderstorm.jpg';
import tornadoSrc from '../src/bg_img/tornado.jpg';

const weatherConditions = document.querySelector('#weather');
const backgroundChange = document.querySelector('body');

class Weather {
    constructor (lat, lon){
        this.lat = lat;
        this.lon = lon;
        this.backgroundPicture = clearSrc;
        
    }
    //set lat value
    setLat(value) {
        return this.lat=value;
    } 
    //set lon value
    setLon(value){
        return this.lon=value;
    }
    //background picture change
    setBackgroundPicture (weatherConditionId) {
        //console.log(weatherConditionId);
        if(weatherConditionId>=200 && weatherConditionId<=232){
                this.backgroundPicture = thunderstormSrc;
            }else if(weatherConditionId>=300 && weatherConditionId<=321){
                this.backgroundPicture = drizzleSrc;
            }else if(weatherConditionId>=500 && weatherConditionId<=531){
                this.backgroundPicture = rainSrc;
            }else if(weatherConditionId>=600 && weatherConditionId<=622){
                this.backgroundPicture = snowSrc;
            }else if( weatherConditionId==701 || weatherConditionId==711|| weatherConditionId==721 || weatherConditionId==741){
                this.backgroundPicture = fogSrc;
            }else if( weatherConditionId==800){
                this.backgroundPicture = clearSrc;
            }else if(weatherConditionId==801){
                this.backgroundPicture = few_cloudsSrc;
            }else if(weatherConditionId==781 || weatherConditionId==771 ){
                this.backgroundPicture = tornadoSrc;
            }else if(weatherConditionId==761 ||weatherConditionId==751 || weatherConditionId==731 ){
                this.backgroundPicture = dustSrc;
            }else if(weatherConditionId>801 && weatherConditionId<=804){
                this.backgroundPicture = overcast_cloudsSrc;
            }else{
                this.backgroundPicture =  clearSrc;
            }
        
        //console.log(this.backgroundPicture);
        return this.backgroundPicture;

      


    }
    //set coordinates value
    getCoordinates(lat, lng) {
        this.setLat(lat);
        this.setLon(lng);
        return this.apiCall(this.setURL());
    }
    // set URL address for API call
    setURL (){
        let weatherApiKey = '47f83ac09c8aba4209901acd619fdb03';
        let weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&APPID=${weatherApiKey}`;
        return weatherApiURL;
    }

    //sending API call 
   apiCall (setURL) {
        fetch(setURL)
        .then(res => res.json())
        .then(data => { 
            weatherConditions.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'> <br>
            Temperature: ${data.main.temp}°C  <br>
           Pressure: ${data.main.pressure}hPa <br> 
           Humidity: ${data.main.humidity}% <br>
           Wind: ${data.wind.speed}km/h <br>
           <img style = "width:15%; transform:rotate(${data.wind.deg}deg);" src='./src/wind_arrow/arrow.png'> <br>
           `;
           backgroundChange.style.background = `url(${this.setBackgroundPicture(data.weather[0].id)}) center fixed`;
        })

    }
}

export default Weather;
