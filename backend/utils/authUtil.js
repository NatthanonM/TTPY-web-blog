const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { responseError } = require("./response");

const jwtDecode = (token) => {
  try {
    let decoded = jwt.verify(token, config.jwtSecret);
    return decoded;
  } catch (error) {
    throw new Error("Unauthorized");
  }
};

const authMiddleware = (req, res, next) => {
  try {
    // console.log(req.cookies);
    var decoded = jwtDecode(req.cookies.jwt);
    req.user = {};
    req.user.userId = decoded.userId;
    next();
  } catch (error) {
    // console.log(error);
    responseError(res, 401, error.message);
  }
};

module.exports = {
  jwtDecode: jwtDecode,
  authMiddleware: authMiddleware,
};
