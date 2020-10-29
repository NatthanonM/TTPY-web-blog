require("dotenv").config();

module.exports = {
  mongoDB: process.env.MONGO_DB || "",
  appPort: process.env.APP_PORT || 0,
};
