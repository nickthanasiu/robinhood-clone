const passport = require('passport');
const AuthenticationController = require('../controllers/authentication');
const CompaniesController = require('../controllers/api/companies');
const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.post('/signin', requireSignin, AuthenticationController.signin);
  app.post('/signup', AuthenticationController.signup);
  app.post('/api/search_companies', CompaniesController.search_companies);
  app.post('/api/follow_company', CompaniesController.follow_company);
  app.post('/api/get_followed_companies', CompaniesController.get_followed_companies);
};
