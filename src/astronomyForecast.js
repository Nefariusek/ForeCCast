class AstronomyForecast {
  constructor(city, day) {
    this.city = city;
    this.day = day;
  }

  setCity(city) {
    return (this.city = city);
  }

  setDay(day) {
    return (this.day = day);
  }

  getCity(city, day) {
    this.setCity(city);
    this.setDay(day);
    this.buttonStyle();
    return this.getAstronomyForecast(this.setUrl());
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
    // this.city;
    return Link;
  }

  // returns a picture of the moon phase
  setMoonImg(moonPhase) {
    let image;
    switch (moonPhase) {
      case 'New moon':
        image = 'https://www.moongiant.com/moon_blog/birthday-nav/newmoon.jpg';
        break;
      case 'First Quarter':
        image = 'http://astronomy.robpettengill.org/photos/slides/Moon2807FirstQ20160414.jpg';
        break;
      case 'Waxing gibbous':
        image = 'http://astronomy.robpettengill.org/photos/slides/Moon2810WaxGib141004.jpg';
        break;
      case 'Full moon':
        image = 'http://astronomy.robpettengill.org/photos/slides/Moon2814Full151225.jpg';
        break;
      case 'Last quarter':
        image = 'http://astronomy.robpettengill.org/photos/slides/Moon2821WanGib140817.jpg';
        break;
      case 'Waning crescent':
        image = 'http://astronomy.robpettengill.org/photos/slides/Moon2824WaningCrescent140819.jpg';
        break;
      case 'Waxing crescent':
        image = 'http://astronomy.robpettengill.org/photos/slides/Moon2822WanCrescent140818.jpg';
        break;

      default:
        image = 'https://www.computerhope.com/jargon/e/error.gif';
    }

    return (
      '<img class="moonImg" src="' +
      image +
      '" alt="Moon Phase" width="200" height="200" style="border-radius:50%";"></img>'
    );
  }

  // Take and display info from API
  getAstronomyForecast(setURL) {
    fetch(setURL)
      .then(res => res.json())
      .then(data => {
        let cityAndDate = `<h2>${data.astronomy.city}</h2>
          <p>${data.astronomy.astronomy[this.day].utcTime.slice(1, 10)}<p>`; // Display City

        let output = `
        <div>
          <div class='sun card m-2 mb-4'>
            <p>Sunrise: ${data.astronomy.astronomy[this.day].sunrise}</p>
            <p>Sunset: ${data.astronomy.astronomy[this.day].sunset}</p>
          </div>
          <div class='moon card m-2'>
            <p>Moonrise: ${data.astronomy.astronomy[this.day].moonrise}</p>
            <p>Moonset: ${data.astronomy.astronomy[this.day].moonset}</p>
            <p class='border-up'>Moon Phase: ${data.astronomy.astronomy[this.day].moonPhaseDesc}</p>
            <div class='mb-4'>${this.setMoonImg(data.astronomy.astronomy[this.day].moonPhaseDesc)}</div>
          </div>
        </div>
      `;
        document.getElementById('output').innerHTML = output;
        document.getElementById('cityAndDate').innerHTML = cityAndDate;
      });
  }

  buttonStyle() {
    let btn1 = document.getElementById('previousDay');
    let btn2 = document.getElementById('nextDay');

    if (this.day === 0) {
      btn1.style.background = 'transparent';
    } else {
      btn1.style.background = '#ffc107';
    }

    if (this.day === 7) {
      btn2.style.background = 'transparent';
    } else {
      btn2.style.background = '#ffc107';
    }
  }
}

export default AstronomyForecast;
