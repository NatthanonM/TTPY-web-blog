const express = require("express");
const commentController = require("../controller/commentController");
const router = express.Router();

// router.get("/allComments", commentController.getAllComment);
// router.get("/commentById",commentController.getCommentById)
router.post("/upload", commentController.uploadComment);
router.patch("/edit/:commentId", commentController.editComment);

module.exports = router;
