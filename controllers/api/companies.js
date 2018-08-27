const Company = require('../../models/Company');
const FollowedStock = require('../../models/FollowedStock');

exports.search_companies = (req, res, next) => {
  console.log(req.body);
  const { symbol, name } = req.body;

  // Make sure a Company's Symbol or Name was passed
  if (!symbol && !name) {
    res.status(422).send({ error: 'Your Search must contain name or symbol' });
  }

  // Check if Company with given symbol exists in db
  Company.find({ $or: [{ symbol }, { name }] }, (err, company) => {
    if (err) {
      return next(err);
    }

    // company is returned as an array
    // if the company we're looking for is not in the database
    // an empty array is returned
    if (company.length === 0) {
      res.status(422).send({ error: 'Could not find a company with that symbol' });
    }

    res.json(company);
  });
};

// @TODO: Catch Errors
exports.follow_company = (req, res, next) => {
  const { currentUserId, companyId } = req.body;

  // Create a followedStock with the provided ID's
  const stock = new FollowedStock({
    user_id: currentUserId,
    company_id: companyId,
  });

  console.log('THIS IS THE STOCK ITEM WE CREATED: ', stock);

  stock.save();

  res.json(stock);
};

// @TODO: Catch Errors
exports.get_followed_companies = (req, res) => {
  const { currentUserId } = req.body;

  const companies = [];

  FollowedStock.find({ user_id: currentUserId }, (err, stocks) => {
    console.log('THESE ARE THE STOCKS WE FOUND: ', stocks);

    // Search Companies for companies matching the returned stocks' company_id's
    stocks.forEach((stock) => {
      console.log(stock.company_id);
      Company.find({ _id: stock.company_id }, (error, company) => {
        console.log('FOUND THIS COMPANY: ', company);
      });
    });
    console.log('THIS IS THE COMPANIES ARRAY: ', companies);
  });
};
