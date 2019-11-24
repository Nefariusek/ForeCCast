const getNewsByCountry = (country, language) => {
  let queryCountry = country;
  let queryLanguage = language;
  let newsUrl = `https://newsapi.org/v2/top-headlines?country=${queryCountry}&language=${queryLanguage}&apiKey=7c4d2ae8384c47ffbfecf1790c38d409`;
  console.log(newsUrl);

  fetch(newsUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      console.log(data.articles[5].content);
      let content = data.articles[5].content;
      document.getElementById('news').innerHTML = `Test newsów: ${content}`;
    });
};

export { getNewsByCountry };
