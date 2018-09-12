const axios = require('axios');
const Company = require('../../models/Company');
const { cacheShouldRefresh } = require('../../src/util/market_data_util');


const API_KEY = 'KMUV9GNYBNT67P4R';
const API_URL = 'https://www.alphavantage.co';

// @TODO: Catch errors

exports.latest_price = async (req, res, next) => {

  const { symbol } = req.body;

  const cache = new Map();

  const apiGet = async () => {
    const response = await axios.get(`${API_URL}/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`);
    const metaData = Object.values(response.data)[0];
    const timeData = Object.values(response.data)[1];
    const lastRefresh = Object.values(metaData)[2];
    const lastData = Object.values(timeData[lastRefresh]);
    const lastClose = lastData[3];

    return {
      time: lastRefresh,
      value: lastClose
    };
  };

  let cacheVal = cache.get(symbol);
  if (!cacheVal || cacheShouldRefresh(cacheVal.time)) {
    console.log('Retrieving fresh prices!!!');
    const retrieve = await apiGet();
    console.log(retrieve);
    cache.set(symbol, retrieve);
    cacheVal = retrieve;
  }

  // Update Company's price in DB with the latest price
  Company.findOneAndUpdate({ symbol }, { $set: { price: cacheVal.value } }, (err, company) => {
    if (err) {
      return next(err);
    }
  });

  // Send latest price to client
  res.json(cacheVal.value.toFixed(2));
};

exports.intraday_data = async (req, res) => {
  const { symbol } = req.body;

  //const cache = new Map();

  const response = await axios.get(`${API_URL}/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`);
  const metaData = Object.values(response.data)[0];
  const timeData = Object.values(response.data)[1];
  const lastRefresh = Object.values(metaData)[2];

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

  // console.log("INTRADAY_DATA RESPONSE: ", responseObj);
  res.json(responseObj);
};

exports.daily_data = async (req, res) => {
  const { query } = req.body;
  const response = await axios.get(`${API_URL}/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${API_KEY}`);
  const responseData = Object.values(response.data)[1];
  console.log(responseData);
  res.json(responseData);
};
