const UserModel = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { responseError, responseSuccess } = require("../utils/response");
const config = require("../config/config");
const crypto = require("crypto");

function decrypt(text) {
  let textParts = text.split(":");
  let iv = Buffer.from(textParts.shift(), "hex");
  let encryptedText = Buffer.from(textParts.join(":"), "hex");
  let decipher = crypto.createDecipheriv(
    config.cryptoAlgorithm,
    Buffer.from(config.cryptoKey),
    iv
  );
  let decrypted = decipher.update(encryptedText);

  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
}

const authController = {
  register: async (req, res, next) => {
    const { username, password, role } = req.body;
    if (!username || !password || !role) {
      return responseError(
        res,
        400,
        "Please provide username, password and role"
      );
    }
    if (role !== "moderator" && role !== "user") {
      return responseError(res, 400, "Undefined role");
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
        role,
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
      let decryptedPassword = decrypt(password);
      if (!(await bcrypt.compare(decryptedPassword, loggingInUser.password))) {
        return responseError(res, 400, "Username or password is incorrect");
      }
      const token = jwt.sign(
        {
          userId: loggingInUser._id,
          username: loggingInUser.username,
          role: loggingInUser.role,
        },
        config.jwtSecret,
        {
          expiresIn: config.jwtExpiresIn,
        }
      );
      const log = jwt.sign(
        {
          log: true,
        },
        config.jwtSecret,
        {
          expiresIn: config.jwtExpiresIn,
        }
      );
      res.cookie("TTPY-TOKEN", token, {
        expires: new Date(
          Date.now() + config.jwtCookieExpires * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      });
      res.cookie("TTPY-LOG", log, {
        expires: new Date(
          Date.now() + config.jwtCookieExpires * 24 * 60 * 60 * 1000
        ),
      });
      return responseSuccess(res, 201, { token });
    } catch (err) {
      return responseError(res, 500, "Internal Error");
    }
  },
  logout: async (req, res, next) => {
    try {
      res.clearCookie("TTPY-TOKEN");
      res.clearCookie("TTPY-LOG");
      return responseSuccess(res, 200, {});
    } catch (err) {
      return responseError(res, 500, "Internal Error");
    }
  },
  isLogin: async (req, res, next) => {
    try {
      if (req.cookies.jwt) return responseSuccess(res, 200, {});
      else return responseError(res, 401, "Unauthorized");
    } catch (err) {
      return responseError(res, 500, "Internal Error");
    }
  },
};

module.exports = authController;
