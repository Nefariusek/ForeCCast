class News {
  constructor(country, language) {
    this.country = country;
    this.language = language;
  }

  setLanguage(language) {
    return this.language = language;
  }

  setCountry(country){
    return this.country = country;
  }

  getCountry(country, language) {
    this.setCountry(country);
    this.setLanguage(language);
    return this.getNewsByCountry(this.setNewsUrl());
}

  setNewsUrl() {
    let newsApiKey = '7c4d2ae8384c47ffbfecf1790c38d409';
    let newsUrl = `https://newsapi.org/v2/top-headlines?language=${this.language}&country=${this.country}&apiKey=${newsApiKey}`;
    return newsUrl;
  }

  getNewsByCountry(newsUrl) {
    console.log(newsUrl);

    fetch(newsUrl)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        console.log(data.totalResults);
        if(!data.totalResults){
          document.getElementById('newsImg').innerHTML = `<img>`;
          document.getElementById('newsText').innerHTML = `<h1>No news at this moment</h1>`;
        } else{
        let article = Math.floor(Math.random() * data.articles.length);
        let title = data.articles[article].title;
        let imgUrl = data.articles[article].urlToImage;
        document.getElementById('newsText').innerHTML = `${title}`;
        if (!imgUrl) {
          imgUrl = './src/news_img/news.jpg';
        }
        document.getElementById('newsImg').innerHTML = `<img src="${imgUrl}">`;
      }
    });
  }
}

export default News;
