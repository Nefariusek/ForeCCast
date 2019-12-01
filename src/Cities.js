import cities from 'cities.json';
import { type } from 'os';

class Cities {
  constructor() {
    this._countries = [];
    cities.forEach(element => {
      this._countries.indexOf(element.country) === -1 ? this._countries.push(element.country) : {};
    });

    this._cities = cities;
  }

  getAllCountries() {
    return this._countries;
  }

  getCountryCities(code) {
    let countryCities = [];
    cities.forEach(element => {
      if (code === element.country) {
        countryCities.push(element);
      }
    });
    return countryCities;
  }

  // getByPosition(lat, lng) {
  //     let city = null;
  //     this._cities.forEach(element => {
  //         if(lat == element.lat){
  //             if(lng == element.lng){
  //                 city = element;
  //             }
  //         }
  //     })
  //     return city;
  // }

  getCountryCitiesNames(code) {
    let countryCities = [];
    cities.forEach(element => {
      if (code === element.country) {
        countryCities.push(element.name);
      }
    });
    return countryCities;
  }

  getCityLat(city) {
    let lat = 0;
    cities.forEach(element => {
      if (city === element.name) {
        lat = element.lat;
      }
    });
    return lat;
  }

  getCityLng(city) {
    let lng = 0;
    cities.forEach(element => {
      if (city === element.name) {
        lng = element.lng;
      }
    });
    return lng;
  }

  getByName(name, lat = 0, lng = 0) {
    let city = null;
    cities.forEach(element => {
      if (name === element.name) {
        if (lat != 0 || lng != 0) {
          if (Math.abs(parseInt(lat) - parseInt(element.lat)) < 0.25) {
            if (Math.abs(parseInt(lng) - parseInt(element.lng)) < 0.25) {
              city = element;
            }
          }
        } else {
          city = element;
        }
      }
    });
    return city;
  }
}

export default Cities;
