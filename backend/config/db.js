var mongoose = require("mongoose");
const config = require("./config");

mongoose.connect(config.mongoDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection.on("error", (err) => {
  logError(err);
});
mongoose.connection.on("connected", () => {
  console.log("Database is connected");
});
mongoose.set("useCreateIndex", true);

module.exports = mongoose;
