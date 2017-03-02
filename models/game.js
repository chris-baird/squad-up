var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
  gameName: {
    type: String,
    required: true
  },
  system: {
    type: String,
    required: true,
    enum: ['Steam', 'PC', 'Xbox One', 'Playstation 4', 'Xbox 360', 'Playstation 3', '3DS', 'Wii U']
  },
  lang: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  playTime: {
    type: String,
    required: false
  },
  micReq: {
    type: Boolean,
    required: true,
    enum: ['Yes', 'No']
  },
  gamerId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Game', gameSchema);
