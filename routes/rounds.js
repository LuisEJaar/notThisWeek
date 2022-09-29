const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const roundsController = require("../controllers/rounds");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Encounter Routes
router.get("/:id", ensureAuth, roundsController.getRound);

router.post("/createRound/:encounterId/:playerId", roundsController.createRound);

router.put("/likeEncounter/:id", roundsController.likeRound);

router.delete("/deleteEncounter/:id", roundsController.deleteRound);

module.exports = router;
