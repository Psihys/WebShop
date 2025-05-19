const express = require('express');
const router = express.Router();
const basketController = require('../controllers/BasketController');
const authMiddleware = require('../middleware/authMiddleware');

// Get user's basket
router.get('/', authMiddleware, basketController.getBasketUser);

// Add device to basket - change from '/add' to '/' to match controller
router.post('/', authMiddleware, basketController.addToBasket);

// Remove device from basket - keep as is or change to '/:deviceId' for consistency
router.delete('/remove/:deviceId', authMiddleware, basketController.deleteDevice);

// Add route for clearing the basket
router.delete('/clear', authMiddleware, basketController.clearBasket);

router.put('/quantity/:deviceId', authMiddleware, basketController.updateQuantity);

module.exports = router;