const { Basket, BasketDevice, Device } = require('../models/models')
const ApiError = require('../error/ApiError.js')

class BasketController {
  // Добавление устройства в корзину
  // Добавление устройства в корзину
  async addDevice(req, res, next) {
  try {
    const { deviceId } = req.body;
    const { id } = req.user;

    console.log('Adding device to basket:', { deviceId, userId: id });

    // Find or create basket
    let basket = await Basket.findOne({ where: { userId: id } });
    if (!basket) {
      console.log('Basket not found, creating new basket for user:', id);
      basket = await Basket.create({ userId: id });
    }

    const existingDevice = await BasketDevice.findOne({
      where: { basketId: basket.id, deviceId },
    });
    if (existingDevice) {
      // If device already exists, increment quantity instead of returning error
      existingDevice.quantity = existingDevice.quantity + 1;
      await existingDevice.save();
      return res.json(existingDevice);
    }

    const basketDevice = await BasketDevice.create({
      basketId: basket.id,
      deviceId,
      quantity: 1 // Set initial quantity
    });
    return res.json(basketDevice);
  } catch (error) {
    console.error('Error in addDevice:', error);
    return next(
      ApiError.internal(
        'Ошибка при добавлении устройства в корзину: ' + error.message
      )
    );
  }
}


  // Получение корзины пользователя
async getBasketUser(req, res, next) {
  try {
    const { id } = req.user;
    
    // Find or create basket
    let basket = await Basket.findOne({ where: { userId: id } });
    if (!basket) {
      basket = await Basket.create({ userId: id });
      return res.json([]); // Return empty array for new basket
    }

    const basketDevices = await BasketDevice.findAll({
      where: { basketId: basket.id },
      include: [{ model: Device, as: 'device' }],
      attributes: ['id', 'deviceId', 'quantity'] // Make sure to include quantity
    });

    return res.json(basketDevices);
  } catch (error) {
    console.error('Error in getBasketUser:', error);
    return next(ApiError.internal('Ошибка при получении корзины: ' + error.message));
  }
}


  // Удаление устройства из корзины
  // Удаление устройства из корзины
async deleteDevice(req, res, next) {
  try {
    const deviceId = Number(req.params.deviceId); // Convert to number
    const { id } = req.user; // Use id instead of userId

    console.log('Removing device from basket:', { deviceId, userId: id });

    const basket = await Basket.findOne({ where: { userId: id } });
    if (!basket) {
      return next(ApiError.badRequest('Корзина не найдена'));
    }

    // Проверяем, есть ли устройство в корзине
    const basketDevice = await BasketDevice.findOne({
      where: { basketId: basket.id, deviceId },
    });
    if (!basketDevice) {
      return next(
        ApiError.badRequest('Устройство не найдено в вашей корзине')
      );
    }

    // Удаляем устройство из корзины
    await BasketDevice.destroy({ where: { basketId: basket.id, deviceId } });
    return res.json({ message: 'Устройство удалено из корзины' });
  } catch (error) {
    console.error('Error in deleteDevice:', error); // Add error logging
    return next(
      ApiError.internal('Ошибка при удалении устройства из корзины: ' + error.message)
    );
  }
}


  // Очистка корзины пользователя
  async clearBasket(req, res, next) {
    try {
      const { id } = req.user;

      const basket = await Basket.findOne({ where: { id } })
      if (!basket) {
        return next(ApiError.badRequest('Корзина не найдена'))
      }

      // Удаляем все устройства из корзины
      await BasketDevice.destroy({ where: { basketId: basket.id } })
      return res.json({ message: 'Корзина очищена' })
    } catch (error) {
      return next(ApiError.internal('Ошибка при очистке корзины'))
    }
  }


  // Обновление количества устройства в корзине
async updateQuantity(req, res, next) {
  try {
    const { deviceId } = req.params;
    const { quantity } = req.body;
    const { id } = req.user;
    
    if (!quantity || quantity < 1) {
      return next(ApiError.badRequest('Количество должно быть больше 0'));
    }
    
    const basket = await Basket.findOne({ where: { userId: id } });
    if (!basket) {
      return next(ApiError.badRequest('Корзина не найдена'));
    }
    
    // Проверяем, есть ли устройство в корзине
    const basketDevice = await BasketDevice.findOne({
      where: { basketId: basket.id, deviceId }
    });
    
    if (!basketDevice) {
      return next(ApiError.badRequest('Устройство не найдено в вашей корзине'));
    }
    
    // Обновляем количество
    basketDevice.quantity = quantity;
    await basketDevice.save();
    
    return res.json(basketDevice);
  } catch (error) {
    console.error('Error updating quantity:', error);
    return next(ApiError.internal('Ошибка при обновлении количества устройства в корзине'));
  }
}

  
}

module.exports = new BasketController()
