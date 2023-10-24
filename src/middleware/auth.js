const jwt = require("jsonwebtoken");
const { secret_key } = require("../config");
const Auth = (req, res, next) => {
  //   console.log(req);
  const token = req.headers.accesstoken;
  // console.log("token : ", token);
  if (token) {
    jwt.verify(token, secret_key, function (err, decoded) {
      if (err) {
        let errordata = {
          message: err.message,
          expiredAt: err.expiredAt,
        };
        console.log(errordata);
        return res.status(401).json({
          message: "Unauthorized Access",
        });
      }
      req.decoded = decoded;
      // console.log("decoded ID : ", decoded);
      next();
    });
  } else {
    return res.status(403).json({
      message: "Forbidden Access",
    });
  }
};

module.exports = {
  Auth,
};
