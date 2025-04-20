const express = require('express');
const router = express.Router();
const TypeController = require('../controllers/TypeController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'), TypeController.create)
router.get('/', TypeController.getAll)

module.exports = router;