const express = require("express");
const postController = require("../controller/postController");
const router = express.Router();

router.get("/userPosts", postController.getAllUserPost);
router.get("/userPostById",postController.getUserPostById)
router.post("/uploadPost", postController.uploadPost);

module.exports = router;
