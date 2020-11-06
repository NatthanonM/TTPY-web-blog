const mongoose = require("../config/db");
var collectionName = "post";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    content: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: collectionName,
    versionKey: false,
  }
);

const PostModel = mongoose.model("PostModel", postSchema);

module.exports = PostModel;
