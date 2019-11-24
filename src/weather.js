const weatherConditions = document.querySelector('#weather');
const backgroundChange = document.querySelector('body');

class Weather {
    constructor (lat, lon){
        this.lat = lat;
        this.lon = lon;
        this.backgroundPicture = './src/bg_img/clear.jpg';
        
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
        switch (weatherConditionId){
            case 200:
                this.backgroundPicture = './src/bg_img/thunderstorm.jpg';
                break;
            case 300:
                this.backgroundPicture = './src/bg_img/thunderstorm.jpg';
                break;
            case 500:
                this.backgroundPicture = './src/bg_img/rain.jpg';
                break;
            case weatherConditionId>=600 && weatherConditionId<=622:
                this.backgroundPicture = './src/bg_img/snow.jpg';
                break;
            case 741:
                this.backgroundPicture = './src/bg_img/fog.jpg';
                break;
            case 800:
                this.backgroundPicture = './src/bg_img/clear.jpg';
                break;
            case 801:
                this.backgroundPicture = './src/bg_img/few_clouds.jpg';
                break;
            case 781:
                this.backgroundPicture = './src/bg_img/tornado.jpg';
                break;
            case 761:
                this.backgroundPicture = './src/bg_img/dust.jpg';
                break;
            case 804:
                this.backgroundPicture = './src/bg_img/overcast_clouds.jpg';
                break;
            default:
                this.backgroundPicture =  './src/bg_img/clear.jpg';
                break;
        }

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
        let weatherApiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&units=metric&APPID=47f83ac09c8aba4209901acd619fdb03`;
        return weatherApiURL;
    }
    // time convesion from UNIX
    getTime (unix_timestamp){
        let date = new Date(unix_timestamp*1000);
        // Hours part from the timestamp
        let hours = date.getHours();
        // Minutes part from the timestamp
        let minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        let seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        return formattedTime;
    }


    //sending API call 
   apiCall (setURL) {
        fetch(setURL)
        .then(res => res.json())
        .then(data => { 
            weatherConditions.innerHTML = `<img src='http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'> <br>
            temp: ${data.main.temp}°C  <br>
           temp max: ${data.main.temp_max}°C <br> 
           temp min: ${data.main.temp_min}°C <br> 
           ciśnienie: ${data.main.pressure}hPa <br> 
           wilgotność: ${data.main.humidity}% <br>
           `;
           backgroundChange.style.background = `url(${this.setBackgroundPicture(data.weather[0].id)})`;
        })
        
    }

}

export default Weather;