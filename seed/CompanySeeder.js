/*eslint-disable*/

/*
 * Run this file ( node CompanySeeder.js ) to add companies to database 
 */

const mongoose = require('mongoose');
const Company = require('../models/company');

mongoose.connect('mongodb://localhost:27017/rhc', {
  useNewUrlParser: true,
});

const companies = [
  new Company({
    name: 'Amazon',
    symbol: 'AMZN',
    price: 1882.22,
    hq: 'Seattle, WA',
    founded: '1994',
    ceo: 'Jeff Bezos',
    employees: '566,000',
    marketCap: '899.85B',
    priceEarningsRatio: '147.75',
    dividendYield: '0.00',
    averageVolume: '4.39M',
  }),
  new Company({
    name: 'Apple',
    symbol: 'AAPL',
    price: 217.58,
    hq: 'Cupertino, CA',
    founded: '1976',
    ceo: 'Tim Cook',
    employees: '123,000',
    marketCap: '1,012.51B',
    priceEarningsRatio: '18.78',
    dividendYield: '1.56',
    averageVolume: '29.89M'
  }),
];

// Drop Companies from Database before re-seeding
mongoose.connection.collections.companies.drop();

function exit() {
  mongoose.disconnect();
  console.log('EXITING');
}

let i;
let done = 0;

for (i = 0; i < companies.length; i++) {
  companies[i].save((err, result) => {
    done++;
    if (done === companies.length) {
      exit();
    }
  });
}
