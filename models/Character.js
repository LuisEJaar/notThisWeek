const mongoose = require("mongoose");

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  race: {
    type: String,
    required: true,
  },
  lvl: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  abilities: {
    type: Object,
    required: {
      str: 0,
      dex: 0,
      int: 0,
      wis: 0,
      char: 0,
    }
  },
  proficiencies: {
    type: Array,
    default: [],
  },
  saveProficiencies: {
    type: Array,
    default: [],
  },
  ac: {
    type: Number,
    required: true,
  },
  currency: {
    type: Object,
    default: {
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
    },
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
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Character", CharacterSchema);
