const axios = require('axios');


const API_KEY = 'KMUV9GNYBNT67P4R';
const API_URL = 'https://www.alphavantage.co';


const cacheShouldRefresh = (timestamp) => {
  const now = new Date(Date.now());
  if (now.getDay() === 0 || now.getDay() === 6) {
    return false;
  }

  const date = new Date(timestamp);
  let diff = (now.getTime() - date.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff)) > 5;
};

const cache = new Map();

// @TODO: Catch errors

exports.latest_price = async (req, res) => {

  const { symbol } = req.body;

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
  res.json(cacheVal.value);
};

exports.daily_data = async (req, res) => {
  const { query } = req.body;
  const response = await axios.get(`${API_URL}/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${API_KEY}`);
  const responseData = Object.values(response.data)[1];
  console.log(responseData);
  res.json(responseData);
};
