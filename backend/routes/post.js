const express = require("express");
const postController = require("../controller/postController");
const router = express.Router();

router.get("/getAllPosts", postController.getAllPosts);
router.post("/upload", postController.uploadPost);
router.patch("/edit/:postId", postController.editPost);
router.delete("/delete/:postId", postController.deletePost);

module.exports = router;
