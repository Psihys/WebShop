const uuid = require('uuid')
const path = require('path')
const { Device, DeviceInfo } = require('../models/models')
const ApiError = require('../error/ApiError')
class ProductController {
s

// In your product/device controller create method
async create(req, res, next) {
  try {
    const { name, price, brandId, typeId, info, amount } = req.body
    const { img } = req.files
    let fileName = uuid.v4() + ".jpg"
    img.mv(path.resolve(__dirname, '..', 'static', fileName))
    
    const device = await Device.create({
      name,
      price,
      brandId,
      typeId,
      img: fileName,
      amount: amount || 0 // Make sure to save the amount
    })
    
    // Rest of your existing code
    
    return res.json(device)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}


// Add or modify update method to include amount
async update(req, res, next) {
  try {
    const { id, name, price, brandId, typeId, amount } = req.body
    
    const device = await Device.findByPk(id)
    if (!device) {
      return next(ApiError.badRequest('Device not found'))
    }
    
    // Update fields
    if (name) device.name = name
    if (price) device.price = price
    if (brandId) device.brandId = brandId
    if (typeId) device.typeId = typeId
    if (amount !== undefined) device.amount = amount
    
    await device.save()
    
    return res.json(device)
  } catch (e) {
    next(ApiError.badRequest(e.message))
  }
}

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query
    page = page || 1
    limit = limit || 9
    let offset = page * limit - limit
    let devices
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset })
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      })
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      })
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId, brandId },
        limit,
        offset,
      })
    }
    return res.json(devices)
  }

  async getOne(req, res) {
    const { id } = req.params
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }],
    })
    return res.json(device)
  }
}

module.exports = new ProductController()
