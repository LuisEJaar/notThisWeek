const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const charactersController = require("../controllers/characters");


//Character Routes
router.post("/api/create", upload.single("file"), charactersController.createCharacter);

router.get("/api/:id", charactersController.getCharacter);

router.put("/api/addGame/:id", charactersController.addGame);

module.exports = router;
