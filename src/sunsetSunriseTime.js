// Show info when the user clicks the button
document.getElementById('getText').addEventListener('click', getSunsetSunrise);

function moonImg(moonPhase) {
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
function getSunsetSunrise(City, Country, day) {
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
    City;

  fetch(Link)
    .then(res => res.json())
    .then(data => {
      let output = `<h2>${data.astronomy.city}</h2>`; // Display City
      output += `
        <div>
          <p>Sunrise: ${data.astronomy.astronomy[day].sunrise}</p>
          <p>Sunset: ${data.astronomy.astronomy[day].sunset}</p>
          <p>Moonrise: ${data.astronomy.astronomy[day].moonrise}</p>
          <p>Moonset: ${data.astronomy.astronomy[day].moonset}</p>
          <p>Moon Phase: ${data.astronomy.astronomy[day].moonPhaseDesc}</p>
          ${moonImg(data.astronomy.astronomy[day].moonPhaseDesc)}
        </div>
      `;
      document.getElementById('output').innerHTML = output;
    });
}

export { getSunsetSunrise };
