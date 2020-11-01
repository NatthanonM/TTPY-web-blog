const mongoose = require("../config/db");
var collectionName = "post";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      default: "",
    }
  },
  {
    collection: collectionName,
    versionKey: false,
  }
);

const PostModel = mongoose.model("PostModel", postSchema);

module.exports = PostModel;
