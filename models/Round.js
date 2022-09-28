const mongoose = require("mongoose");

const RoundSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  Encounter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Encounter",
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserNTW",
    }
  ],
  dm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserNTW",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Round", RoundSchema);
