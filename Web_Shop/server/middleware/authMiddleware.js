const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: 'Пользователь не авторизован (заголовок отсутствует)' });
    }

    const token = authHeader.split(' ')[1]; // формат: "Bearer <токен>"

    if (!token) {
      return res.status(401).json({ message: 'Пользователь не авторизован (токен отсутствует)' });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;
    next();
  } catch (e) {
    console.log('JWT error:', e.message);
    return res.status(401).json({ message: 'Пользователь не авторизован' });
  }
};
