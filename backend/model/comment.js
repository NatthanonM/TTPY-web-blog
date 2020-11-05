const mongoose = require("../config/db");
var collectionName = "comment";

const commentSchema = mongoose.Schema(
    {
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel'
        },
        postId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PostModel'
        },
        content:{
            type: String,
            default: ""
        },
        datetime: { createdAt: 'created_at' }
    },  
        {
            collection: collectionName,
            versionKey: false
        },
);

const CommentModel = mongoose.model("CommentModel", commentSchema);

module.exports = CommentModel;