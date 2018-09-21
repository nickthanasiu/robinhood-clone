const axios = require('axios');
const Stock = require('../../models/Stock');
const Company = require('../../models/Company');

const API_KEY = 'KMUV9GNYBNT67P4R';
const API_URL = 'https://www.alphavantage.co';

exports.get_portfolio_value = (req, res, next) => {
  const { currentUserId } = req.body;

  if (!currentUserId) {
    res.status(422).send({ Error: 'The current user\'s id is required to look up their portfolio value' });
  }

  // Find all stocks owned by current user
  Stock.find({ user_id: currentUserId }, (err, stocks) => {
    if (err) {
      return next(err);
    }

    const stockValues = [];
    let done = stocks.length;

    // For each stock, look up the current price for the company,
    // then multiply by number of shares owned by user
    stocks.forEach((stock) => {
      Company.find({ _id: stock.company_id }, (err, company) => {
        const companyPrice = company[0].price.toFixed(2);
        const { num_shares } = stock;
        const stockValue = num_shares * companyPrice;
        stockValues.push(stockValue);
        done--;
        if (done === 0) {
          const portfolioValue = stockValues.reduce((a, b) => a + b, 0).toFixed(2);
          res.send(portfolioValue);
        }
      });
    });
  });
};

exports.portfolio_intraday = async (req, res) => {
  const { symbols } = req.body;

  const apiGet = async (symbol) => {
    const response = await axios.get(`${API_URL}/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`);
    const metaData = Object.values(response.data)[0];
    const timeData = Object.values(response.data)[1];

    const timePoints = Object.keys(timeData);
    const pricePoints = Object.values(timeData);
    // Map timePoints to prices using the 'close' value for each 5 minute interval
    const responseObj = {};

    const closePoints = [];
    for (let i = 0; i < pricePoints.length; i++) {
      closePoints.push(pricePoints[i]['4. close']);
    }

    for (let i = 0; i < timePoints.length; i++) {
      responseObj[timePoints[i]] = closePoints[i];
    }

    return responseObj;
  };


  const promises = symbols.map((symbol) => {
    return apiGet(symbol);
  });

  Promise.all(promises)
    .then((values) => {
      const timeKeys = Object.keys(values[0]);
      const sumObject = {};

      for (let i; i < timeKeys.length; i++) {
        console.log('ANOTHER KEY: ', timeKeys[i]);
      }
    });
};
