const requestURL = 'https://restcountries.eu/rest/v2/alpha/';

async function getCurrency(countryCode){
   const currencyName = await fetch(requestURL+countryCode)
   .then(function(res){ if(res.status === 200) return res.json(); })
   .then(function(d){ return d.currencies[0]})
   .catch(() => { return 'none';});
   console.log(`Currency: ${currencyName.name} (${currencyName.code})`);
}

async function getTimeZone(countryCode){
    const timeZone= await fetch(requestURL+countryCode)
    .then(function(res){ if(res.status === 200) return res.json(); })
    .then(function(d){ console.log(d); return d.timezones})
    .catch(() => { return 'none';});
    console.log(`Time zone: ${timeZone}`);
 }

export {getCurrency, getTimeZone}