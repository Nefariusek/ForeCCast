const requestURL = 'https://restcountries.eu/rest/v2/alpha/';

async function getTimeZone(countryCode){
    const timeZone= await fetch(requestURL+countryCode)
    .then(function(res){ if(res.status === 200) return res.json(); })
    .then(function(d){ console.log(d); return d.timezones})
    .catch(() => { return 'none';});
    console.log(`Time zone: ${timeZone}`);
 }

// const dt = '10:30:23';
// Will display time in 10:30:23 format
// let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

export class TimeInPlace {
    constructor(){
        this.currentTime = {
            hours: new Date().getHours(),
            minutes: new Date().getMinutes(),
            seconds: new Date().getSeconds()
        }
        this.inOtherPlace = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }
    countTime(){ 
        this.currentTime.minutes += 1;
        this.inOtherPlace.minutes += 1;
        if(this.currentTime.minutes >= 60 && this.inOtherPlace.minutes >= 60){
            this.currentTime.hours += 1;
            this.inOtherPlace.hours += 1;
            this.currentTime.minutes = 0;
            this.inOtherPlace.minutes = 0;
            if(this.currentTime.hours === 24 && this.inOtherPlace.hours === 24){
                this.currentTime.hours = 0;
                this.inOtherPlace.hours = 0;
            }
        }
    }
    updateTimeIOP(formattedTime){
        this.inOtherPlace.hours = parseInt(formattedTime.slice(0,2), 10);
        this.inOtherPlace.minutes = parseInt(formattedTime.slice(3,5), 10);
        this.inOtherPlace.seconds = parseInt(formattedTime.slice(7), 10);
    }
    
    insertTime(wrap){
        wrap.innerHTML = `<h3>Time:</h3>
        ${(this.currentTime.hours < 10)? '0' + this.currentTime.hours : this.currentTime.hours }:
        ${(this.currentTime.minutes < 10)? '0' + this.currentTime.minutes : this.currentTime.minutes}
        <h3>Time in searching city:</h3>
        ${(this.inOtherPlace.hours < 10) ? '0' + this.inOtherPlace.hours : this.inOtherPlace.hours }:
        ${(this.inOtherPlace.minutes < 10)? '0' + this.inOtherPlace.minutes : this.inOtherPlace.minutes}`
    }
    printInConsole(){
        console.log('Current time: ', this.currentTime);
        console.log('Time in other place:', this.inOtherPlace);
    }
}
 export {getTimeZone }