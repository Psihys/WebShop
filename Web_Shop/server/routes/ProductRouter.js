const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), ProductController.create)
router.get('/', ProductController.getAll)
router.get('/:id', ProductController.getOne)
router.put('/', checkRole('ADMIN'), ProductController.update)

module.exports = router;