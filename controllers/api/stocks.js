const Stock = require('../../models/Stock');
const Company = require('../../models/Company');

exports.buy_stock = (req, res) => {

  const {
    currentUserId,
    companyId,
    shares,
  } = req.body;

  // Make sure all required arguments are passed
  if (!currentUserId || !companyId) {
    res.status(422).send({ error: 'Both user and company id\'s are required to buy stock' });
  }

  if (!shares) {
    res.status(422).send({ error: 'Number of shares are required to buy stock' });
  }

  const stock = new Stock({
    user_id: currentUserId,
    company_id: companyId,
    num_shares: shares,
  });

  console.log('NEW STOCK ITEM TO BE SAVED: ', stock);

  stock.save();

  res.json(stock);
};

exports.sell_stock = (req, res) => {

  const {
    currentUserId,
    companyId,
    shares,
  } = req.body;

  // Make sure all required arguments are passed
  if (!currentUserId || !companyId) {
    res.status(422).send({ error: 'Both user and company id\'s are required to sell stock' });
  }

  if (!shares) {
    res.status(422).send({ error: 'Number of shares are required to sell stock' });
  }


};


// @TODO: Add logic to update Company price before retrieving stocks
exports.get_stocks = (req, res, next) => {
  const { currentUserId } = req.body;

  const myStocks = [];

  const shareTotals = new Map();

  Stock.find({ user_id: currentUserId }, (err, stocks) => {
    if (err) {
      return next(err);
    }

    stocks.forEach((stock) => {
      const n = shareTotals.get(
        stock.company_id.toString()) === undefined ? 0 : shareTotals.get(stock.company_id.toString()
        );

      shareTotals.set(stock.company_id.toString(), n + stock.num_shares);
    });


    Company.find({ _id: { $in: Array.from(shareTotals.keys()) } }, (error, companies) => {
      if (error) {
        return next(error);
      }

      companies.forEach((company) => {
        console.log('COMPANY IS: ', company);
        console.log('shareTotals: ', shareTotals);
        myStocks.push({
          symbol: company.symbol,
          shares: shareTotals.get(company._id.toString()),
          value: company.price * shareTotals.get(company._id.toString()).toFixed(2),
        });
      });

      console.log('MY STOCKS: ', myStocks);

      res.json(myStocks);
    });
  });
};
