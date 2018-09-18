const path = require('path');
const result = require('dotenv').config({
  path: path.resolve(__dirname, '../../.env'),
});

const { NEWS_API_KEY } = result.parsed;
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(NEWS_API_KEY);

const { shuffleArray } = require('../../src/util/newsfeed_util');


exports.newsFeed = (req, res) => {
  const { query } = req.body;

  // News API Request using their Node.js client library
  // Documentation can be found here: https://github.com/bzarras/newsapi
  // @TODO: Update from/to dates to reflect the current week
  newsapi.v2.everything({
    q: `${query}`,
    sources: 'bbc-news, the-verge, bloomberg, axios',
    domains: 'bbc.co.uk, techcrunch.com, bloomberg.com, axios.com',
    from: '2018-09-08',
    to: '2018-09-15',
    language: 'en',
    sortBy: 'relevancy',
    page: 1,
  }).then((response) => {
    res.json(response);
  });
};

exports.newsFeedFollowed = (req, res) => {
  const { queryArray } = req.body;
  const companyNames = [];

  queryArray.forEach((company) => {
    companyNames.push(company.name);
  });

  const apiGet = (companyName) => {
    return newsapi.v2.everything({
      q: `${companyName}`,
      sources: 'bbc-news, the-verge, bloomberg, axios',
      domains: 'bbc.co.uk, techcrunch.com, bloomberg.com, axios.com',
      from: '2018-09-08',
      to: '2018-09-15',
      language: 'en',
      sortBy: 'relevancy',
      page: 1
    });
  };

  const makePromise = (names) => {
    const promises = names.map((name) => {
      return apiGet(name);
    });

    return Promise.all(promises);
  };

  makePromise(companyNames)
    .then((resp) => {
      const articlesArray = resp.map((responseObj) => {
        const { articles } = responseObj;
        articles.splice(3);
        return articles;
      });
      const responseArray = articlesArray.reduce((prev, curr) => {
        return prev.concat(curr);
      });

      // Shuffle responseArray before sending
      res.json(shuffleArray(responseArray));
    });
};
