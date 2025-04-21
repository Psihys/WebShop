const express = require('express');
const router = express.Router();
const DeviceController = require('../controllers/DeviceController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)

module.exports = router;