const cloudinary = require("../middleware/cloudinary");
const Players = require("../models/UserNTW");
const Encounter = require("../models/Encounter");
const Rounds = require("../models/Round");

module.exports = {
  createRound: async (req, res) => {
    console.log('here')
    try {
      const encounter = await Encounter.findById(req.params.encounterId)
      const player = await Players.findById(req.params.playerId);
      const dm = await Players.findById(encounter.dm)
      
      const playerName = player.id == dm.id ? "DM" : player.userName;

      await Rounds.create({
        description: req.body.description,
        encounter: encounter,
        player: playerName,
        dm: dm,
      });

      if (encounter.dm != req.params.playerId) {

        await Encounter.findOneAndUpdate(
          { _id: req.params.encounterId },
          {
            $inc: { initiative: 1 },
          }
        );
        console.log("Initiative +1");
        console.log("A peasant prays")
        encounter.dmTurn = true;
        await encounter.save()
      } else {
        console.log("God has spoken")
        encounter.dmTurn = false;
        await encounter.save()
      }
      
      console.log("Round has been added!");
      res.redirect(`/encounter/${req.params.encounterId}`);
    } catch (err) {
      console.log(err);
    }
  },
  likeRound: async (req, res) => {
    try {
      await Encounter.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/encounter/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteRound: async (req, res) => {
    try {
      // Find encounter by id
      let encounter = await Encounter.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(encounter.cloudinaryId);
      // Delete post from db
      await Encounter.remove({ _id: req.params.id });
      console.log("Deleted Encounter");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
