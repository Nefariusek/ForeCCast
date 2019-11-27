const requestURL = 'https://restcountries.eu/rest/v2/alpha/';
const requestTime = 'http://api.timezonedb.com/v2.1/get-time-zone?key=K8YSTR0U8XTK&format=json&by=position&';

var targetDate = new Date();
var timestamp = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60; 

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
        this.formattedTime = this.currentTime.hours+':'+this.currentTime.minutes+':'+this.currentTime.seconds;
    }
    countTime(){ 
        if(this.currentTime.minutes === 60 && this.inOtherPlace.minutes === 60){
            this.currentTime.minutes = 0;
            this.inOtherPlace.minutes = 0;
            if(this.currentTime.hours === 23 && this.inOtherPlace.hours === 23){
                this.currentTime.hours = 0;
                this.inOtherPlace.hours = 0;
            }else {
                this.currentTime.hours += 1;
                this.inOtherPlace.hours += 1;
            }
        } else {
            this.currentTime.minutes += 1;
            this.inOtherPlace.minutes += 1;
        }
    }
    updateTimeIOP(){
        this.inOtherPlace.hours = parseInt(this.formattedTime.slice(0,2), 10);
        this.inOtherPlace.minutes = parseInt(this.formattedTime.slice(3,5), 10);
        this.inOtherPlace.seconds = parseInt(this.formattedTime.slice(7), 10);
    }
    
    insertTime(wrap){
        wrap.innerHTML = `<h3>Time:</h3><span class="timer">
        ${(this.currentTime.hours < 10)? '0' + this.currentTime.hours : this.currentTime.hours }:
        ${(this.currentTime.minutes < 10)? '0' + this.currentTime.minutes : this.currentTime.minutes}
        </span>
        <h3>Time in searching city:</h3>
        ${(this.inOtherPlace.hours!='NaN')?(this.inOtherPlace.hours < 10) ? '0' + this.inOtherPlace.hours : this.inOtherPlace.hours:'00' }:
        ${(this.inOtherPlace.minutes!='NaN')?(this.inOtherPlace.minutes < 10)? '0' + this.inOtherPlace.minutes : this.inOtherPlace.minutes:'00'}<br>`
    
    }
    printInConsole(){
        console.log('Current time: ', this.currentTime);
        console.log('Time in other place:', this.inOtherPlace);
    }
    async getTime(city){
        await fetch(requestTime+'lat='+city.lat+'&lng='+city.lng)
        .then(res => { if(res.status === 200) return res.json(); })
        .then(data => { this.formattedTime=data.formatted.slice(11)})
        .catch(error => console.log(error));

        this.updateTimeIOP();
    }
    async createTime(city,wrap){
        await this.getTime(city);
        this.insertTime(wrap);
    }
}

function creatClockAn(time){
    const wrapM = document.querySelector('.minutes');
    const wrapH = document.querySelector('.hours');
    console.log(time.hours, time.minutes);
    const rotateH = (30 * time.hours);
    const rotateM = (6 * time.minutes);
    if(time.hours === 0 || time.hours === 12){
        wrapH.style.transform = `rotate(180deg)`;
    } else {
        wrapH.style.transform = `rotate(${rotateH}deg)`; //
    }
    if(time.minutes === 0){
        wrapM.style.transform = `rotate(180deg)`;
    } else {
        wrapM.style.transform = `rotate(${rotateM}deg)`; //
    }
    
    // time.hours time.minutes
}
 export {getTimeZone, creatClockAn }