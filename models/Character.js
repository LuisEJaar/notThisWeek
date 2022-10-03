const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  str: {
    type: Number,
    required: true,
  },
  dex: {
    type: Number,
    required: true,
  },
  int: {
    type: Number,
    required: true,
  },
  wis: {
    type: Number,
    required: true,
  },
  char: {
    type: Number,
    required: true,
  },
  proficiencies: {
    type: Array,
    default: [],
  },
  proficiencyBonus: {
    type: Number,
    required: true,
  },
  ac: {
    type: Number,
    required: true,
  },
  game: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: false,
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Character", CharacterSchema);
