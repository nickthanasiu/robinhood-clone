const path = require('path');
const result = require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

const { NEWS_API_KEY } = result.parsed;
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(NEWS_API_KEY);

exports.newsFeed = (req, res, next) => {
  const { query } = req.body;

  // News API Request using their Node.js client library
  // Documentation can be found here: https://github.com/bzarras/newsapi
  newsapi.v2.everything({
    q: `${query}`,
    sources: 'bbc-news, the-verge',
    domains: 'bbc.co.uk, techcrunch.com',
    from: '2017-12-01',
    to: '2017-12-12',
    language: 'en',
    sortBy: 'relevancy',
    page: 1,
  }).then((response) => {
    res.json(response);
  });
};
