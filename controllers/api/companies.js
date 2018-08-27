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
// @TODO: A user should not be able to follow a company twice...make it so
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

exports.get_followed_companies = (req, res, next) => {
  const { currentUserId } = req.body;

  let followedCompanies = [];

  FollowedStock.find({ user_id: currentUserId }, (err, stocks) => {
    if (err) {
      return next(err);
    }

    let done = 0;
    // Search Companies for companies matching the returned stocks' company_id's
    stocks.forEach((stock) => {
      Company.find({ _id: stock.company_id }, (error, company) => {
        if (error) {
          return next(error);
        }

        followedCompanies = [...followedCompanies, ...company];
        done += 1;
        // Once all returned companies have been added to followedCompanies array, send it to client
        if (done === stocks.length) {
          console.log('THIS IS THE FOLLOWED COMPANIES ARRAY BEFORE CHECKING FOR DUPLICATES: ', JSON.stringify(followedCompanies, null, 4));
          // @TODO:
          // Before sending response, check followedCompanies array for duplicates and remove them
          res.send(followedCompanies);
        }
      });
    });
  });
};
