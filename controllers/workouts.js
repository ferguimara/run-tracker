const User = require('../models/user')

module.exports = {
	new: newWorkout,
    create,
};

function newWorkout(req, res) {
    console.log(req.params.id);
    //we need to findbyid to then insert the workout into that user
    User.findById(req.params.id, function (err, user){
        res.render('workouts/new', {title: 'Add Workout', user})
    })
}

function create(req, res){
    console.log(req.params.id, 'is the id')
    for (let key in req.body){
        if (req.body[key]==="") delete req.body[key];
    }
    User.findById(req.params.id, function (err, user) {
		console.log(user, 'is the user');
        if(err){
            console.log(err);
            return;
        }
        user.workouts.push(req.body);
		user.save(function(){
			res.redirect(`/users/${req.params.id}`);
		})
	})
}