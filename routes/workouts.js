const express = require('express');
const router = express.Router();
const workoutsCtrl = require('../controllers/workouts');

router.get('/users/:id/workouts/new', workoutsCtrl.new)
router.post('/workouts/:id/', workoutsCtrl.create)

module.exports = router;