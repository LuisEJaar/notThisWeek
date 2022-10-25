const express = require("express");
const router = express.Router();
const roundsController = require("../controllers/rounds");

//Encounter Routes
router.post("/api/createRound/:encounterId/:playerId/:characterId", roundsController.createRound);

router.put("/api/makeRoll/:roundId/:characterId", roundsController.makeRoll);

router.put("/api/likeRound/:id", roundsController.likeRound);

router.put("/api/editRound/:id", roundsController.editRound);
 
router.delete("/api/deleteRound/:id/:encounterId", roundsController.deleteRound);

module.exports = router; 
