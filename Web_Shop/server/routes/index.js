const express = require('express');
const router = express.Router();

const userRouter = require('./UserRouter');
const deviceRouter = require('./DeviceRouter');
const brandRouter = require('./BrandRouter');
const typeRouter = require('./TypeRouter');
const basketRouter = require('./BasketRouter');
const ratingRouter = require('./RatingRouter');

router.use('/user' , userRouter)
router.use('/device' , deviceRouter)
router.use('/brand' , brandRouter)
router.use('/type', typeRouter) 
router.use('/basket', basketRouter)
router.use('/rating', ratingRouter)

module.exports = router;