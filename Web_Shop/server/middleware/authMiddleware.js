const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Пользователь не авторизован' })
    }
    console.log('SECRET_KEY used for decoding:', process.env.SECRET_KEY)
    const decode = jwt.verify(token, process.env.SECRET_KEY)

    req.user = decode
    next()

  } catch (e) {
    console.log('JWT error:', e.message)
    res.status(401).json({ message: 'Пользователь не авторизован' })
  }
}
