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
};
module.exports = userController;
