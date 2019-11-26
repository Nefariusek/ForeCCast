const forecastConditions = document.querySelector('#forecast');


class Forecast {
    constructor (lat, lon){
        this.lat = lat;
        this.lon = lon;
        this.forecastConditions = forecastConditions;
        
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
        this.setLat(lat);
        this.setLon(lng);
        return this.apiCall(this.setURL());
    }
    // set URL address for API call
    setURL (){
        let weatherApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&units=metric&APPID=f051a3a6eaeb0d3041fa073c40a73a0c`;
        return weatherApiURL;
    }

    getForecast(array) {
        let divDay;
        let divDate;
        let divIconWeather;
        let divIconWeatherDescription;
        let divTemp;
        let divPressure;
        let divHumidity;
        let divWind;
        let divWindDirection;
        
        for (let i = 0; array.length; i++){
            divDay = document.createElement('div');
            divDay.className = 'day';
            divDate = document.createElement('div');
            divDate.className = `date`;
            divDate.appendChild(document.createTextNode(array[i].dt_txt));
            divDay.insertBefore(divDate, null);
            divIconWeather = document.createElement('div');
            divIconWeather.className = `icon`;
            divIconWeather.innerHTML =  `<img src='http://openweathermap.org/img/wn/${array[i].weather[0].icon}@2x.png'> <br>`;
            divDay.insertBefore(divIconWeather, null);
            divIconWeatherDescription = document.createElement('div');
            divIconWeatherDescription.className = `description`;
            divIconWeatherDescription.appendChild(document.createTextNode(array[i].weather[0].description));
            divDay.insertBefore(divIconWeatherDescription, null);
            divTemp = document.createElement('div');
            divTemp.className = `temp`;
            divTemp.appendChild(document.createTextNode(array[i].main.temp));
            divDay.insertBefore(divTemp, null);
            divPressure = document.createElement('div');
            divPressure.className = `pressure`;
            divPressure.appendChild(document.createTextNode(array[i].main.pressure));
            divDay.insertBefore(divPressure, null);
            divHumidity = document.createElement('div');
            divHumidity.className = `humidity`;
            divHumidity.appendChild(document.createTextNode(array[i].main.humidity));
            divDay.insertBefore(divHumidity, null);
            divWind = document.createElement('div');
            divWind.className = `wind`;
            divWind.appendChild(document.createTextNode(array[i].wind.speed));
            divDay.insertBefore(divWind, null);
            divWindDirection = document.createElement('div');
            divWindDirection.className = `windDirection`;
            divWindDirection.innerHTML = `<img style = "width:15%; transform:rotate(${array[i].wind.deg}deg);" src='./src/wind_arrow/arrow.png'>`
            divDay.insertBefore(divWindDirection, null);
            forecastConditions.insertBefore(divDay, null);

        }
    }
    


    //sending API call 
   apiCall (setURL) {
        fetch(setURL)
        .then(res => res.json())
        .then(data => { 
            const array = data.list;
            console.log(array);
            this.getForecast(array);
           
        })

    }
}

export default Forecast;
