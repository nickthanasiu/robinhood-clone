const path = require('path');
const result = require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

const { NEWS_API_KEY } = result.parsed;
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(NEWS_API_KEY);

exports.newsFeed = (req, res) => {
  const { query } = req.body;

  // News API Request using their Node.js client library
  // Documentation can be found here: https://github.com/bzarras/newsapi
  // @TODO: Update from/to dates to reflect the current week
  newsapi.v2.everything({
    q: `${query}`,
    sources: 'bbc-news, the-verge, bloomberg, axios, the-new-york-times',
    domains: 'bbc.co.uk, techcrunch.com, bloomberg.com, axios.com, nytimes.com',
    from: '2018-09-01',
    to: '2018-09-08',
    language: 'en',
    sortBy: 'relevancy',
    page: 1,
  }).then((response) => {
    res.json(response);
  });
};

exports.newsFeedFollowed = (req, res) => {

  const { queryArray } = req.body;
  console.log('CONTROLLER RECEIVED QUERYARRAY: ', queryArray);

  newsapi.v2.topHeadlines({
    sources: 'bbc-news,the-verge',
    q: 'tesla',
    language: 'en',
  }).then((response) => {
    console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});
};

/*

newsapi.v2.topHeadlines({
  sources: 'bbc-news,the-verge',
  q: 'bitcoin',
  category: 'business',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
//});
//*/
