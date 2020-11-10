const UserModel = require("../model/user");
const { responseError, responseSuccess } = require("../utils/response");

const userController = {
  getAllUser: async (req, res) => {
    try {
      var users = await UserModel.find();
      return responseSuccess(res, 200, users);
    } catch (error) {
      return responseError(res, 500, "Internal Server");
    }
  },
  getMyProfile: async (req, res) => {
    const { userId } = req.user;
    try {
      var user = await UserModel.findById(userId);
      var { username, role } = user;
      return responseSuccess(res, 200, { username, role });
    } catch (error) {
      return responseError(res, 500, "Internal Server");
    }
  },
  getUser: async (userId) => {
    try {
      var user = await UserModel.findById(userId);
      return !!user;
    } catch (error) {
      return false;
    }
  },
  isModerator: async (userId) => {
    try {
      var user = await UserModel.findById(userId);
      return user.role === "moderator";
    } catch (error) {
      return false;
    }
  },
  isUser: async (userId) => {
    try {
      var user = await UserModel.findById(userId);
      return user.role === "user";
    } catch (error) {
      return false;
    }
  },
};
module.exports = userController;
