const UserModel = require("../model/user");
const { responseError, responseSuccess } = require("../utils/response");

const userController = {
  getAllUser: async (req, res) => {
    try {
      var users = await UserModel.find();
      return responseSuccess(res, 200, users);
    } catch (err) {
      return responseError(res, 500, "Internal Server");
    }
  },
  createUser: async (req, res) => {
    var newUser = new erMUsodel(req.body);
    try {
      var user = await UserModel.findOne(req.body);
      if (user) {
        return responseError(res, 400, "Duplicate username");
      } else {
        try {
          await newUser.save();
          return responseSuccess(res, 201, null, "User is created");
        } catch (err) {
          throw err;
        }
      }
    } catch (err) {
      return responseError(res, 500, "Internal Server");
    }
  },
};
module.exports = userController;
