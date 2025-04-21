const { Rating } = require('../models/models')
const ApiError = require('../error/ApiError')

class RatingController {
  async addRating(req, res, next) {
    const { deviceId, rate } = req.body
    const { userId } = req.user

    if (!rate || rate < 1 || rate > 5) {
      return next(
        ApiError.badRequest('Оцінка має бути в діапазоні від 1 до 5.')
      )
    }

    const existingRating = await Rating.findOne({ where: { deviceId, userId } })
    if (existingRating) {
      existingRating.rate = rate
      await existingRating.save()
      return res.json(existingRating)
    }

    const rating = await Rating.create({ userId, deviceId, rate })
    return res.json(rating)
  }

  async getRating(req, res) {
    const { deviceId } = req.query
    const ratings = await Rating.findAll({ where: { deviceId } })

    if (ratings.length === 0) {
      return res.json({ averageRating: 0 })
    }

    const averageRating = ratings.reduce((sum, rating) => sum + rating.rate, 0) / ratings.length;
    return res.json({ averageRating });
  }
}

module.exports = new RatingController()
