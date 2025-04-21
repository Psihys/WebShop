const express = require('express');
const router = express.Router();
const raitingController = require('../controllers/RatingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/',authMiddleware, raitingController.addRating)
router.get('/:deviceId', raitingController.getRating)

module.exports = router;