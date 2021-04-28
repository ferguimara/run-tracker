const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');

router.get('/', usersCtrl.index);
router.get('/new', usersCtrl.new);
router.get('/:id', usersCtrl.show);
router.post('/', usersCtrl.create);
router.delete('/:id', usersCtrl.delete);
router.get('/:id/edit', usersCtrl.edit);
router.put('/:id', usersCtrl.update);

module.exports = router;