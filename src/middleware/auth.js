const jwt = require("jsonwebtoken");
const { secret_key } = require("../config");
const Auth = (req, res, next) => {
  const token = req.headers.accesstoken || req.headers.accessToken;

  if (token) {
    const accessToken = token.split(' ')[1];
    jwt.verify(accessToken, secret_key, (err, decoded) => {
      if (err) {
        let errordata = {
          message: err.message,
          expiredAt: err.expiredAt,
        };
        console.log(errordata);
        return res.status(401).json({
          success: false,
          error: {
            message: "Unauthorized Access",
            reason: 'Unauthorized Access'
          }
        });
      }
      req.decoded = decoded;
      next();
    });
  }
  else {
    return res.status(403).json({
      success: false,
      error: {
        message: "Forbidden Access",
        reason: 'Un-Authorized user'
      }
    });
  }
};

module.exports = {
  Auth,
};
