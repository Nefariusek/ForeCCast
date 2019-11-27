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
        this.forecastConditions.innerHTML = '';
        return this.apiCall(this.setURL());
    }
    // set URL address for API call
    setURL (){
        let forecastApiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&units=metric&APPID=f051a3a6eaeb0d3041fa073c40a73a0c`;
        return forecastApiURL;
    }

    //get date info
    getDate(array, i){
        let divDate;
        divDate = document.createElement('div');
        divDate.className = `date`;
        divDate.appendChild(document.createTextNode(array[i].dt_txt));
        return divDate;
    }

    //get weather icon
    getIconWeather(array, i){
        let divIconWeather;
        divIconWeather = document.createElement('div');
        divIconWeather.className = `icon`;
        divIconWeather.innerHTML =  `<img src='http://openweathermap.org/img/wn/${array[i].weather[0].icon}@2x.png'> <br>`;
        return divIconWeather;
    }

    //get weather icon description
    getIconWeatherDescription(array, i){
        let divIconWeatherDescription;
        divIconWeatherDescription = document.createElement('div');
            divIconWeatherDescription.className = `description`;
            divIconWeatherDescription.appendChild(document.createTextNode(array[i].weather[0].description));
        return divIconWeatherDescription;
    }

    //get temp info
    getTemp(array, i){
        let divTemp;
        divTemp = document.createElement('div');
        divTemp.className = `temp`;
        divTemp.appendChild(document.createTextNode(array[i].main.temp));
        return divTemp;
    }

    //get pressure info
    getPressure(array, i){
        let divPressure;
        divPressure = document.createElement('div');
            divPressure.className = `pressure`;
            divPressure.appendChild(document.createTextNode(array[i].main.pressure));
        return divPressure;
    }

    //get humidity info
    getHumidity(array, i){
        let divHumidity;
        divHumidity = document.createElement('div');
            divHumidity.className = `humidity`;
            divHumidity.appendChild(document.createTextNode(array[i].main.humidity));
        return divHumidity;
    }

    //get wind value info
    getWind(array, i){
        let divWind;
        divWind = document.createElement('div');
            divWind.className = `wind`;
            divWind.appendChild(document.createTextNode(array[i].wind.speed));
        return divWind;
    }

    //get wind direction info
    getWindDirection(array, i){
        let divWindDirection;
        divWindDirection = document.createElement('div');
        divWindDirection.className = `windDirection`;
        divWindDirection.innerHTML = `<img style = "width:15%; transform:rotate(${array[i].wind.deg}deg);" src='./src/wind_arrow/arrow.png'>`
        return divWindDirection;
    }


    getForecast(array) {
        let divDay;
        for (let i = 0; array.length; i++){
            divDay = document.createElement('div');
            divDay.className = 'day';
            divDay.insertBefore(this.getDate(array, i), null);
            divDay.insertBefore(this.getIconWeather(array, i), null);
            divDay.insertBefore(this.getIconWeatherDescription(array, i), null);
            divDay.insertBefore(this.getTemp(array, i), null);
            divDay.insertBefore(this.getPressure(array, i), null);
            divDay.insertBefore(this.getHumidity(array, i), null);
            divDay.insertBefore(this.getWind(array, i), null);
            divDay.insertBefore(this.getWindDirection(array, i), null);
            forecastConditions.appendChild(divDay);
        }
    }
    


    //sending API call 
   apiCall (setURL) {
        fetch(setURL)
        .then(res => res.json())
        .then(data => { 
            let array = data.list;
            console.log(array);
            this.getForecast(array);
        })

    }
}

export default Forecast;
