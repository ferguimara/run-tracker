const User = require('../models/user');

module.exports = {
    new: newUser,
    create,
    index,
  };
  
  function newUser(req, res) {
      res.render('users/new');
  }

  function create(req, res) {
      user.create(req.body, function(err, user){
          res.redirect('/users/new')
      })
  }

  function index (req, res) {
      User.find({}, function (err, users){
          res.render('users/index', {
              users
          })
      })
  }