const cloudinary = require("../middleware/cloudinary");
const Character = require("../models/Character");

module.exports = {
  createCharacter: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      
      await Character.create({
        name: req.body.name,
        class: req.body.class,
        age: req.body.age,
        race: req.body.race,
        lvl: req.body.lvl,
        gender: req.body.gender,

        abilities: {
          str: req.body.str,
          dex: req.body.dex,
          int: req.body.int,
          wis: req.body.wis,
          char: req.body.char,
        },

        proficiencies: req.body.proficiencies,
        
        saveProficiencies: req.body.saveProficiencies,

        ac: req.body.ac,

        user: req.user.id,

        image: result.secure_url,
        cloudinaryId: result.public_id,
      });
      console.log("Character has been added!");
      res.redirect("/userProfile/own");
    } catch (err) {
      console.log(err);
    }
  },
}