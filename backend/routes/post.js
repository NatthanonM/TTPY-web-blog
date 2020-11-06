const express = require("express");
const postController = require("../controller/postController");
const router = express.Router();

// router.get("/userPosts", postController.getAllUserPost);
// router.get("/userPostById",postController.getUserPostById)
router.post("/upload", postController.uploadPost);
router.patch("/edit/:postId", postController.editPost);
router.delete("/delete/:postId", postController.deletePost);

module.exports = router;
