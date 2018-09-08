const jwt = require('jwt-simple');
const { secret } = require('../config/config');
const User = require('../models/User');

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
