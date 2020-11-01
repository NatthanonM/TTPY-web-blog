const mongoose = require("../config/db");
var collectionName = "comment";

const commentSchema = mongoose.Schema(
    {
        userId:{
            type: String,
            required: true
        },
        postId:{
            type: String,
            required: true
        },
        content:{
            type: String,
            default: ""
        }
    },  
        {
            collection: collectionName,
            versionKey: false
        }
);

const CommentModel = mongoose.model("CommentModel", commentSchema);

module.exports = CommentModel;