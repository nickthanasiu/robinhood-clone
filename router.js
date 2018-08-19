const passport = require('passport');
const AuthenticationController = require('./controllers/authentication');
const passportService = require('./services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local',{ session: false });

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ hi: 'there' });
  });

  app.post('/signup', AuthenticationController.signup);
  app.post('/signin', requireSignin, Authentication.signin);
};
