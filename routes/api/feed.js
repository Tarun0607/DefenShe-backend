const express = require("express");
const router = express.Router();
const path = require('path');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('233d7e0f50b8470cbe81df7655a35e3f');
const News = require(path.join(__dirname,'..','..', 'models','feedData'));

async function fetchNewsFeeds(){
    console.log("fetching feed")
    const response = await newsapi.v2.everything({q: 'women security',language: 'en',});
    const newsItem = [];
    News.deleteMany({})
    .then((msg)=>{
        response.articles.forEach(article=>{
            const item = {
                title: article.title,
                description: article.description,
                imageUri: article.urlToImage,
                url: article.url,
                date: article.publishedAt,
            }
            newsItem.push(item);
        })
        News.insertMany(newsItem)
        .then((resp)=>{
        })
        .catch((err)=>{
        });
    })
    .catch(err=>{
        console.log("Unable to fetch news")
    });
}
setInterval(fetchNewsFeeds, 900000);

router.get('/fetch',async (req,res)=>{
    News.find({})
    .then(response=>{
        res.send(response);
    })
    .catch(err=>{
        res.json({})
    })
})

module.exports = router;