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
    var decodedToken = jwtDecode(req.cookies["TTPY-TOKEN"]);
    var decodedLog = jwtDecode(req.cookies["TTPY-LOG"]);
    req.user = {};
    req.user.userId = decodedToken.userId;
    next();
  } catch (error) {
    responseError(res, 401, error.message);
  }
};

module.exports = {
  jwtDecode: jwtDecode,
  authMiddleware: authMiddleware,
};
