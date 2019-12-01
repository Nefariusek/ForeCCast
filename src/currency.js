const requestURL = 'https://restcountries.eu/rest/v2/alpha/';
const apiReq = {  "method": "GET",
                  "headers": {  "x-rapidapi-host": "currency-converter5.p.rapidapi.com",
                                "x-rapidapi-key": "b087a94743msh32c8f0bcb02e1b7p1b0dddjsn008c0025c319"
                              }
                }
const requestURLConvert = 'https://currency-converter5.p.rapidapi.com/currency/historical/';
const nowT = Date.now();
const currentDate = ''+ new Date(nowT).getUTCFullYear() +'-'+ new Date(nowT).getUTCMonth()+'-'+ new Date(nowT).getDate(); //'2019-11-21';
const sing = ['€', '£', '$', '¥'];
const signIcon = ['fa-euro-sign', 'fa-pound-sign', 'fa-dollar-sign', 'fa-yen-sign'];

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
      this.convName = [];
      this.convRate = [];
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
   async getConvertedCurrency(cCodeFrom = this.code, cCodeTo = 'eur', data = currentDate){
      const url = requestURLConvert+ data + '?format=json&to=' + cCodeTo + '&from='+ cCodeFrom + '&amount=' + 1;
       await fetch(url, apiReq)
      .then(response => { return response.json() })
      .then(data => { 
         this.convName.push(data.rates[cCodeTo.toUpperCase()].currency_name); 
         this.convRate.push(data.rates[cCodeTo.toUpperCase()].rate);
      })
      .catch(err => {
        console.log(err);
      });
 // example: currency_name: "Euro" rate: "0.2386" rate_for_amount: "0.2386"
    }
   async getConvertMultipleCurrencies(){
      await this.getConvertedCurrency();
      await this.getConvertedCurrency(this.code,'gbp');
      await this.getConvertedCurrency(this.code,'usd');
      await this.getConvertedCurrency(this.code,'jpy');
    }
   conCurrencyRemove(){
         this.convName = [];
         this.convRate = [];
   }
   insertCurrency(wrap){
      let s = '';
      for(let i = 0; i < this.convName.length; i++){
         s += `<span class="handelCurrency"><i class="fas ${signIcon[i]}"></i><b>${this.convName[i]}:</b> <span class="rate">${this.convRate[i]}${sing[i]}</span><br></span>`;
      } 
      wrap.innerHTML = `<h4>Currency in searching city:</h4><br>
      <span class="handelCurrency"><i class="fas fa-money-bill-wave"></i>
      <b>${this.name}:</b><span class="rate"> ${this.code} [1 ${this.symbol}]</span></span> <br>
      ${s}<br> `
  }
  async createCurrency(city,wrapCu){
      await this.initCurrency(city.country);
      await this.updateCurrency(city.country); 
      await this.getConvertMultipleCurrencies(); 
      this.insertCurrency(wrapCu); 
      this.conCurrencyRemove();
  }
  async initCurrency(countryCode){
   const currency = new Currency();
   await currency.updateCurrency(countryCode);
   // if(currency.getCurrencyCode() !== 'none' && currency.getCurrencyName !== 'none' && currency.getCurrencySymbol !== 'none')
   //     console.log('Update currency',currency);
   // else
   //     console.log("Error: initCurrency: values none");
       this.name = currency.name;
       this.symbol = currency.symbol;
       this.code = currency.code;
   }
}
