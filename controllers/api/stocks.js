const Stock = require('../../models/Stock');
const Company = require('../../models/Company');

exports.buy_stock = (req, res, next) => {

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

  /*
  // Check to see if Stock matching the user id and company id already exists
  Stock.find({ $and: [{ user_id: currentUserId }, { company_id: companyId }] }, (err, stock) => {
    if (err) {
      return next(err);
    }

    console.log('FOUND THIS STOCK WITH THE PROVIDED USER AND COMPANY ID\'s: ', stock);
    // If Stock for the given user and company already exists, don't create another item yet
    // Instead first delete the existing Stock and only then create a new one
    if (stock) {
      // Delete existing Stock
      stock
    }

    // Once any pre-existing Stock item was deleted, or if no Stock items were returned, create new Stock item

  });
  */

  const stock = new Stock({
    user_id: currentUserId,
    company_id: companyId,
    num_shares: shares,
  });

  console.log('NEW STOCK ITEM TO BE SAVED: ', stock);

  stock.save();

  res.json(stock);
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

    console.log('ALL THE STOCK WE FOUND: ', stocks);

    // let shares = 0;
    stocks.forEach((stock) => {
      const n = shareTotals.get(stock.company_id.toString()) === undefined ? 0 : shareTotals.get(stock.company_id.toString());
      console.log('N is: ', n);
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
          value: company.price * shareTotals.get(company._id.toString())
        });
      });

      console.log('MY STOCKS: ', myStocks);
      res.json(myStocks);

    /*
    let done = 0;
    // Search Companies for companies matching the returned stocks' company_id's
    stocks.forEach((stock) => {
      /*
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
      }); */
    });
  });
};
