const mongoose = require("../config/db");
var collectionName = "user";

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { collection: collectionName, versionKey: false }
);

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
