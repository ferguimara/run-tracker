const User = require('../models/user');

module.exports = {
    new: newUser,
    create,
    index,
    show,
  };
  
function newUser(req, res) {
    res.render('users/new', {title: 'Add User'});
}

function create(req, res) {
    User.create(req.body, function(err, user){
        res.redirect('/users/new')
    })
}

function index (req, res) {
    User.find({}, function (err, users){
        res.render('users/index', {
            users,
            title: 'All Users',
        })
    })
}

function show (req, res) {
    User.findById(req.params.id, function(err, user) {
        res.render('users/show', {
            title: 'User Detail', 
            user,
        });
    });
}

//non-exported functions
function convertTime (time) {
    let hours;
    let minutes;
    let seconds;
    let convertedTime;
    let re = /[0-99]+/g;
    if(time.match(re).length === 3){
      seconds = time.match(re).splice(2,1);
      minutes = time.match(re).splice(1,1);
      hours = time.match(re).splice(0,1);
      convertedTime = hours + ':' + minutes + ':' + seconds;
    //   console.log(convertedTime);
    }else if(time.match(re).length ===2){
      seconds = time.match(re).splice(2,1);
      minutes = time.match(re).splice(1,1);
      convertedTime = minutes + ':' + seconds;
    //   console.log(convertedTime);
    }else{
      seconds = time.match(re).splice(2,1);
      convertedTime = seconds;
    //   console.log(convertedTime);
    }
    return convertedTime
  }

  function returnTime (time) {
      if (time.length){
          convertTime(time);
      }else{
          return;
      }
  }