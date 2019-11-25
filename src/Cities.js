import cities from 'cities.json';

class Cities {
    constructor() {
        this._countries=[];
        cities.forEach(element => {
            this._countries.indexOf(element.country) === -1 ? this._countries.push(element.country) : {};
        });
        
        this._cities=cities;
        
    }

    getAllCountries() {
        return this._countries;
    }

    getCountryCities(code) {
        let countryCities = [];
        cities.forEach(element => {
            if(code === element.country){
                countryCities.push(element);
            }
        });
        return countryCities;
    }

    getCountryCitiesNames(code) {
        let countryCities = [];
        cities.forEach(element => {
            if(code === element.country){
                countryCities.push(element.name);
            }
        });
        return countryCities;
    }

    getCityLat(city) {
        let lat = 0;
        cities.forEach(element => {
            if(city === element.name){
                lat = element.lat;
            }
        });
        return lat;
    }

    getCityLng(city) {
        let lng = 0;
        cities.forEach(element => {
            if(city === element.name){
                lng = element.lng;
            }
        });
        return lng;
    }

    // FindCity(city) {
    //     let c = null;
    //     cities.forEach(element => {
    //         if(city === element.name){
    //             c = element.name;
    //         }
    //     });
    //     return c;
    // }
    
}

export default Cities;