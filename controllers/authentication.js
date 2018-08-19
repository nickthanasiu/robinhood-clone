const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

const tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
};


exports.signup = (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
  } = req.body;

  console.log('REQ BODY: ', req.body);

  // Make sure all required fields are included in SignupForm
  if (!firstName || !lastName || !email || !password) {
    return res.status(422).send({ error: 'Missing required field(s)' });
  }

  // See if user with given email exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // If a user with submitted email already does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is already in use' });
    }

    // If a user with submitted email does NOT exist, create and save user record
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // Save user
    user.save((saveError) => {
      if (saveError) {
        return next(saveError);
      }

      // Response to request, inficating user was created
      res.json({ token: 'Here\'s a token, baby'});
    });
  });
};
