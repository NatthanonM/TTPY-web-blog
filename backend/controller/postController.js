const CommentModel = require("../model/comment");
const PostModel = require("../model/post");
const UserModel = require("../model/user");
const { responseError, responseSuccess } = require("../utils/response");
const { isModerator, getUser, isUser } = require("./userController");

const postController = {
  uploadPost: async (req, res) => {
    const { content } = req.body;
    const { userId } = req.user;
    if (await isUser(userId)) {
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
    } else {
      return responseError(res, 403, "Forbidden");
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
  getAllPosts: async (req, res) => {
    const { userId } = req.user;
    if (await getUser(userId)) {
      var allPosts = [];
      try {
        var posts = await PostModel.find();
        for (i = 0; i < posts.length; i++) {
          var user = await UserModel.findById(posts[i].userId);
          if (!user) {
            continue;
          }
          var comments = await CommentModel.find({ postId: posts[i]._id });
          convComment = [];
          if (comments.length > 0) {
            for (j = 0; j < comments.length; j++) {
              var commentOwner = await UserModel.findById(comments[j].userId);
              if (!commentOwner) {
                continue;
              }
              await convComment.push({
                username: commentOwner.username,
                content: comments[j].content,
                created_at: comments[j].created_at,
                updated_at: comments[j].updated_at,
              });
            }
          }

          var p = {
            username: user.username,
            content: posts[i].content,
            created_at: posts[i].created_at,
            updated_at: posts[i].updated_at,
            comment: convComment,
          };
          allPosts.push(p);
        }
        return responseSuccess(res, 200, allPosts);
      } catch (error) {
        return responseError(res, 500, "Internal Server");
      }
    } else {
      return responseError(res, 403, "Forbidden");
    }
  },
};
module.exports = postController;
