const mongoose = require("../config/db");
var collectionName = "comment";

const commentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostModel",
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

const CommentModel = mongoose.model("CommentModel", commentSchema);

module.exports = CommentModel;
