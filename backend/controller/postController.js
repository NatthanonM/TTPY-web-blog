const PostModel = require("../model/post");
const UserModel = require("../model/user");
const { responseError, responseSuccess } = require("../utils/response");

const postController = {
  uploadPost: async (req, res) => {
    //need user authorization
    var post = new PostModel(req.body);
    try {
      var user = await UserModel.findById(req.body.userId);
      if (user) {
        try {
          await post.save();
          return responseSuccess(res, 201, null, "Post is created");
        } catch (err) {
          console.log(err);
          throw err;
        }
      } else {
        return responseError(res, 400, "User is not existed");
      }
    } catch (error) {
      console.log(error);
      return responseError(res, 500, "Internal Server");
    }
  },
  deletePost: async (req, res) => {
    //need user authorization
    const postId = req.params.postId;
    try {
      var post = await PostModel.findByIdAndDelete(postId);
      if (!post) {
        return responseError(res, 400, "Post is not existed");
      }
      return responseSuccess(res, 200, "Post is deleted");
    } catch (error) {
      return responseError(res, 500, "Internal Server");
    }
  },
  editPost: async (req, res) => {
    //need user authorization
    const postId = req.params.postId;
    const { content } = req.body;
    try {
      var post = await PostModel.findByIdAndUpdate(postId, { content });
      if (!post) {
        return responseError(res, 400, "Post is not existed");
      }
      return responseSuccess(res, 200, "Post is updated");
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
