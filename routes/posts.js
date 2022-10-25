const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const postsController = require("../controllers/posts");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes
router.get("/api/:id", ensureAuth, postsController.getPost);

router.post("/api/createPost", upload.single("file"), postsController.createPost);

router.put("/api/likePost/:id", postsController.likePost);

router.delete("/api/deletePost/:id", postsController.deletePost);

module.exports = router;
