const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const charactersController = require("../controllers/characters");

//Character Routes
router.post("/create", upload.single("file"), charactersController.createCharacter);

module.exports = router;
