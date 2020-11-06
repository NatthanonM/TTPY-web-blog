const CommentModel = require("../model/comment");
const PostModel = require("../model/post");
const UserModel = require("../model/user");
const { responseError, responseSuccess } = require("../utils/response");

const commentController = {
  uploadComment: async (req, res) => {
    //need user authorization
    const { userId, postId, content } = req.body;
    var comment = new CommentModel({ userId, postId, content });
    try {
      var user = await UserModel.findById(userId);
      if (user) {
        try {
          var post = await PostModel.findById(postId);
          if (post) {
            try {
              await comment.save();
              return responseSuccess(res, 201, null, "Comment is created");
            } catch (err) {
              throw err;
            }
          } else {
            return responseError(res, 400, "Post is not existed");
          }
        } catch (err) {
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
  editComment: async (req, res) => {
    //need user authorization
    const commentId = req.params.commentId;
    const { content } = req.body;
    try {
      var comment = await CommentModel.findByIdAndUpdate(commentId, {
        content,
      });
      if (!comment) {
        return responseError(res, 400, "Comment is not existed");
      }
      return responseSuccess(res, 200, "Comment is updated");
    } catch (error) {
      return responseError(res, 500, "Internal Server");
    }
  },
};
module.exports = commentController;
