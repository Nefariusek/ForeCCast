const requestURL = 'https://restcountries.eu/rest/v2/alpha/';
const apiReq = {  "method": "GET",
                  "headers": {  "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
                                "x-rapidapi-key": "b087a94743msh32c8f0bcb02e1b7p1b0dddjsn008c0025c319"
                              }
                }
const requestURLConvert = 'https://currency-converter5.p.rapidapi.com/currency/historical/';

async function getCurrencyData(countryCode){
    return await fetch(requestURL + countryCode)
   .then(function(res){ if(res.status === 200) return res.json(); })
   .then(function(d){ return d.currencies[0]})
   .catch((error) => { console.log(error); return 'none';});
}
export class Currency{
   constructor(){
      this.code = 'none';
      this.name = 'none';
      this.symbol = 'none';
   }
    setCurrency(currency){
      try{
         this.code = currency.code;
         this.name = currency.name;
         this.symbol = currency.symbol;
      } catch(error)
      {
         console.log(error);
      }
   }
   getCurrencyCode(){
      return this.code;
   }
   getCurrencyName(){
      return this.name;
   }
   getCurrencySymbol(){
      return this.symbol;
   }
   printInConsole(){
      console.log(this.name,': ', this.code,' [ ',this.symbol,' ]');
   }
   async updateCurrency(countryCode){
     try{
      const currency = await getCurrencyData(countryCode);
      this.setCurrency(currency);
     } catch(error)
     {
       console.log('updateCurrency',error);
     }
      
   }
}

async function getConvertedCurrency(cCodeFrom, cCodeTo, data = '2019-11-21'){
  const url = requestURLConvert+ data + '?format=json&to=' + cCodeTo + '&from='+ cCodeFrom + '&amount=' + 1;
  const convertedCurrency = await fetch(url, apiReq)
  .then(response => { return response.json() })
  .then(data => { return data.rates[cCodeTo.toUpperCase()];})
  .catch(err => {
    console.log(err);
  });
//   console.log('Converted Currency: ', convertedCurrency );
  return convertedCurrency; // example: currency_name: "Euro" rate: "0.2386" rate_for_amount: "0.2386"
}
async function initCurrency(countryCode){
   const currency = new Currency();
   await currency.updateCurrency(countryCode);
   if(currency.getCurrencyCode() !== 'none' && currency.getCurrencyName !== 'none' && currency.getCurrencySymbol !== 'none')
       console.log('Update currency',currency);
   else
       console.log("Error: initCurrency: values none");
   return currency;
}



export {getConvertedCurrency, initCurrency}