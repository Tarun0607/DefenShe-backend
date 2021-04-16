const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('233d7e0f50b8470cbe81df7655a35e3f');
const News = require(path.join(__dirname,'..','..', 'models','feedData'));

async function fetchNewsFeeds(){
    newsapi.v2.everything({q: 'women security',language: 'en',}).
    then(response => {
        console.log(response);
        response.articles.forEach(obj =>{
            console.log(obj.source);
        })});
}
