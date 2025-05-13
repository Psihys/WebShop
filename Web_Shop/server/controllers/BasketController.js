const { Basket, BasketDevice, Device } = require('../models/models');
const ApiError = require('../error/ApiError.js');

class BasketController {
    // Добавление устройства в корзину
    async addDevice(req, res, next) {
        const { deviceId } = req.body;
        const { userId } = req.user;
        
        const basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return next(ApiError.badRequest('Корзина не найдена'));
        }

        // Проверка, существует ли уже это устройство в корзине
        const existingDevice = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId } });
        if (existingDevice) {
            return res.status(400).json({ message: 'Устройство уже в корзине' });
        }

        const basketDevice = await BasketDevice.create({ basketId: basket.id, deviceId });
        return res.json(basketDevice);
    }

    // Получение корзины пользователя
    async getBasketUser(req, res, next) {
        const { userId } = req.user;
        const basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return next(ApiError.badRequest('Корзина не найдена'));
        }

        const basketDevices = await BasketDevice.findAll({
            where: { basketId: basket.id },
            include: [{ model: Device, as: 'device' }]
        });

        return res.json(basketDevices);
    }

    // Удаление устройства из корзины
    async deleteDevice(req, res, next) {
        const { deviceId } = req.params; // Используем params для параметра в URL
        const { userId } = req.user;
        
        const basket = await Basket.findOne({ where: { userId } });
        if (!basket) {
            return next(ApiError.badRequest('Корзина не найдена'));
        }

        // Проверяем, есть ли устройство в корзине
        const basketDevice = await BasketDevice.findOne({ where: { basketId: basket.id, deviceId } });
        if (!basketDevice) {
            return next(ApiError.badRequest('Устройство не найдено в вашей корзине'));
        }

        // Удаляем устройство из корзины
        await BasketDevice.destroy({ where: { basketId: basket.id, deviceId } });
        return res.json({ message: 'Устройство удалено из корзины' });
    }
}

module.exports = new BasketController();
