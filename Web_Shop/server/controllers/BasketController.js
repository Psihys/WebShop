const { Basket, BasketDevice, Device } = require('../models/Basket.js')
const ApiError = require('../error/ApiError.js')

class BasketController{
    async addDevice(req,res,next){
        const {deviceId} = req.body
        const {userId} = req.user
        
        const basket = await Basket.findOne({where: {userId}})
        if(!basket){
            return next(ApiError.badRequest('Корзина не найдена'))
        }
        const basketDevice = await BasketDevice.create({basketId: basket.id, deviceId})
        return res.json(basketDevice)
        
    }

    async getBasketUser(req, res, next){
        const {userId} = req.user
        const basket = await Basket.findOne({where: {userId}})
        if(!basket){
            return next(ApiError.badRequest('Корзина не найдена'))
        }
        const basketDevices = await BasketDevice.findAll({where: {basketId: basket.id}, include: [{model: Device, as: 'device'}]})
        return res.json(basketDevices)
    }

    async deleteDevice(req, res, next){
        const {deviceId} = req.body
        const {userId} = req.user
        const basket = await Basket.findOne({where: {userId}})
        if(!basket){
            return next(ApiError.badRequest('Корзина не найдена'))
        }
        const basketDevice = await BasketDevice.destroy({where: {basketId: basket.id, deviceId}})
        return res.json(basketDevice)
    }
}

module.exports = new BasketController()