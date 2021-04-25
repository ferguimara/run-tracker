const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: function(){
            let currentDate = new Date(); 
            let dateTime =  (currentDate.getMonth()) + "/" + currentDate.getDate() + "/" + (currentDate.getFullYear())  + " " +currentDate.getHours() + ":"   + currentDate.getMinutes() + ":" + currentDate.getSeconds();
            return dateTime;
        }
    },
    miles: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    pace: {
        type: String,
        required: true,
    },
}, {timestamps: true})

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: { 
        type: Number,
        required: true,
    },
    event: {
        type: String,
        enum: ['5K', 'Half-Marathon', 'Marathon', 'Other']
    },
    workouts: [workoutSchema],
}, { timestamps: true});


module.exports = mongoose.model('User', userSchema);