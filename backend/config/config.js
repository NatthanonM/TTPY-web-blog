require("dotenv").config();

module.exports = {
  mongoDB: process.env.MONGO_DB || "",
  appPort: process.env.APP_PORT || 0,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30d",
  jwtCookieExpires: process.env.JWT_COOKIE_EXPIRES || 30,
  cryptoKey: process.env.CRYPTO_KEY || "",
  cryptoAlgorithm: process.env.CRYPTO_ALGORITHM || "aes-128-cbc",
};
