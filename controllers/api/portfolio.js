const Stock = require('../../models/Stock');
const Company = require('../../models/Company');

exports.get_portfolio_value = (req, res, next) => {
  const { currentUserId } = req.body;

  console.log('FIRING GET PORTFOLIO VALUE CONTROLLER!!!');

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
        console.log('StOCK VALUES: ', stockValues);
        done--;
        if (done === 0) {
          console.log('STOCK VALUES ARRAY: ', stockValues);
          const portfolioValue = stockValues.reduce((a, b) => a + b, 0).toFixed(2);
          res.send(portfolioValue);
        }
      });
    });
  });
};
