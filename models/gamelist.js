var mongoose = require('mongoose');

var gameListSchema = new mongoose.Schema({
  gameName: String,
  gameDesc: String,
  playTime: Date,
  micReq: Boolean,
  gamerId: String
});

module.exports = mongoose.model('GameList', gameListSchema);
