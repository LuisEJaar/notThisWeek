const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const encountersController = require("../controllers/encounters");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Encounter Routes
router.get("/api/:id", ensureAuth, encountersController.getEncounter);

router.post("/api/createEncounter/:id", upload.single("file"), encountersController.createEncounter);

router.put("/api/likeEncounter/:id", encountersController.likeEncounter);

router.put("/api/progressEncounter/:id", encountersController.progressEncounter);

router.put("/api/toggleEncounter/:id", encountersController.toggleEncounter);

router.put("/api/toggleDm/:id", encountersController.toggleDm);

router.delete("/api/deleteEncounter/:id", encountersController.deleteEncounter);

module.exports = router;
