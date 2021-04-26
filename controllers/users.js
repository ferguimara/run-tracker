const User = require('../models/user');

module.exports = {
    new: newUser,
    create,
    index,
    show,
};

function newUser(req, res) {
    res.render('users/new', {
        title: 'Add User'
    });
}

function create(req, res) {
    for (let key in req.body){
        if (req.body[key]==="") delete req.body[key];
    }
    User.create(req.body, function (err, user) {
        res.redirect('/users/new')
    })
}

function index(req, res) {
    User.find({}, function (err, users) {
        res.render('users/index', {
            users,
            title: 'All Users',
        })
    })
}

function show(req, res) {
    let times = new Array;
    User.findById(req.params.id, function (err, user) {
        user.workouts.forEach(workout => {
            times.push(workout.time)
        });
        console.log(times + 'is our array of times')
        console.log(typeof(times))
        console.log(times.length, 'is the length')
        const arr = []
        for(const time in times) {
            console.log(`${time}: ${times[time]}`)
            arr.push(times[time])
        }
        console.log(arr, 'is the arr')
        const avgTime = getAverageTime(arr);
        console.log(avgTime)
        // const avgPace = getAverageTime(user.workouts[pace]);
        res.render('users/show', {
            title: 'User Detail',
            user,
            //if else statement with length
            // avgTime,
            // avgPace,
        });
    });
}

//non-exported functions
//workout.forEach(workouts){}
//function getaverageMile(workout){

//}

function getAverageTime(workouts) {
    //build array
    // let times;
    let length;
    if (workouts.length === 7) {
        length = 7;
    } else {
        length = workouts.length;
    }
    // for (let i = 0; i < length; i++) {
    //     times = workouts.pop();
    // }
    //loop through times
    let hours;
    let minutes;
    let seconds;
    let totalSeconds;
    let timesInSeconds = [];
    let convertedTime;
    let re = /[0-99]+/g;
    // workouts.forEach(time => {

    // })
    for (let i = 0; i < length; i++) {
        //parse using regex
        let time = workouts[i];
        if (time.match(re).length === 3) {
            console.log('length is 3')
            seconds = Number(time.match(re).splice(2, 1));
            minutes = Number(time.match(re).splice(1, 1));
            hours = Number(time.match(re).splice(0, 1));
            console.log(seconds, 'seconds', minutes, 'minutes', hours, 'hours')
            //   convertedTime = hours + ':' + minutes + ':' + seconds;
            //   console.log(convertedTime);
        } else if (time.match(re).length === 2) {
            console.log('length is 2')
            console.log(time.match(re))
            seconds = Number(time.match(re).splice(1, 1));
            minutes = Number(time.match(re).splice(0, 1));
            console.log(seconds, 'seconds', minutes, 'minutes')
            //   convertedTime = minutes + ':' + seconds;
            //   console.log(convertedTime);
        } else {
            console.log('length is 1')
            seconds = Number(time.match(re).splice(2, 1));
            console.log(seconds, 'seconds')
            //   convertedTime = seconds;
            //   console.log(convertedTime);
        }
        //find value in seconds of time
        totalSeconds = hours * 60 * 60;
        totalSeconds += minutes * 60;
        totalSeconds += seconds;
        //add to array
        timesInSeconds[i] = totalSeconds;
        hours = ''
        minutes = ''
        seconds = ''
    }
    //find average timesInSeconds
    let total = 0;
    console.log(timesInSeconds);
    for (let j = 0; j < length; j++) {
        total = total + Number(timesInSeconds[j]);
    }
    let avg = Math.round(total / length);
    console.log('avg secs: ' + avg);
    //turn seconds back into a time
    let avgMins = Math.floor(avg / 60);
    let avgSecs = avg - (60 * avgMins);
    let avgHrs = Math.floor(avgMins / 60);
    console.log('hours: ' + avgHrs);
    avgMins = avgMins - (60 * avgHrs);
    //adding leading zeros for seconds, minutes
    avgSecs = ('0' + avgSecs).slice(-2);
    avgMins = ('0' + avgMins).slice(-2);
    convertedTime = avgHrs + ':' + avgMins + ':' + avgSecs
    console.log(convertedTime, 'is the converted time')
    return convertedTime
}
