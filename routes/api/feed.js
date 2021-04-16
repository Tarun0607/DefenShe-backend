const express = require("express");
const router = express.Router();
const path = require('path');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('233d7e0f50b8470cbe81df7655a35e3f');
const News = require(path.join(__dirname,'..','..', 'models','feedData'));

async function fetchNewsFeeds(){
    var resp; 
    const response = await newsapi.v2.everything({q: 'women security',language: 'en',});
    return response;
}

router.get('/fetch',async (req,res)=>{
    const newsFeeds = await fetchNewsFeeds();
    res.send(newsFeeds);
})

module.exports = router;