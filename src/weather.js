const weatherConditions = document.querySelector('#weather');

class Weather {
    constructor (lat, lon){
        this.lat = lat;
        this.lon = lon;
        
    }
    //set lat value
    setLat(value) {
        return this.lat=value;
    } 
    //set lon value
    setLon(value){
        return this.lon=value;
    }
    //set coordinates value
    getCoordinates(lat, lng) {
        // let latValue = document.getElementById('lat').value;
        // let lonValue = document.getElementById('lon').value;
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
            weatherConditions.innerHTML = `Nazwa miasta: ${data.name} <br>
           państwo: ${data.sys.country} <br> 
           temperatura: ${data.main.temp}°C  <br>
           temp max: ${data.main.temp_max}°C <br> 
           temp min: ${data.main.temp_min}°C <br> 
           ciśnienie: ${data.main.pressure}hPa <br> 
           wilgotność: ${data.main.humidity}% <br> 
           czas pomiaru: ${this.getTime(data.dt)} <br> 
           `
        })
        
    }

}

export default Weather;