// Show info when the user clicks the button
document.getElementById('getText').addEventListener('click', getSunsetSunrise);

// Take and display info from API (https://openweathermap.org/)
function getSunsetSunrise(Country, City) {
  let KeyAPI = 'a5c8e964ba083b95272f66d4becc65b2';
  let Link = 'http://api.openweathermap.org/data/2.5/weather?q=' + City + ',' + Country + '&APPID=' + KeyAPI;

  fetch(Link)
    .then(res => res.json())
    .then(data => {
      // Convert epoch time to human time
      let Sunrise = new Date(data.sys.sunrise * 1000);
      let Sunset = new Date(data.sys.sunset * 1000);
      let timeSunrise = Sunrise.toLocaleTimeString();
      let timeSunset = Sunset.toLocaleTimeString();

      let output = `<h2>${data.name}</h2>`; // Display City
      output += `
            <div>
              <p>Sunrise: ${timeSunrise}</p>
              <p>Sunset: ${timeSunset}</p>
            </div>
          `;
      document.getElementById('output').innerHTML = output;
    });
}

export { getSunsetSunrise };
