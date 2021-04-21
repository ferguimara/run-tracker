const mongoose = require('mongoose');

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
    workouts: [],
}, { timestamps: true});

module.exports = mongoose.model('User', userSchema);