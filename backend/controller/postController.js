const PostModel = require("../model/post");
const UserModel = require("../model/user");
const { responseError, responseSuccess } = require("../utils/response");
const { isModerator } = require("./userController");

const postController = {
  uploadPost: async (req, res) => {
    const { content } = req.body;
    const { userId } = req.user;
    var post = new PostModel({
      content,
      userId,
    });
    try {
      await post.save();
      return responseSuccess(res, 201, null, "Post is created");
    } catch (error) {
      console.log(error);
      return responseError(res, 500, "Internal Server");
    }
  },
  deletePost: async (req, res) => {
    //need user authorization
    const { userId } = req.user;
    const moderator = await isModerator(userId);
    const postId = req.params.postId;
    if (moderator) {
      try {
        var post = await PostModel.findByIdAndDelete(postId);
        if (!post) {
          return responseError(res, 400, "Post is not existed");
        }
        return responseSuccess(res, 200, "Post is deleted");
      } catch (error) {
        return responseError(res, 500, "Internal Server");
      }
    } else {
      return responseError(res, 403, "Forbidden");
    }
  },
  editPost: async (req, res) => {
    //need user authorization
    const { userId } = req.user;
    const moderator = await isModerator(userId);
    const postId = req.params.postId;
    const { content } = req.body;
    try {
      var post = await PostModel.findById(postId);
      if (post) {
        if (moderator || post.userId.toString() === userId) {
          await PostModel.findByIdAndUpdate(postId, { content });
          return responseSuccess(res, 200, "Post is updated");
        } else {
          return responseError(res, 403, "Forbidden");
        }
      } else {
        return responseError(res, 400, "Post is not existed");
      }
    } catch (error) {
      return responseError(res, 500, "Internal Server");
    }
  },
  getAllUserPost: async (req, res) => {
    const username = req.user.name;
    try {
      var user = await UserModel.findOne(req.body);
      if (user) {
        try {
          var posts = await PostModel.find({ userId: req.body.username });
          return responseSuccess(res, 200, posts);
        } catch (err) {
          throw err;
        }
      } else {
        return responseError(res, 400, "User is not existed");
      }
    } catch (error) {
      return responseError(res, 500, "Internal Server");
    }
  },
};
module.exports = postController;
