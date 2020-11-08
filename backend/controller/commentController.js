const CommentModel = require("../model/comment");
const PostModel = require("../model/post");
const { responseError, responseSuccess } = require("../utils/response");
const { isModerator } = require("./userController");

const commentController = {
  uploadComment: async (req, res) => {
    //need user authorization
    const { content, postId } = req.body;
    const { userId } = req.user;
    var comment = new CommentModel({
      content,
      userId,
      postId,
    });
    try {
      var post = await PostModel.findById(postId);
      if (post) {
        if (post.userId.toString() === userId) {
          await comment.save();
          return responseSuccess(res, 201, null, "Comment is created");
        } else {
          responseError(res, 403, "Forbidden");
        }
      } else {
        return responseError(res, 400, "Post is not existed");
      }
    } catch (error) {
      console.log(error);
      return responseError(res, 500, "Internal Server");
    }
  },
  editComment: async (req, res) => {
    //need user authorization
    const commentId = req.params.commentId;
    const { userId } = req.user;
    const { content } = req.body;
    try {
      var comment = await CommentModel.findById(commentId);
      if (comment) {
        if (comment.userId.toString() === userId) {
          await CommentModel.findByIdAndUpdate(commentId, { content });
          return responseSuccess(res, 200, "Comment is updated");
        } else {
          return responseError(res, 403, "Forbidden");
        }
      } else {
        return responseError(res, 400, "Comment is not existed");
      }
    } catch (error) {
      console.log(error);
      return responseError(res, 500, "Internal Server");
    }
  },
};

module.exports = commentController;
