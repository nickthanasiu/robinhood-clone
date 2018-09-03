/*eslint-disable*/

/*
 * Run this file ( node CompanySeeder.js ) to add companies to database
 */

const mongoose = require('mongoose');
const Company = require('../models/Company');

mongoose.connect('mongodb://localhost:27017/rhc', {
  useNewUrlParser: true,
});

const companies = [
  new Company({
    name: 'Amazon',
    symbol: 'AMZN',
    price: 1882.22,
    description: 'Amazon.com, Inc. engages in the provision of online retail shopping services. It operates through the following segments: North America, International, and Amazon Web Services (AWS).',
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
    description: 'Apple, Inc. engages in the design, manufacture, and marketing of mobile communication, media devices, personal computers, and portable digital music players. It operates through the following geographical segments: Americas, Europe, Greater China, Japan, and Rest of Asia Pacific.',
    price: 217.58,
    hq: 'Cupertino, CA',
    founded: '1976',
    ceo: 'Tim Cook',
    employees: '123,000',
    marketCap: '1,012.51B',
    priceEarningsRatio: '18.78',
    dividendYield: '1.56',
    averageVolume: '29.89M',
  }),
  new Company({
    name: 'Disney',
    symbol: 'DIS',
    price: 111.93,
    description: 'The Walt Disney Company, also called Disney, is a diversified international family entertainment and media enterprise. It operates through four business segments: Media Networks, Parks & Resorts, Studio Entertainment and Consumer Products & Interactive Media.',
    hq: 'Burbank, CA',
    founded: '1923',
    ceo: 'Robert Iger',
    employees: '199,000',
    marketCap: '173.91B',
    priceEarningsRatio: '15.62',
    dividendYield: '1.58',
    averageVolume: '8.40M',
  }),
  new Company({
    name: 'Facebook',
    symbol: 'FB',
    price: 174.64,
    description: 'Facebook, Inc. engages in the development of social media applications for people to connect through mobile devices, personal computers, and other surfaces. It enables users to share opinions, ideas, photos, videos, and other activities online.',
    hq: 'Menlo Park, CA',
    founded: '2004',
    ceo: 'Mark Zuckerberg',
    employees: '25,105',
    marketCap: '536.83B',
    priceEarningsRatio: '28.60',
    dividendYield: '0.00',
    averageVolume: '23.39M',
  }),
  new Company({
    name: 'Twitter',
    symbol: 'TWTR',
    price: 34.28,
    description: 'Twitter, Inc., also called Twitter, is a global platform for public self-expression and conversation in real time. It provides a network that connects users to people, information, ideas, opinions, and news.',
    hq: 'San Francisco, CA',
    founded: '2006',
    ceo: 'Jack Dorsey',
    employees: '3,372',
    marketCap: '24.96B',
    priceEarningsRatio: '109.72',
    dividendYield: '0.00',
    averageVolume: '25.23M',
  }),
];

// Drop Companies from Database before re-seeding
mongoose.connection.collections.companies.drop();


let done = 0;

for (let i = 0; i < companies.length; i++) {
  companies[i].save((err, result) => {
    console.log('SAVING ANOTHER COMPANY');
    done++;
    if (done === companies.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
  console.log('EXITING');
}
