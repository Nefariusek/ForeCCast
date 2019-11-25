// Show info when the user clicks the button
// document.getElementById('getText').addEventListener('click', getSunsetSunrise);

class AstronomyForecast {
  constructor(city, day) {
    this.city = city;
    this.day = day;
  }

  setCity(city) {
    return this.city = city;
  }

  setDay(day) {
    return this.day = day;
  }

  getCity(city, day) {
    this.setCity(city);
    this.setDay(day);
    return this.getNewsByCountry(this.setUrl());
  }

  setUrl() {
    const myPorxy = 'https://cors-anywhere.herokuapp.com/';
    const appId = '6MiMv2odCODiawd3kNPj';
    const appCode = 'y2BSP99SqgffRkjYGZmVhw';
    let Link =
      myPorxy +
      'https://weather.api.here.com/weather/1.0/report.json?app_id=' +
      appId +
      '&app_code=' +
      appCode +
      '&product=forecast_astronomy' +
      '&name=' +
      this.city;
    return Link;
  }

  // returns a picture of the moon phase
  setMoonImg(moonPhase) {
    let image;
    switch (moonPhase) {
      case 'New moon':
        image = 'https://www.moongiant.com/moon_blog/birthday-nav/newmoon.jpg';
        break;
      case 'First quarter':
        image = 'https://www.moongiant.com/moon_blog/birthday-nav/firstquarter.jpg';
        break;
      case 'Waxing gibbous':
        image = 'https://www.moongiant.com/moon_blog/birthday-nav/waxinggibbous.jpg';
        break;
      case 'Full moon':
        image = 'https://www.moongiant.com/moon_blog/birthday-nav/fullmoon.jpg';
        break;
      case 'Last quarter':
        image = 'https://www.moongiant.com/moon_blog/birthday-nav/lastquarter.jpg';
        break;
      case 'Waning crescent':
        image = 'https://www.moongiant.com/moon_blog/birthday-nav/waningcrescent.jpg';
        break;

      default:
        image = 'https://www.computerhope.com/jargon/e/error.gif';
    }

    return '<img src="' + image + '" alt="Moon Phase" style="width: 153px; height: auto;"></img>';
  }

  // Take and display info from API
  getAstronomyForecast(setURL) {
    fetch(setURL)
      .then(res => res.json())
      .then(data => {
        let output = `<h2>${data.astronomy.city}</h2>`; // Display City
        output += `
        <div>
          <p>Sunrise: ${data.astronomy.astronomy[this.day].sunrise}</p>
          <p>Sunset: ${data.astronomy.astronomy[this.day].sunset}</p>
          <p>Moonrise: ${data.astronomy.astronomy[this.day].moonrise}</p>
          <p>Moonset: ${data.astronomy.astronomy[this.day].moonset}</p>
          <p>Moon Phase: ${data.astronomy.astronomy[this.day].moonPhaseDesc}</p>
          ${this.setMoonImg(data.astronomy.astronomy[this.day].moonPhaseDesc)}
        </div>
      `;
        document.getElementById('output').innerHTML = output;
      });
  }
}

export default AstronomyForecast;