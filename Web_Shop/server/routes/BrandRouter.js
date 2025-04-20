const express = require('express');
const router = express.Router();
const BrandController = require('../controllers/BrandController')

router.post('/', BrandController.create)
router.get('/', BrandController.getAll)

module.exports = router;