const express = require("express");
const router = express.Router();
const playersController = require("../controllers/players");

//Player Routes
router.put("/api/addGame/:id", playersController.addGameToPlayer);

module.exports = router;
