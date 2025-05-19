const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

// In your models.js file
const BasketDevice = sequelize.define('basket_device', {
  id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
  quantity: {type: DataTypes.INTEGER, defaultValue: 1} // Add this line if it's missing
});


const Device = sequelize.define('device', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
})

const Type = sequelize.define('type', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Brand = sequelize.define('brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
})

const DeviceInfo = sequelize.define('device_info', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
})

const TypeBrand = sequelize.define('type_brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Basket) // 1:1
Basket.belongsTo(User) // 1:1

User.hasMany(Rating) // 1:N
Rating.belongsTo(User) // N:1

Basket.hasMany(BasketDevice) // 1:N
BasketDevice.belongsTo(Basket) // N:1

Type.hasMany(Device) // 1:N
Device.belongsTo(Type) // N:1

Brand.hasMany(Device) // 1:N
Device.belongsTo(Brand) // N:1

Device.hasMany(Rating) // 1:N
Rating.belongsTo(Device) // N:1

Device.hasMany(BasketDevice) // 1:N
BasketDevice.belongsTo(Device, { foreignKey: 'deviceId', as: 'device' }) // N:1

Device.hasMany(DeviceInfo, { as: 'info' }) // 1:N
DeviceInfo.belongsTo(Device) // N:1

Brand.belongsToMany(Type, { through: TypeBrand })
Type.belongsToMany(Brand, { through: TypeBrand })

module.exports = {
  User,
  Basket,
  BasketDevice,
  Device,
  Type,
  Brand,
  Rating,
  DeviceInfo,
  TypeBrand,
}
