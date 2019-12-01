const requestURL = 'https://restcountries.eu/rest/v2/alpha/';
const requestTime = 'http://api.timezonedb.com/v2.1/get-time-zone?key=K8YSTR0U8XTK&format=json&by=position&';

async function getTimeZone(countryCode) {
  const timeZone = await fetch(requestURL + countryCode)
    .then(function(res) {
      if (res.status === 200) return res.json();
    })
    .then(function(d) {
      console.log(d);
      return d.timezones;
    })
    .catch(() => {
      return 'none';
    });
  console.log(`Time zone: ${timeZone}`);
}

export class TimeInPlace {
  constructor() {
    this.currentTime = {
      hours: new Date().getHours(),
      minutes: new Date().getMinutes(),
      seconds: new Date().getSeconds(),
    };
    this.inOtherPlace = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    this.formattedTime = this.currentTime.hours + ':' + this.currentTime.minutes + ':' + this.currentTime.seconds;
  }
  countTime() {
    if (this.currentTime.minutes >= 59 && this.inOtherPlace.minutes >= 59) {
      this.currentTime.minutes = 0;
      this.inOtherPlace.minutes = 0;
      if (this.currentTime.hours >= 23 && this.inOtherPlace.hours >= 23) {
        this.currentTime.hours = 0;
        this.inOtherPlace.hours = 0;
      } else {
        this.currentTime.hours += 1;
        this.inOtherPlace.hours += 1;
      }
    } else {
      this.currentTime.minutes += 1;
      this.inOtherPlace.minutes += 1;
    }
  }
  updateTimeIOP() {
    this.inOtherPlace.hours = parseInt(this.formattedTime.slice(0, 2), 10);
    this.inOtherPlace.minutes = parseInt(this.formattedTime.slice(3, 5), 10);
    this.inOtherPlace.seconds = parseInt(this.formattedTime.slice(7), 10);
  }

  insertTime(wrap) {
    const timer1 = document.getElementById('timer1');
    timer1.innerText = `${this.currentTime.hours < 10 ? '0' + this.currentTime.hours : this.currentTime.hours}:${
      this.currentTime.minutes < 10 ? '0' + this.currentTime.minutes : this.currentTime.minutes
    }`;
    const timer2 = document.getElementById('timer2');
    timer2.innerText = `${
      this.inOtherPlace.hours !== 'NaN'
        ? this.inOtherPlace.hours < 10
          ? '0' + this.inOtherPlace.hours
          : this.inOtherPlace.hours
        : '00'
    }:${
      this.inOtherPlace.minutes !== 'NaN'
        ? this.inOtherPlace.minutes < 10
          ? '0' + this.inOtherPlace.minutes
          : this.inOtherPlace.minutes
        : '00'
    }`;

    wrap.innerHTML = `<span class="time-digits">${
      this.currentTime.hours < 10 ? '0' + this.currentTime.hours : this.currentTime.hours
    }:
        ${this.currentTime.minutes < 10 ? '0' + this.currentTime.minutes : this.currentTime.minutes} <br>
        <p class="time-text">Time</p></span>
        <span class="time-digits">${
          this.inOtherPlace.hours !== 'NaN'
            ? this.inOtherPlace.hours < 10
              ? '0' + this.inOtherPlace.hours
              : this.inOtherPlace.hours
            : '00'
        }:
        ${
          this.inOtherPlace.minutes !== 'NaN'
            ? this.inOtherPlace.minutes < 10
              ? '0' + this.inOtherPlace.minutes
              : this.inOtherPlace.minutes
            : '00'
        } <br>
        <p class="time-text">Time in searching city</p></span>
        
        <br>`;
  }
  printInConsole() {
    console.log('Current time: ', this.currentTime);
    console.log('Time in other place:', this.inOtherPlace);
  }
  async getTime(city) {
    await fetch(requestTime + 'lat=' + city.lat + '&lng=' + city.lng)
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(data => {
        this.formattedTime = data.formatted.slice(11);
      })
      .catch(error => console.log(error));

    this.updateTimeIOP();
  }
  async createTime(city, wrap) {
    await this.getTime(city);
    this.insertTime(wrap);
  }
}

function creatClockAn(time,timer){
    const wrapC = document.querySelector(`.clock${timer}`);
    const wrapM = document.querySelector(`${timer} .minutes`);
    const wrapH = document.querySelector(`${timer} .hours`);

    changeClass(wrapC,wrapM,wrapH,'clockAnalog','minutesAnalog','hoursAnalog');
    wrapC.classList.remove('clockDigit');

    wrapH.innerHTML = '';
    wrapM.innerHTML = '';
    const rotateH = (30 * time.hours);
    const rotateM = (6 * time.minutes);

    if(time.hours === 12 || time.hours === 24){
        wrapH.setAttribute('style', 'transform: rotate(0deg)');
    } else {
        wrapH.setAttribute('style', `transform: rotate(${rotateH}deg)`);
    }
    if(time.minutes == 0){
        wrapM.setAttribute('style', 'transform: rotate(0deg)');
    } else {
        wrapM.setAttribute('style', `transform: rotate(${rotateM}deg)`);
    }
}

function creatClockDigital(time,timer){
    const wrapC = document.querySelector(`.clock${timer}`);
    const wrapM = document.querySelector(`${timer} .minutes`);
    const wrapH = document.querySelector(`${timer} .hours`);

    changeClass(wrapC,wrapM,wrapH,'clockDigit','minutesDigits','hoursDigits','clockAnalog','minutesAnalog','hoursAnalog');


    if(time.hours === 12 || time.hours === 24){
        wrapH.setAttribute('style', 'transform: rotate(0deg)');
        wrapH.innerHTML = `${time.hours}:`;
    } else {
        wrapH.setAttribute('style', 'transform: rotate(0deg)');
        wrapH.innerHTML = `${time.hours < 10 ? '0'+time.hours : time.hours }:`; 
    }
    if(time.minutes == 0){
        wrapM.setAttribute('style', 'transform: rotate(0deg)');
        wrapM.innerHTML = `${time.minutes < 10 ? '0'+ time.minutes : time.minutes}`;
    } else {
        wrapM.setAttribute('style', 'transform: rotate(0deg)');
        wrapM.innerHTML = `${time.minutes < 10 ? '0'+ time.minutes : time.minutes}`;
    }
}
function clockDisplay(time,clock){
    clock(time.currentTime,'.timer1');
    clock(time.inOtherPlace,'.timer2');
}
function changeClass(wrapC, wrapM, wrapH, nameClock, nameM, nameH, removeNameC, removeNameM, removeNameH){
    if(wrapC.classList.contains(`${nameClock}`) === false)
        wrapC.classList.add(`${nameClock}`);
    if(wrapM.classList.contains(`${nameM}`) === false)
        wrapM.classList.add(`${nameM}`);
    if(wrapH.classList.contains(`${nameH}`) === false)
        wrapH.classList.add(`${nameH}`);
    wrapC.classList.remove(`${removeNameC}`);  
    wrapM.classList.remove(`${removeNameM}`);  
    wrapH.classList.remove(`${removeNameH}`);  
}

 export {getTimeZone, creatClockAn, creatClockDigital, clockDisplay }

