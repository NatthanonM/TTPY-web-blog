const mongoose = require("../config/db");
var collectionName = "post";

const postSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserModel',
    },
    content: {
      type: String,
      default: "",
    },
    datetime: { createdAt: 'created_at' }
  },
  {
    collection: collectionName,
    versionKey: false,
  }
);

const PostModel = mongoose.model("PostModel", postSchema);

module.exports = PostModel;
