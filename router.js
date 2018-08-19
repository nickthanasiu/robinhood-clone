const AuthenticationController = require('./controllers/authentication');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.send({ hi: 'there' });
  });

  app.post('/signup', AuthenticationController.signup);
};
