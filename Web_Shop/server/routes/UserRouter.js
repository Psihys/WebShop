const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController')

router.post('/registration', UserController.registration)
router.post('/login', UserController.login)
router.get('/auth', UserController.check)

module.exports = router;