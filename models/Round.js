const mongoose = require("mongoose");

const RoundSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  encounter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Encounter",
  },
  player:
    {
      type: String,
    }
  ,
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
