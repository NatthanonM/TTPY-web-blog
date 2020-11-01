const CommentModel = require("../model/comment");
const PostModel = require("../model/post");
const UserModel = require("../model/user");
const{ responseError, responseSuccess} = require("../utils/response");

const postController = {
    uploadPost: async(req, res) => {
        try{
            var user = await UserModel.findOne(req.body.username);
            if(user){
                try{
                    const post = new PostModel(req.body);
                    [err, post] = await toString(post.save());
                    return responseSuccess(res,200,post);
                }catch(err){
                    throw err;
                }
            }else{
                return responseError(res, 400, "User is not existed");
            }
        }catch(error){
            throw error;
        }
    }
    // getAllUserPost: async (req, res) => {
    //     const username = req.user.name;
    //     const content = req.user.content;
    //     try{
    //         var user = await UserModel.findOne(req.body);
    //         if(user){
    //             try{
    //                 const post = new CommentModel({username,content});
    //             }
    //         }else{
    //             return responseError(res, 400, "User is not existed");
    //         }
    //     }catch(err){
    //         throw err;
    //     }
    // }
}