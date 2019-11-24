const getLanguage = () => {
  return 'en';
}

const getNewsByCountry = (country, language) => {
  let queryCountry = country;
  let queryLanguage = language;
  let newsApiKey = '7c4d2ae8384c47ffbfecf1790c38d409';
  let newsUrl = `https://newsapi.org/v2/top-headlines?language=${queryLanguage}&country=${queryCountry}&apiKey=${newsApiKey}`;
  console.log(newsUrl);

  fetch(newsUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      let article = Math.floor(Math.random() * data.articles.length); 
      let title = data.articles[article].title;
      let imgUrl = data.articles[article].urlToImage;
      document.getElementById('newsText').innerHTML = `${title}`;
      if(!imgUrl){
        imgUrl = "./src/news_img/news.jpg";
      }
      document.getElementById('newsImg').innerHTML = `<img src="${imgUrl}">`;
    });
};

export { getNewsByCountry, getLanguage };
