const passport = require('passport');
const AuthenticationController = require('../controllers/authentication');
const CompaniesController = require('../controllers/api/companies');
const NewsfeedController = require('../controllers/api/newsfeed');
const passportService = require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  app.get('/api/get_companies', CompaniesController.get_companies);
  app.post('/signin', requireSignin, AuthenticationController.signin);
  app.post('/signup', AuthenticationController.signup);
  app.post('/api/search_companies', CompaniesController.search_companies);
  app.post('/api/follow_company', CompaniesController.follow_company);
  app.post('/api/unfollow_company', CompaniesController.unfollow_company);
  app.post('/api/get_followed_companies', CompaniesController.get_followed_companies);
  app.post('/api/newsfeed', NewsfeedController.newsFeed);
};
