const CommentModel = require("../model/comment");
const PostModel = require("../model/post");
const UserModel = require("../model/user");
const{ responseError, responseSuccess} = require("../utils/response");

const postController = {
    uploadPost: async(req, res) => {
        var post = new PostModel(req.body);
        try{
            var user = await UserModel.findOne(req.body.username);
            if(user){
                try{
                    await post.save();
                    return responseSuccess(res, 201, null, "Post is created");
                }catch(err){
                    throw err;
                }
            }else{
                return responseError(res, 400, "User is not existed");
            }
        }catch(error){
            return responseError(res, 500,"Internal Server");
        }
    },
    getAllUserPost: async (req, res) => {
        const username = req.user.name;
        try{
            var user = await UserModel.findOne(req.body);
            if(user){
                try{
                    var posts = await PostModel.find({userId: req.body.username});
                    return responseSuccess(res, 200, posts);
                }catch(err){
                    throw err;
                }
            }else{
                return responseError(res, 400, "User is not existed");
            }
        }catch(error){
            return responseError(res, 500,"Internal Server");
        }
    },
};
module.exports = postController;
