const jwt = require('jwt-simple');
const { secret } = require('../config/config');
const User = require('../models/User');
const Stock = require('../models/Stock');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, secret);
}

exports.signin = (req, res) => {
  const { user } = req;
  res.send({
    token: tokenForUser(user),
    currentUserId: user._id,
  });
};

exports.signup = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password
  } = req.body;

  let signupError = '';

  // Make sure all required fields are included in signup
  if (!firstName || !lastName || !email || !password) {
    return res.status(422).send({ error: 'Missing required field(s)' });
  }

  // Check if user with given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // If a user with provided email already exists, return error
    if (existingUser) {
      return res.status(422).send({ error: 'Provided email is already in use' });
    }

    // If a user with provided email does NOT exist,
    // create and save user record

    // Create user
    const user = new User({
      firstName,
      lastName,
      email,
      password
    });

    // Upon signing up, the new user will have one share of Facebook stock
    // Create stock
    // @TODO: Facebook will get a new company_id every time the DB is seeded with
    //        new company data
    //        This should be addressed, probably by searching DB for FB's _id
    // @TODO: Perhaps replace Facebook with a different company
    const facebookStock = new Stock({
      user_id: user._id,
      company_id: '5ba70f4f12c65d0ec4f76d03',
      num_shares: 1
    });

    console.log();

    // Save Facebook Stock
    facebookStock.save((error) => {
      if (error) {
        return next(err);
      }
    });

    // Save user
    user.save((error) => {
      if (error) {
        return next(error);
      }

      // Respond to request by sending user a token
      res.json({ token: tokenForUser(user) });
    });
  });
};
