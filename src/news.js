import imgUrlSrc from '../src/news_img/news.jpg';

class News {
  constructor(country, language) {
    this.country = country;
    this.language = language;
    this.divNews = document.getElementById('news');
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
    this.divNews.innerHTML = '';
    return this.getNewsByCountry(this.setNewsUrl());
  }

  setNewsUrl() {
    let newsApiKey = '7c4d2ae8384c47ffbfecf1790c38d409';
    let newsUrl = `https://newsapi.org/v2/top-headlines?language=${this.language}&country=${this.country}&apiKey=${newsApiKey}`;
    return newsUrl;
  }

  newsClick(articleUrl){
    //console.log('Akcja reakcja');
    window.open(`${articleUrl}`); 
  }

  getNews(newsArr){

    if(!newsArr.totalResults){
      //console.log("we are out of news");
      this.divNews.innerHTML = `<h1>No news at this moment</h1>`;
    }else{
      let newsImg;
      let divNewsText;
      let divNewsBox;
      for(let i = 0; i < 5; i++){
        let article = i; //Math.floor(Math.random() * newsArr.articles.length);
        let title = newsArr.articles[article].title;
        let description = newsArr.articles[article].description;
        let imgUrl = newsArr.articles[article].urlToImage;
        let articleUrl = newsArr.articles[article].url;

        divNewsBox = document.createElement('div');
        divNewsBox.className = 'news-card card';
        divNewsBox.addEventListener("click", () => {   
          //console.log('Akcja reakcja');
          window.open(`${articleUrl}`); 
        });
        //console.log("Action listener created" + i);
        if(!imgUrl){
          imgUrl=imgUrlSrc;
        }
        newsImg = document.createElement('img');
        newsImg.className = 'newsImg card-img-top';
        newsImg.src = `${imgUrl}`;
        divNewsBox.insertBefore(newsImg, null);
        if(!title){
          title = " ";
        }
        if(!description){
          description = " ";
        }
        divNewsText = document.createElement('div');
        divNewsText.className = 'newsText card-body';
        divNewsText.innerHTML = `<h4 class="card-title">${title}</h4><p class="card-text">${description}</p>`
        divNewsBox.insertBefore(divNewsText, null);
        this.divNews.appendChild(divNewsBox);
      }
    }
  }
  
getNewsByCountry(newsUrl) {
  fetch(newsUrl)
    .then(res => res.json())
    .then(data => {
      let newsArr = data;
      this.getNews(newsArr);
    });
  }
}

export default News;
