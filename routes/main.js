const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
// const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes
// router.get("/userProfile/:id",ensureAuth, postsController.getUserProfile);
// router.get("/gameFeed", ensureAuth, postsController.getFeed);
// router.get("/characterFeed", ensureAuth, postsController.getCharacterFeed);

router.get("/api/userProfile/:id", postsController.getUserProfile);
router.get("/api/gameFeed", postsController.getFeed);
router.get("/api/characterFeed", postsController.getCharacterFeed);
router.get("/api/login", authController.getLogin);
router.post("/api/login", authController.postLogin);
router.get("/api/logout", authController.logout);
router.get("/api/signup", authController.getSignup);
router.post("/api/signup", authController.postSignup);

module.exports = router;
