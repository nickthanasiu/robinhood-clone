const Stock = require('../../models/Stock');
const Company = require('../../models/Company');

exports.buy_stock = (req, res, next) => {

  const {
    currentUserId,
    companyId,
    companyName,
    companySymbol,
    companyPrice,
    shares,
  } = req.body;

  // Make sure all required arguments are passed
  if (!currentUserId || !companyId) {
    res.status(422).send({ error: 'Both user and company id\'s are required to buy stock' });
  }

  if (!companyPrice || !shares) {
    res.status(422).send({ error: 'Company price and number of shares are required to buy stock' });
  }

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
    const stock = new Stock({

    });
  });

  const stock = new Stock({
    user_id: currentUserId,
    company_id: companyId,
    company_name: companyName,
    company_symbol: companySymbol,
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

  // let myStocks = [];

  let shareTotals = new Map();

  Stock.find({ user_id: currentUserId }, (err, stocks) => {
    if (err) {
      return next(err);
    }


    let shares = 0;
    stocks.forEach((stock) => {
      const n = shareTotals.get(stock.company_id) === undefined ? 0 : shareTotals.get(stock.company_id);
      shareTotals.set(stock.company_id, stock.num_shares);
    });


    Company.find({ _id: stock.company_id} , (err, company) => {

    });

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
      });*/
    });*/
  });
};
