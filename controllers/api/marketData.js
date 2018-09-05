const axios = require('axios');
const util = require('util');

const API_KEY = 'KMUV9GNYBNT67P4R';
const API_URL = 'https://www.alphavantage.co';

// @TODO: Catch errors

exports.intraday_data = async (req, res) => {
  const { query } = req.body;

  const response = await axios.get(`${API_URL}/query?function=TIME_SERIES_INTRADAY&symbol=${query}&interval=5min&apikey=${API_KEY}`);
  const responseData = Object.values(response.data)[1];
  console.log(responseData);
  res.json(responseData);
};

exports.daily_data = async (req, res) => {
  const { query } = req.body;
  const response = await axios.get(`${API_URL}/query?function=TIME_SERIES_DAILY&symbol=${query}&apikey=${API_KEY}`);
  const responseData = Object.values(response.data)[1];
  console.log(responseData);
  res.json(responseData);
};
