const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const roundsController = require("../controllers/rounds");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Encounter Routes
router.post("/createRound/:encounterId/:playerId", roundsController.createRound);

router.put("/makeRoll/:roundId/:characterId", roundsController.makeRoll);

router.put("/likeRound/:id", roundsController.likeRound);

router.put("/editRound/:id", roundsController.editRound);

router.delete("/deleteRound/:id", roundsController.deleteRound);

module.exports = router;
