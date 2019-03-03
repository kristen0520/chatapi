var passport = require('passport');

module.exports = (app) => {
  
  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    });

}
