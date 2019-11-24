// Show info when the user clicks the button
document.getElementById('getText').addEventListener('click', getSunsetSunrise);

// Take and display info from API (https://openweathermap.org/)
function getSunsetSunrise(City, Country) {
  // Location Coordinates
  let latitude; 
  let longitude;

  // API for Location Coordinates
  let KeyAPI = 'a5c8e964ba083b95272f66d4becc65b2';
  let Link = 'http://api.openweathermap.org/data/2.5/weather?q=' + City + ',' + Country + '&APPID=' + KeyAPI;

  fetch(Link)
    .then(res => res.json())
    .then(data => {
      longitude = data.coord.lon;
      latitude = data.coord.lat;
      let output = `<h2>${data.name}</h2>`; // Display City

      // API for sun info and moon phase
      KeyAPI = 'e688c6fe76374892bda591a532e9178c';
      Link = 'https://api.ipgeolocation.io/astronomy?apiKey=' + KeyAPI + '&lat=' + latitude + '&long=' + longitude;

      fetch(Link)
        .then(res => res.json())
        .then(data => {
          output += `
            <div>
              <p>Sunrise: ${data.sunrise}</p>
              <p>Sunset: ${data.sunset}</p>
            </div>
          `;
          document.getElementById('output').innerHTML = output;
        });
    });
}

export { getSunsetSunrise };
