const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Players = require("../models/UserNTW");
const Encounter = require("../models/Encounter");

module.exports = {
  getEncounter: async (req, res) => {
    try {
      const encounter = await Encounter.findById(req.params.id);
      const players = await Players.find({ type: "player" });
      const potentialParty = await Players.find({ games: encounter.post });
      const party = await potentialParty.filter((member) => { 
        if (encounter.players.indexOf(member._id) != -1) {
          return true
        }
      })
      const playerTurn = party[encounter.initiative % party.length]
      console.log(playerTurn)
      res.render("encounter.ejs", { encounter: encounter, user: req.user, players: players, party: party, playerTurn: playerTurn});
    } catch (err) {
      console.log(err);
    }
  },
  createEncounter: async (req, res) => {
    console.log("here")
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }

      const players = await shuffle(req.body.players);

      await Encounter.create({
        title: req.body.title,
        location: req.body.location,
        description: req.body.description,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        likes: 0,
        post: req.params.id,
        dm: req.user.id,
        players: players,
        initiative: 0,
      });
      console.log("Encounter has been added!");
      res.redirect('back');
    } catch (err) {
      console.log(err);
    }
  },
  likeEncounter: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteEncounter: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
