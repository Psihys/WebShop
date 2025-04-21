const express = require('express');
const router = express.Router();
const basketController = require('../controllers/BasketController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, basketController.getBasketUser);
router.post('/add',authMiddleware, basketController.addDevice);
router.delete('/remove/:deviceId',authMiddleware, basketController.deleteDevice);

module.exports = router;