const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/BrandController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), BrandController.create)
router.get('/', BrandController.getAll)

module.exports = router;