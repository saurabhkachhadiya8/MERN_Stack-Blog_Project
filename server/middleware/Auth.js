const JWT = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(400).send({
        success: false,
        message: 'No token provided'
      });
    }
    let newToken = token.slice(7);
    JWT.verify(newToken, process.env.JWT_SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(400).send({
          success: false,
          message: 'Invalid token'
        });
      }
      req.user = decode.payload;
      return next();
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err
    });
  }
}
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(401).send({
        success: false,
        message: 'You are not authorized to access this resource'
      });
    }
    return next();
  }
}
module.exports = {
  verifyToken, authorizeRole
}