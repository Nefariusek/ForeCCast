export const getUserLocation = () => {
  return new Promise(function(resolve, reject) {
    window.navigator.geolocation.getCurrentPosition(
      async position => {
        let lat = Math.round(position.coords.latitude * 100000) / 100000;
        let lng = Math.round(position.coords.longitude * 100000) / 100000;
        lat = lat.toString();
        lng = lng.toString();
        for (let i = lat.length - 1; i >= 1; i--) {
          if (lat[i - 1] !== '.') {
            if (lat[i] === '0') {
              lat.pop();
            } else {
              break;
            }
          }
        }
        for (let i = lng.length - 1; i >= 1; i--) {
          if (lat[i - 1] !== '.') {
            if (lng[i] === '0') {
              lng.pop();
            } else {
              break;
            }
          }
        }
        let city = await getCityNameByCordinates(lat, lng);
        resolve([city, lat, lng]);
      },
      err => {
        reject(err);
      },
    );
  });
};

const getCityNameByCordinates = (lat, lng) => {
  return new Promise(function(resolve, reject) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
      .then(res => res.json())
      .then(data => {
        resolve(data.city);
      })
      .catch(() => {
        reject();
      });
  });
};
