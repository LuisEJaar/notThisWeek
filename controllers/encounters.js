const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Players = require("../models/UserNTW");
const Encounter = require("../models/Encounter");

module.exports = {
  getEncounter: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const players = await Players.find({ type: "player" });
      const party = await Players.find({games: req.params.id})
      res.render("post.ejs", { post: post, user: req.user, players: players, party: party});
    } catch (err) {
      console.log(err);
    }
  },
  createEncounter: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Encounter.create({
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        caption: req.body.caption,
        likes: 0,
        user: req.user.id,
        players: req.body.players,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
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
