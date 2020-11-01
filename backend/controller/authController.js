const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { responseError, responseSuccess } = require("../utils/response");
const config = require("../config/config");

const authController = {
  register: async (req, res, next) => {
    const { username, password, firstName, lastName } = req.body;
    if (!username || !password || !firstName || !lastName) {
      return responseError(
        res,
        400,
        "Please provide username, password, first name and last name"
      );
    }

    try {
      const usernameIsInUse = async () => {
        return await UserModel.findOne({ username });
      };
      if (!usernameIsInUse)
        return responseError(res, 400, "This username is already in use");
      let hashedPassword = await bcrypt.hash(password, 8);

      var newUser = new UserModel({
        username,
        password: hashedPassword,
        firstName,
        lastName,
      });
      try {
        await newUser.save();
        return responseSuccess(res, 201, null, "User is created");
      } catch (err) {
        throw err;
      }
    } catch (err) {
      return responseError(res, 500, "Internal Error");
    }
  },
  login: async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return responseError(res, 400, "Please provide username and password");
    }

    try {
      const loggingInUser = await UserModel.findOne({ username });
      if (!loggingInUser) {
        return responseError(res, 400, "Username or password is incorrect");
      }
      if (!(await bcrypt.compare(password, loggingInUser.password))) {
        return responseError(res, 400, "Username or password is incorrect");
      }
      const token = jwt.sign(
        { username: loggingInUser.username },
        config.jwtSecret,
        {
          expiresIn: config.jwtExpiresIn,
        }
      );
      const cookieOptions = {
        expires: new Date(
          Date.now() + config.jwtCookieExpires * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };
      res.cookie("jwt", token, cookieOptions);
      return responseSuccess(res, 201, { token });
    } catch (err) {
      console.log(err);
      return responseError(res, 500, "Internal Error");
    }
  },
};

module.exports = authController;
