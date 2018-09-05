const Stock = require('../../models/Stock');
const Company = require('../../models/Company');

exports.buy_stock = (req, res) => {
  const {
    currentUserId,
    companyId,
    companyPrice,
    shares,
  } = req.body;

  if (!currentUserId || !companyId) {
    res.status(422).send({ error: 'Both user and company id\'s are required to buy stock' });
  }

  if (!companyPrice || !shares) {
    res.status(422).send({ error: 'Company price and number of shares are required to buy stock' });
  }

  const stock = new Stock({
    user_id: currentUserId,
    company_id: companyId,
    price: companyPrice,
    num_shares: shares,
  });

  console.log('NEW STOCK ITEM TO BE SAVED: ', stock);

  stock.save();

  res.json(stock);
};


// @TODO: Add logic to update Company price before retrieving stocks
exports.get_stocks = (req, res, next) => {
  const { currentUserId } = req.body;

  let myStocks = [];

  Stock.find({ user_id: currentUserId }, (err, stocks) => {
    if (err) {
      return next(err);
    }

    let done = 0;
    // Search Companies for companies matching the returned stocks' company_id's
    stocks.forEach((stock) => {
      Company.find({ _id: stock.company_id}, (error, company) => {
        if (error) {
          return next(error);
        }

        myStocks = [...myStocks, ...company];
        done++;
        // Once all returned companies have been added to myStocks array, send it to client
        if (done === stocks.length) {
          res.json(myStocks);
        }
      });
    });
  });
};
